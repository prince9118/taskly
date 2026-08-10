// export type TaskPriority = "low" | "medium" | "high";
// export interface Task {
//   id: number;
//   title: string;
//   completed: boolean;
//   priority: TaskPriority;
// }
import z from "zod";

export const TaskPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH"]);
export type TaskPriority = z.infer<typeof TaskPrioritySchema>;
export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
  priority: TaskPrioritySchema,

  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),

  deletedAt: z.date().nullable(),
  completedAt: z.date().nullable()
});
export type CreateTaskInput = {
  title: string;
  priority: TaskPriority;
};
export const fileSchema = z.array(TaskSchema);

export type TaskType = z.infer<typeof TaskSchema>;

export const taskIdSchema = z.number().int().positive();
