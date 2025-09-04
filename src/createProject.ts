import chalk from "chalk";
import { execSync } from "child_process";
import fs from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";
import path from "path";

interface ProjectConfig {
  projectName: string;
  language: "javascript" | "typescript";
  optionalPackages: string[];
}

export async function createProject(projectName?: string): Promise<void> {
  console.log(chalk.blue.bold("🚀 React Project Kit"));
  console.log(chalk.gray("Create a new React project with modern tooling\n"));

  try {
    const config = await getProjectConfig(projectName);
    await createProjectFiles(config);
    await installDependencies(config);

    // Setup shadcn/ui if selected
    if (config.optionalPackages.includes("shadcn")) {
      await setupShadcn(config);
    }

    console.log(chalk.green.bold("\n✅ Project created successfully!"));
    console.log(chalk.blue(`\nNext steps:`));
    if (config.projectName === ".") {
      console.log(chalk.white(`  npm run dev`));
    } else {
      console.log(chalk.white(`  cd ${config.projectName}`));
      console.log(chalk.white(`  npm run dev`));
    }
    console.log(chalk.gray(`\nHappy coding! 🎉`));
  } catch (error) {
    console.error(chalk.red.bold("❌ Error creating project:"), error);
    process.exit(1);
  }
}

async function getProjectConfig(projectName?: string): Promise<ProjectConfig> {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message:
        "What is your project named? (Use '.' to install in current directory, or press Enter)",
      default: projectName || "my-react-app",
      validate: (input: string) => {
        if (!input.trim()) {
          return "Project name cannot be empty";
        }
        if (input !== "." && fs.existsSync(input)) {
          return "Directory already exists";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "language",
      message: "Would you like to use TypeScript or JavaScript?",
      choices: [
        { name: "TypeScript", value: "typescript" },
        { name: "JavaScript", value: "javascript" },
      ],
    },
    {
      type: "checkbox",
      name: "optionalPackages",
      message:
        "Which optional packages would you like to install? (Press spacebar to select, Enter to continue with none)",
      choices: [
        { name: "shadcn/ui (UI components)", value: "shadcn" },
        { name: "Redux Toolkit", value: "redux" },
      ],
    },
  ]);

  return answers;
}

async function createProjectFiles(config: ProjectConfig): Promise<void> {
  const spinner = ora("Creating project files...").start();

  try {
    // Handle current directory installation
    if (config.projectName === ".") {
      // Create Vite project in current directory
      const template = config.language === "typescript" ? "react-ts" : "react";
      execSync(`npm create vite@latest . -- --template ${template} --yes`, {
        stdio: "inherit",
        cwd: process.cwd(),
      });

      // Copy our custom templates
      await copyTemplates(config);
    } else {
      // Create project directory
      await fs.ensureDir(config.projectName);

      // Create Vite project with React template
      const template = config.language === "typescript" ? "react-ts" : "react";
      execSync(
        `npm create vite@latest ${config.projectName} -- --template ${template} --yes`,
        {
          stdio: "inherit",
          cwd: process.cwd(),
        }
      );

      // Copy our custom templates
      await copyTemplates(config);
    }

    spinner.succeed("Project files created");
  } catch (error) {
    spinner.fail("Failed to create project files");
    throw error;
  }
}

async function copyTemplates(config: ProjectConfig): Promise<void> {
  const projectPath =
    config.projectName === "."
      ? process.cwd()
      : path.join(process.cwd(), config.projectName);

  // Determine which template to use
  let templatePath: string;

  if (config.optionalPackages.includes("redux")) {
    // Use Redux template if Redux is selected
    templatePath = path.join(
      __dirname,
      "..",
      "templates",
      `${config.language}-redux`
    );
  } else {
    // Use base template if Redux is not selected
    templatePath = path.join(__dirname, "..", "templates", config.language);
  }

  // Copy template files if they exist
  if (await fs.pathExists(templatePath)) {
    await fs.copy(templatePath, projectPath);
  }
}

