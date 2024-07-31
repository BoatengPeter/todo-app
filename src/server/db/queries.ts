import { db } from "~/server/db"
import { todos,subTasks } from "./schema"
import { eq, sql } from "drizzle-orm"
export async function getAllTodos() {
  try {
    const todos = await db.query.todos.findMany(
      //  {columns:{ updatedAt:false,createdAt:false} ,with:{subTasks:false}}
      )
    return todos
  } catch (error) {
    console.log("Database error", error)
    // throw new Error("Failed to fetch todos")
  }
}

export async function fetchTodaysTodos(){
    try {
        // const date = new Date()
        // const todaysDate = date.getDate();
        // day:sql`EXTRACT(DAY FROM created_at)`
        const todaysTodos = await db.query.todos.findMany(
        //   {
        //   where:(model,{eq})=>eq(model.createdAt.getSQL("DAY"),todaysDate)
        // }
      ) 
        return todaysTodos
    } catch (error) {
        console.log("Database error", error)
        throw new Error("Failed to fetch todays todos")
        
    }
}
export async function fetchTodoById(id: number) {
  try {
    // const idasNum = Number(id)
    const todo = await db.query.todos.findFirst({
      where:(model,{eq})=>eq(model.id,id),columns:{ updatedAt:false,createdAt:false} ,with:{subTasks:false}
    })
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

