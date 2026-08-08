export type TaskPriority = "low" | "medium" | "high";
export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: TaskPriority;
}
