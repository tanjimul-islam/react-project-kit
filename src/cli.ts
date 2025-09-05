#!/usr/bin/env node

import { Command } from "commander";
import { createProject } from "./createProject.js";

const program = new Command();

program
  .name("react-project-kit")
  .description("Create a new React project with modern tooling")
  .version("0.1.0-alpha.4")
  .argument("[project-name]", "Name of the project")
  .action(async (projectName) => {
    await createProject(projectName);
  });

program.parse();
