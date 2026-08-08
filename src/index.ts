import { Command } from "commander";

const program = new Command();

program
  .name("taskly")
  .description("A simple CLI task manager")
  .version("1.0.0");

program
  .command("add")
  .description("Add a new task")
  .argument("<task>")
  // .argument("[message]")
  .action((task) => {
    console.log(task);
    // console.log(message);
  });

program
  .command("move")
  // .description("Add name")
  .argument("<name> <id> <status>")
  .action((name) => {
    console.log(`Hello ${name ?? "world"}`);
  });

program.parse();
