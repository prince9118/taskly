import type { TaskPriority } from "./types/task.js";
import axios from "axios";
const API_URL = "http://localhost:3000";
export async function createTask(title: string, priority: TaskPriority) {
  const response = await axios.post(`${API_URL}/tasks`, {
    title,
    priority,
  });
  const data = await response.data;
  return data;
}
export async function listTask() {
  const response = await axios.get(`${API_URL}/tasks/list`);
  const data = await response.data;
  return data;
}
