import prisma from "../db/prisma.js";
import type { TaskType, TaskPriority, CreateTaskInput } from "../types/task.js";

export async function createTask(input: CreateTaskInput): Promise<TaskType> {
  return prisma.task.create({
    data: {
      title: input.title,
      priority: input.priority
    }
  });
}

export async function findByTitle(title: string) {
  return prisma.task.findFirst({
    where: {
      title,
      isDeleted: false
    }
  });
}