async function installDependencies(config: ProjectConfig): Promise<void> {
  const spinner = ora("Installing dependencies...").start();
  const projectPath =
    config.projectName === "."
      ? process.cwd()
      : path.join(process.cwd(), config.projectName);

  try {
    // Install default dependencies
    const defaultDeps = [
      "tailwindcss@^4.1.12",
      "@tailwindcss/vite@^4.1.12",
      "react-router-dom@^7.0.0",
      "axios",
      "react-hook-form",
      "@tanstack/react-query",
      "lucide-react",
    ];

    execSync(`npm install ${defaultDeps.join(" ")}`, {
      stdio: "inherit",
      cwd: projectPath,
    });

    // Install optional dependencies
    const optionalDeps: string[] = [];

    if (config.optionalPackages.includes("redux")) {
      optionalDeps.push("@reduxjs/toolkit", "react-redux");
    }
    if (config.optionalPackages.includes("shadcn")) {
      optionalDeps.push(
        "@radix-ui/react-slot",
        "class-variance-authority",
        "clsx",
        "tailwind-merge"
      );
    }

    if (optionalDeps.length > 0) {
      execSync(`npm install ${optionalDeps.join(" ")}`, {
        stdio: "inherit",
        cwd: projectPath,
      });
    }

    spinner.succeed("Dependencies installed");
  } catch (error) {
    spinner.fail("Failed to install dependencies");
    throw error;
  }
}

async function setupShadcn(config: ProjectConfig): Promise<void> {
  const spinner = ora("Setting up shadcn/ui...").start();
  const projectPath =
    config.projectName === "."
      ? process.cwd()
      : path.join(process.cwd(), config.projectName);

  try {
    // Create components.json
    const componentsJson = {
      $schema: "https://ui.shadcn.com/schema.json",
      style: "default",
      rsc: false,
      tsx: config.language === "typescript",
      tailwind: {
        config: "tailwind.config.js",
        css: "src/index.css",
        baseColor: "slate",
        cssVariables: true,
        prefix: "",
      },
      aliases: {
        components: "@/components",
        utils: "@/lib/utils",
      },
    };

    await fs.writeFile(
      path.join(projectPath, "components.json"),
      JSON.stringify(componentsJson, null, 2)
    );

    // Update tsconfig.json with path mapping
    const tsconfigPath = path.join(projectPath, "tsconfig.json");
    if (await fs.pathExists(tsconfigPath)) {
      const tsconfig = JSON.parse(await fs.readFile(tsconfigPath, "utf-8"));
      tsconfig.compilerOptions.baseUrl = ".";
      tsconfig.compilerOptions.paths = {
        "@/*": ["./src/*"],
      };
      await fs.writeFile(tsconfigPath, JSON.stringify(tsconfig, null, 2));
    }

    // Update vite.config with path alias
    const viteConfigPath = path.join(
      projectPath,
      config.language === "typescript" ? "vite.config.ts" : "vite.config.js"
    );
    if (await fs.pathExists(viteConfigPath)) {
      let content = await fs.readFile(viteConfigPath, "utf-8");

      // Add path import
      if (!content.includes("import path from")) {
        content = content.replace(
          'import { defineConfig } from "vite";',
          'import path from "path";\nimport { defineConfig } from "vite";'
        );
      }

      // Add resolve.alias
      if (!content.includes('"@":')) {
        content = content.replace(
          "plugins: [react(), tailwindcss()],",
          `plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },`
        );
      }

      await fs.writeFile(viteConfigPath, content);
    }

    // Update utils file with shadcn imports
    const utilsPath = path.join(
      projectPath,
      "src",
      "libs",
      config.language === "typescript" ? "utils.ts" : "utils.js"
    );
    if (await fs.pathExists(utilsPath)) {
      let content = await fs.readFile(utilsPath, "utf-8");

      if (!content.includes("clsx")) {
        const imports =
          config.language === "typescript"
            ? 'import { type ClassValue, clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\n'
            : 'import { clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\n';

        const cnFunction =
          config.language === "typescript"
            ? "\n// shadcn/ui utility function\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}"
            : "\n// shadcn/ui utility function\nexport function cn(...inputs) {\n  return twMerge(clsx(inputs));\n}";

        content = imports + content + cnFunction;
        await fs.writeFile(utilsPath, content);
      }
    }

    spinner.succeed("shadcn/ui setup complete");
  } catch (error) {
    spinner.fail("Failed to setup shadcn/ui");
    throw error;
  }
}
