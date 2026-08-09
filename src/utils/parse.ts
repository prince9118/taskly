import { taskIdSchema } from "../types/task.js";
 export function parseTaskId(value:string):number{
    const  id = Number(value);
    const result = taskIdSchema.safeParse(id);
    if(!result.success){
        throw new Error("Task Id must be a positive integer");
    }
    return result.data;
 }
