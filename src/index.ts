import { title } from "node:process";
import type { Task } from "./types/task.js";

const task: Task = {
  id: 1,
  title: "Learn Redis",
  completed: false,
  priority: "high"
};
console.log(task);
