import {
  type TaskType,
  type CreateTaskInput,
  type TaskPriority,
  TaskSchema,
} from "../types/task.js";
import { getTasks, saveTasks } from "../storage/task.storage.js";
import * as taskRepository from "../respositories/task.repositories.js";
import prisma from "../db/prisma.js";

export async function createTask(
  title: string,
  priority: TaskPriority,
): Promise<TaskType> {
  const taskExist = await taskRepository.findByTitle(title);
  if (taskExist) {
    throw new Error("Task already exist");
  }
  const task = await taskRepository.createTask(title, priority);
  return task;
}

// export async function getAllTasks(): Promise<TaskType[]> {
//   return getTasks();
// }

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

export async function getAllTasks() {
  return await taskRepository.findAllTasks();
}

export async function updateTask(
  id: number,
  data: {
    title: string;
    completed: boolean;
    priority: TaskPriority;
  },
) {
  const updateTask = await taskRepository.updateTask(id, data);
  return updateTask;
}

export async function deleteTask(id: number) {
  const deleteTask = await taskRepository.deleteTask(id);
  return deleteTask;
}
