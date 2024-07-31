"use server"
import {db} from "~/server/db"
import { todos } from "./schema" 
import { z} from "zod"
import { subTasks } from "./schema"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

const todoSchema = z.object({
    id: z.number(),
    title: z.string({message:"Title is rquired"}),
    status: z.boolean({invalid_type_error:"Status is rquired"}),
    description: z.string({invalid_type_error:"Description is rquired"}),
})

const subTaskSchema = z.object({
    id: z.number(),
    title: z.string({invalid_type_error:"Title is rquired"}),
    description: z.string(),
    status: z.boolean(),
    parentId: z.number(),
})

export type State = {
    errors?:{
        title?:string,
        status?:boolean,
        description?:string,
    }
    message?:string|null
}

const  createTodoSchema = todoSchema.omit({id:true})
export async function createTodo(prevState:State,formdata:FormData){
    // const fields = CreateTodo.parse(Object.fromEntries(formdata))
    const validatedFields = createTodoSchema.safeParse({
        title: formdata.get("title"),
        status: formdata.get("status"),
        description: formdata.get("description")
    })
   if(!validatedFields.success){
    return{
        errors:validatedFields.error.flatten().fieldErrors,
        message:"Missing field, failed to create todo"
    }
      
   }
   const fields = validatedFields.data
    try {
        await db.insert(todos).values(fields)
    } catch (error) {
        return { message:"Database error: Unable to create todo" }
        
    }
    revalidatePath("/dashboard/inbox")
}

export async function UpdateTodo(id:string,formdata:FormData){
    const idasNum = Number(id)
    const validatedFields = createTodoSchema.safeParse(Object.fromEntries(formdata))
    if(!validatedFields.success){
        return{
            errors:validatedFields.error.flatten().fieldErrors,
            message:"Missing field, failed to update todo"
        }
    }
    const fields = validatedFields.data
    try {
     await db.update(todos)
     .set(fields)
     .where(eq(todos.id,idasNum))

    } catch (error) {
        return { message:"Database error: Unable to update todo" }
        
    }
    revalidatePath("/dashboard/inbox")
}

export async function deleteTodo(id:string){
    try{
        // await new Promise(resolve => setTimeout(resolve, 2000));
        const idasNum = Number(id)
        await db.delete(todos).where(eq(todos.id,idasNum))
        console.log("deleted")
        
    }
    catch(error){
        return {message:"Database error: Unable to delete todo"}
    }
    revalidatePath("/dashboard/inbox")
    revalidatePath("/dashboard/today")
}