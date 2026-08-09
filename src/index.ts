import { Command } from "commander";
import { createTask } from "./services/task.service.js";
import { getTasks } from "./storage/task.storage.js";

const program = new Command();

program.name("taskly").description("cli task manager").version("1.0.0");

program
  .command("add")
  .description("Add a new task")
  .argument("<task>")
  .option("--p, --priority <level>", "Task priority")
  .action(async (task, options) => {
    // console.log(await getTasks());

    const createdTask = await createTask(task, options.priority ?? "medium");
    // console.log("Task created");
    // console.log(createdTask);
  });

program.parse();
