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
  .option("--p, --priority <level>", "Task priority")
  // .option("-p, --priority <level>", "Task priority")
  // .argument("[message]")
  .action((task, options) => {
    console.log(task);
    console.log("Priority :", options.priority);
    // console.log(message);
  });

// program
//   .command("move")
//   .description("Add id and status")
//   .argument("<task>")
//   .argument("<id>")
//   .argument("<status>")
//   .action((task, id, status) => {
//     console.log(task);
//     console.log(id);
//     console.log(status);
//   });

program
  .command("list")
  .description("Tasks List")
  .option("--completed", "Show completd tasks")
  .action((options) => {
    console.log("Options :", options);
  });

program.parse();
