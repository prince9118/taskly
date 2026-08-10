import { Router } from "express";
import { createTask, taskList } from "../controllers/task.controller.js";

const router = Router();

router.post("/", createTask);
router.get("/list", taskList);
router.patch("/:id",updateTask);

export default router;
