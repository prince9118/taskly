import {
  type TaskType,
  type CreateTaskInput,
  type TaskPriority,
  TaskSchema
} from "../types/task.js";
import { getTasks, saveTasks } from "../storage/task.storage.js";
import * as taskRepository from "../respositories/task.repositories.js";

export async function createTask(input: CreateTaskInput): Promise<TaskType> {
  const taskExist = await taskRepository.findByTitle(input.title);
  if (taskExist) {
    throw new Error("Task already exist");
  }
  const task = await taskRepository.createTask(input);
  return task;
}

export async function getAllTasks(): Promise<TaskType[]> {
  return getTasks();
}

export async function completeTask(id: number): Promise<TaskType> {
  const tasks = await getTasks();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }

  task.completed = true;
  await saveTasks(tasks);
  return task;
}

export async function removeTask(id: number): Promise<TaskType> {
  const tasks = await getTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    throw new Error(`Task with id ${id} not found`);
  }
  const deletedTask = tasks[index]!;
  tasks.splice(index, 1);
  //   const [deletedTask] = tasks.splice(index, 1);
  await saveTasks(tasks);
  return deletedTask;
}

export async function updateTask(
  id: number,
  updates: {
    title: string;
    completed: boolean;
    priority: TaskPriority;
  }
): Promise<TaskType> {
  const tasks = await getTasks();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }
  task.title = updates.title;
  task.completed = updates.completed;
  task.priority = updates.priority;
  await saveTasks(tasks);
  return task;
}
