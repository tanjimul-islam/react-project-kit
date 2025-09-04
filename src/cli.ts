#!/usr/bin/env node

import { Command } from "commander";
import { createProject } from "./createProject.js";

const program = new Command();

program
  .name("react-starter-pack")
  .description("Create a new React project with modern tooling")
  .version("1.0.0")
  .argument("[project-name]", "Name of the project")
  .action(async (projectName) => {
    await createProject(projectName);
  });

program.parse();
