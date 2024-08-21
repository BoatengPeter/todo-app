"use server"
import {db} from "~/server/db"
import { todos } from "./schema" 
import { z} from "zod"
import { subTasks } from "./schema"
import { revalidatePath } from "next/cache"
import { eq,and } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"

const todoSchema = z.object({
    id: z.number(),
    title: z.string({message:"Title is rquired"}),
    status: z.boolean(),
    description: z.string().nullable().optional(),
})

const  createTodoSchema = z.object({
    title: z.string({required_error: "Title is required"}).min(1, "Title cannot be empty"),
    status: z.boolean().default(false),
    description: z.string().nullable(),
})

const createSubTaskSchema = z.object({
    title: z.string({invalid_type_error:"Title is rquired"}).min(1, "Title cannot be empty"),
    description: z.string(),
    status: z.boolean(),
    todoId: z.number(),
})

export type State = {
    message?:string|null
}


export type CreateTodoData = z.infer<typeof createTodoSchema>
export type CreateSubTaskData = z.infer<typeof createSubTaskSchema>

export async function createTodo(data: CreateTodoData) {
    const user = auth()
    if(!user.userId) throw new Error ("unauthorized");
    try {

        const validatedData = createTodoSchema.safeParse(data);
        if(!validatedData.success){
            return { success: false, error: 'Invalid todo data', details: validatedData.error.flatten().fieldErrors };
        }else{
            const newTodo = await db.insert(todos)
                .values({
                    userId: user.userId,
                    title: validatedData.data.title,
                    status: validatedData.data.status,
                    description: validatedData.data.description,
                })
                .returning();
                return { success: true, data: newTodo[0] };
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation error:', error.errors);
            return { success: false, error: 'Invalid todo data', details: error.errors };
        }
        console.error('Failed to create todo:', error);
        return { success: false, error: 'Failed to create todo' };
    }finally{
        revalidatePath('/dashboard/inbox');
        revalidatePath('/dashboard/today');
}
}
export async function createSubTask(data: CreateSubTaskData) {
    const user = auth()
    if(!user.userId) throw new Error ("unauthorized");
    try {
        const validatedData = createSubTaskSchema.safeParse(data);
        if(!validatedData.success){
            return { success: false, error: 'Invalid todo data', details: validatedData.error.flatten().fieldErrors };
        }else{
            const newSubTask = await db.insert(subTasks)
                .values({ 
                    todoId: data.todoId,
                     title: validatedData.data.title, 
                     status: validatedData.data.status, 
                     description: validatedData.data.description 
                    })
                .returning();
                return { success: true, data: newSubTask[0] };
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation error:', error.errors);
            return { success: false, error: 'Invalid subTask data', details: error.errors };
        }
        console.error('Failed to create subTask:', error);
        return { success: false, error: 'Failed to create subTask' };
    }finally{
        revalidatePath("/dashboard/inbox");
        revalidatePath('/dashboard/today');
}
}


// Update todo status
export async function updateTodoStatus(id:string,status:boolean){
    try{
        const idasNum = Number(id)
        await db.update(todos).set({status}).where(eq(todos.id,idasNum))
        await db.delete(todos).where(eq(todos.id,idasNum))
        return {success:true, message:"Task completed successfully"}
    }catch(error){
        return {success:false, message:"Database error: Unable to update todo"}
    }finally{
        revalidatePath('/dashboard/inbox');
        revalidatePath('/dashboard/today');
    }
}

// Update subTask status
export async function updateSubTaskStatus(id:string,status:boolean){
    try{
        const idasNum = Number(id)
        await db.update(subTasks).set({status}).where(eq(subTasks.id,idasNum))
        // await db.delete(subTasks).where(eq(subTasks.id,idasNum))
        return {success:true, message:"SubTask updated successfully"}
    }catch(error){
        return {success:false, message:"Database error: Unable to update subTask"}
    }finally{
        revalidatePath('/dashboard/inbox');
        revalidatePath('/dashboard/today');
    }
}




export type TodoUpdateData = Omit<z.infer<typeof todoSchema>, 'id'>;


export async function updateTodo(id: string, data: TodoUpdateData) {
    const user = auth()
    if(!user.userId) throw new Error ("unauthorized");
    const idasNum = Number(id)
    try {
        const existingTodo = await db.query.todos.findFirst({
            where: and(
                eq(todos.id, idasNum),
                eq(todos.userId, user.userId)
            )
        })
        if(!existingTodo) return {success:false, message:"Todo not found"}
       
        const validatedData = todoSchema.omit({ id: true }).parse(data);
       
         const updatedTodo = await db.update(todos).set({
                    title: validatedData.title,
                    status: validatedData.status,
                    description: validatedData.description,
            },
        ).where(and(eq(todos.id,idasNum),eq(todos.userId,user.userId))).returning()
        return { success: true, data: updatedTodo };
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation error:', error.errors);
            return { success: false, error: 'Invalid todo data', details: error.errors };
        }
        console.error('Failed to update todo:', error);
        return { success: false, error: 'Failed to update todo' };
    }
    finally{
        revalidatePath('/dashboard/inbox');
        revalidatePath('/dashboard/today');
    }
}



export async function deleteTodo(id:string){
    try{
        const user = auth()
        if(!user.userId) throw new Error ("unauthorized");
        const idasNum = Number(id)
        await db.delete(todos).where(and(eq(todos.id,idasNum),eq(todos.userId,user.userId))  )
        return {success:true, message:"Todo deleted successfully"}
    
        
    }
    catch(error){
        return {success:false, message:"Database error: Unable to delete todo"}
    }finally{
        revalidatePath("/dashboard/inbox")
        revalidatePath("/dashboard/today")  
    }
    
}

//delete subTask
export async function deleteSubTask(id:string){
    try{
        const user = auth()
        if(!user.userId) throw new Error ("unauthorized");
        const idasNum = Number(id)
        await db.delete(subTasks).where(eq(subTasks.id,idasNum));
        return {success:true, message:"SubTask deleted successfully"}
    
        
    }
    catch(error){
        return {success:false, message:"Database error: Unable to delete subTask"}
    }finally{
        revalidatePath("/dashboard/inbox")
        revalidatePath("/dashboard/today")  
    }
    
}   

