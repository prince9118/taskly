import { Command } from "commander";
import { formatTask } from "./utils/task.formattter.js";
import {
  createTask,
  getAllTasks,
  completeTask,
  removeTask,
  updateTask
} from "./services/task.service.js";
import { getTasks } from "./storage/task.storage.js";
import inquirer from "inquirer";
import { parseTaskId } from "./utils/parse.js";
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
  .command("list")
  .description("List all tasks")
  .action(async () => {
    const tasks = await getAllTasks();
    console.log("ID Status Priority Task");
    for (const task of tasks) {
      console.log(formatTask(task));
    }
  });

program
  .command("done")
  .description("Mark task as completed")
  .action(async () => {
    try {
      const tasks = await getAllTasks();
      if (!tasks) {
        throw new Error("No task found");
      }
      const { taskId } = await inquirer.prompt([
        {
          type: "select",
          name: "taskId",
          message: "Select task to completd ?",
          choices: tasks.map((task) => ({
            name: `${task.id} - ${task.title} `,
            value: task.id
          }))
        }
      ]);
      const task = await completeTask(taskId);
      console.log(`Task ${task.id} marked as completed`);
    } catch (error) {
      throw new Error("Faild to  complete task");
    }
  });

program
  .command("remove")
  .description("Remve task")
  .argument("<id>")
  .action(async (id) => {
    try {
      const taskId = parseTaskId(id);
      const task = await removeTask(taskId);
      console.log(`Task ${task.id} removed`);
    } catch (error) {
      throw new Error("Soemthing wrong");
    }
  });

program
  .command("set")
  .description("Update the tasks")
  .action(async () => {
    const tasks = await getAllTasks();
    if (tasks.length === 0) {
      console.log("No Task Available");
      return;
    }
    const { taskId } = await inquirer.prompt([
      {
        type: "select",
        name: "taskId",
        message: "Which task do you want to update ?",
        choices: tasks.map((task) => ({
          name: `${task.id} - ${task.title} `,
          value: task.id
        }))
      }
    ]);
    const task = tasks.find((task) => task.id === taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "what is your task title?",
        default: task.title
      },
      {
        type: "confirm",
        name: "completed",
        message: "Is the task completed",
        default: task.completed
      },
      {
        type: "select",
        name: "priority",
        message: "Select Priority",
        choices: ["low", "medium", "high"],
        default: task.priority
      }
    ]);
    const updatedTask = await updateTask(taskId, answers);
    console.log("Task updated successfully");
    console.log(updatedTask);
  });
program.parse();
