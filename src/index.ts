import { Command } from "commander";

const program = new Command();

program
  .name("taskly")
  .description("A simple CLI task manager")
  .version("1.0.0");

program
  .command("split")
  .description("Add the task in the  InMemory")
  .option("--add", "Add task")
  .option("--remove", "remove the task")
  .action((str, option) => {
    console.log();
  });
program.parse();
