import { Router } from "express";
import {
  createTask,
  taskList,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = Router();

router.post("/", createTask);
router.get("/list", taskList);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
