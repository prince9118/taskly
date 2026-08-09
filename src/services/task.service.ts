import {
  type TaskType,
  type CreateTaskInput,
  type TaskPriority,
  TaskSchema
} from "../types/task.js";
import { getTasks, saveTasks } from "../storage/task.storage.js";
import { title } from "node:process";

export async function createTask(input: CreateTaskInput): Promise<TaskType> {
  const tasks = await getTasks();
  const taskExists = tasks.some((task) => task.title === input.title);
  if (taskExists) {
    throw new Error("Task already exists");
  }
  const nextId =
    tasks.length === 0 ? 1 : Math.max(...tasks.map((task) => task.id)) + 1;
  const newTask = {
    id: nextId,
    title: input.title,
    completed: false,
    priority: input.priority
  };
  const parse = TaskSchema.safeParse(newTask);
  if (!parse.success) {
    throw new Error("Task data is incorrect");
  }
  tasks.push(parse.data);
  await saveTasks(tasks);
  return parse.data;
}

export async function getAllTasks(): Promise<TaskType[]> {
  return getTasks();
}

export async function completeTask(id: number): Promise<TaskType> {
  const tasks = await getTasks();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }

  task.completed = true;
  await saveTasks(tasks);
  return task;
}

export async function removeTask(id: number): Promise<TaskType> {
  const tasks = await getTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    throw new Error(`Task with id ${id} not found`);
  }
  const deletedTask = tasks[index]!;
  tasks.splice(index, 1);
  //   const [deletedTask] = tasks.splice(index, 1);
  await saveTasks(tasks);
  return deletedTask;
}

export async function updateTask(id:number,
    updates:{
        title:string;
        completed:boolean;
        priority:TaskPriority;

    }):Promise<TaskType>{
        const tasks=await getTasks();
        const task=tasks.find((task)=>task.id === id);
        if(!task){
            throw new Error(`Task with id ${id} not found`);
        }
        task.title=updates.title;
        task.completed=updates.completed;
        task.priority=updates.priority;
        await saveTasks(tasks);
        return task;

    }
