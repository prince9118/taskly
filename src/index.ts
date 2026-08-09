import { Command } from "commander";
import { formatTask } from "./utils/task.formattter.js";
import { createTask, getAllTasks } from "./services/task.service.js";
import { getTasks } from "./storage/task.storage.js";
import inquirer from "inquirer";
const program = new Command();

program.name("taskly").description("cli task manager").version("1.0.0");

program
  .command("add")
  .description("Add a new task")
  .action(async (task, options) => {
    // const tasks = await getTasks();
    // console.table(tasks);
    // const createdTask = await createTask(task, options.priority ?? "medium");
    // console.log("Task created");
    // console.log(createdTask);
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "what is your task?"
      },
      {
        type: "select",
        name: "priority",
        message: "Select priority",
        choices: ["low", "medium", "high"]
      }
    ]);
    const createdTask = await createTask(answers);
  });

program
  .command("get")
  .description("Get all the tasks")
  .action(async (task, options) => {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "what is your task?"
      },
      {
        type: "select",
        name: "priority",
        message: "Select priority",
        choices: ["low", "medium", "high"]
      }
    ]);
  });

program
  .command("list")
  .description("List all tasks")
  .action(async () => {
    const tasks = await getAllTasks();
    console.log("ID Status Priority Task");
    for (const task of tasks) {
      console.log(formatTask(task));
    }
  });

program.parse();
