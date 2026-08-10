import prisma from "../db/prisma.js";
import type { TaskType, TaskPriority, CreateTaskInput } from "../types/task.js";

export async function createTask(
  title: string,
  priority: TaskPriority
): Promise<TaskType> {
  return prisma.task.create({
    data: {
      title: title,
      priority: priority
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

export async function findAllTasks() {
  return await prisma.task.findMany({
    orderBy: {
      id: "asc"
    }
  });
}
