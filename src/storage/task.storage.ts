import { readFile, writeFile } from "node:fs/promises";
import type { Task } from "../types/task.js";

const filePath = "./data/task.json";

export async function getTasks(): Promise<Task[]> {
  try {
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data) as Task[];
  } catch {
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await writeFile(filePath, JSON.stringify(tasks, null, 2), "utf-8");
}
