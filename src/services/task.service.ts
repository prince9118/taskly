import {
  type TaskType,
  type CreateTaskInput,
  type TaskPriority,
  TaskSchema
} from "../types/task.js";
import { getTasks, saveTasks } from "../storage/task.storage.js";
import { title } from "node:process";

export async function createTask(input: CreateTaskInput): Promise<TaskType> {
  const tasks = await getTasks();
  const taskExists = tasks.some((task) => task.title === input.title);
  if (taskExists) {
    throw new Error("Task already exists");
  }
  const newTask = {
    id: tasks.length,
    title: input.title,
    completed: false,
    priority: input.priority
  };
  const parse = TaskSchema.safeParse(newTask);
  if (!parse.success) {
    throw new Error("Task data is incorrect");
  }
  tasks.push(parse.data);
  await saveTasks(tasks);
  return parse.data;
}
