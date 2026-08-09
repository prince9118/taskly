import { readFile, writeFile } from "node:fs/promises";
import { fileSchema, type TaskType } from "../types/task.js";

const filePath = "./data/task.json";

export async function getTasks(): Promise<TaskType[]> {
  try {
    const data = await readFile(filePath, "utf-8");
    const parsedData: unknown = JSON.parse(data);
    const result = fileSchema.safeParse(parsedData);
    if (!result.success) {
      console.error("Invalid task File", result.error);
      return [];
    }
    return result.data;

    // return JSON.parse(data).safeParse(fileSchema) as TaskType[];
  } catch (error) {
    console.log("failed to read tasks", error);
    return [];``
  }
}

export async function saveTasks(tasks: TaskType[]): Promise<void> {
  await writeFile(filePath, JSON.stringify(tasks, null, 2), "utf-8");
}
