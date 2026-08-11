import express from "express";
import taskRouter from "./routes/task.routes.js";

const app = express();

app.use(express.json());

app.use("/tasks", taskRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
