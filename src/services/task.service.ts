import type { Task, TaskPriority } from "../types/task.js";
import { getTasks, saveTasks } from "../storage/task.storage.js";

export async function createTask(
  title: string,
  priority: TaskPriority
): Promise<Task> {
  const tasks = await getTasks();
  const task: Task = {
    id: tasks.length + 1,
    title,
    completed: false,
    priority
  };
  tasks.push(task);
  await saveTasks(tasks);
  return task;
}
