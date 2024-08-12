import { db } from "~/server/db"
import {auth} from "@clerk/nextjs/server"
import { eq, and, gte, lt } from 'drizzle-orm';
import { todos } from "./schema"
export async function getAllTodos() {
  try {
    const user =auth();
    if(!user.userId) throw new  Error("unathorized");
    const todos = await db.query.todos.findMany(
       {with:{subTasks:true}}
      )
    return todos
  } catch (error) {
    console.log("Database error", error)
    // throw new Error("Failed to fetch todos")
  }
}

export async function fetchTodaysTodos(){
    try {
        const user =auth();
        if(!user.userId) throw new Error ("unauthorized");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const todaysTodos = await db.query.todos.findMany({
          where: and(
            gte(todos.createdAt, today),
            lt(todos.createdAt, tomorrow)
          )
        }
      ) 
        return todaysTodos
    } catch (error) {
        console.log("Database error", error)
        throw new Error("Failed to fetch todays todos")
        
    }
}
export async function fetchTodoById(id: number) {
  try {
    const user = auth()
    if(!user.userId) throw new Error ("unauthorized");
    // const idasNum = Number(id)
    const todo = await db.query.todos.findFirst({
      where:(model,{eq})=>eq(model.id,id),columns:{ updatedAt:false,createdAt:false} ,with:{subTasks:true}
    })
    if(!todo) throw new Error("Todo not found")
      if(todo.userId !== user.userId) throw new Error("Unauthorized")
    return todo
  } catch (error) {
    console.log("Database error", error)
    throw new Error("Failed to fetch todo")
  }
}

// export async function getSubTasksById(id: string) {
//   try {
//     const subTasks = await db.query.subTasks.findMany({
//       where: { todoId: id },
//       // columns:{ updatedAt:false,createdAt:false} ,with:{subTasks:false}
//     })
//     return subTasks
//   } catch (error) {
//     console.log("Database error", error)
//     throw new Error("Failed to fetch subTasks")
//   }
// }

