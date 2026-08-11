import type { Request, Response } from "express";
import * as taskService from "../services/task.service.js";

export async function createTask(req: Request, res: Response) {
  try {
    const { title, priority } = req.body;
    const task = await taskService.createTask(title, priority);
    return res.status(201).json({
      task,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function taskList(req: Request, res: Response) {
  try {
    const tasks = await taskService.getAllTasks();
    console.log(tasks);
    return res.status(201).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedTask = await taskService.updateTask(id, req.body);

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    return res.status(500).json({
      message: "Failed to update task",
    });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const taskId = Number(req.params.id);
    const deleteTask = await taskService.deleteTask(taskId);
    return res.status(200).json({
      message: "Task deletd successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to delete task",
    });
  }
}
