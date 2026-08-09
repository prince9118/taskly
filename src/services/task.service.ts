import { type TaskType, type TaskPriority, TaskSchema } from "../types/task.js";
import { getTasks, saveTasks } from "../storage/task.storage.js";

export async function createTask(
  title: string,
  priority: TaskPriority
): Promise<TaskType> {
  const tasks = await getTasks();
  const task: TaskType = {
    id: tasks.length,
    title,
    completed: false,
    priority
  };
  const parse = TaskSchema.safeParse(task);
  if (parse.success) {
    tasks.push(task);
    await saveTasks(tasks);
    return task;
  }
  throw new Error("Task data is incorrect");
}
