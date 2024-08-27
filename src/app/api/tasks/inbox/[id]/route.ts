import { db } from "~/server/db"
import {auth} from "@clerk/nextjs/server"
import { NextResponse } from "next/server";
import { todos } from "./schema" 
import { z} from "zod"
import { subTasks } from "../../../../../server/db/schema"
import { revalidatePath } from "next/cache"
import { eq,and } from "drizzle-orm"
import { type CreateTodoData,type CreateSubTaskData, type TodoUpdateData } from "../../../../../server/db/schema"; 
//get inbox task by id
export async function GET(request: Request,{params}:{params:{id:string}}){
  const user = auth();
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("id");
//   if(!id) return NextResponse.json([])
    try{
        if(!user.userId) {
            return NextResponse.json({error:"unauthorized"},{status:401})
        }
        const todoId = parseInt(params.id)
        const task = await db.query.todos.findFirst({
            where:(model,{eq})=>eq(model.id,todoId),with:{
                subTasks:{
                  columns:{
                    todoId:false
                  }
                }
              }
          })   
          if(!task) return NextResponse.json({message:"Task not found"},{status:404})
            if(task.userId !== user.userId){
                return NextResponse.json({error:"unauthorized"},{status:401})
            }
        return NextResponse.json(task)
    }catch(e){
        console.log("failed to fetch tasks",e)
        return NextResponse.json({error:"Failed to fetch task"},{status:500})
    }
  
}

// create task
export async function POST(request: Request,{params}:{params:{id:string}}){
    try{
    const user = auth();
    if(!user.userId){
        return NextResponse.json({error:"unauthorized"},{status:401})

    }
    const data:CreateTodoData = await request.json();
    const validatedData = createTodoSchema.safeParse(data);
    if(!validatedData.success){
        return NextResponse.json({success:true,
            details:validatedData.error.flatten().fieldErrors
        },{status:400})
    }
        
    }catch(e){
        console.log("failed to create task",e)
        return NextResponse.json({error:"Failed to create task"},{status:500})  
    }
}