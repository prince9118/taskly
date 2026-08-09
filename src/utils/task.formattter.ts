import type { TaskType } from "../types/task.js";
export function formatTask(task: TaskType): string {
  const status = task.completed ? "✓" : "○";
  return `${task.id}  ${status} ${task.priority}  ${task.title}`;
}
