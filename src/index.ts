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
  .description("Add id and status")
  .argument("<task>")
  .argument("<id>")
  .argument("<status>")
  .action((task, id, status) => {
    console.log(task);
    console.log(id);
    console.log(status);
  });

program.parse();
