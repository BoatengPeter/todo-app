import { db } from "~/server/db"
import {auth} from "@clerk/nextjs/server"
import {  and, gte, lt, like,eq } from 'drizzle-orm';
import { todos } from "../../../server/db/schema";
import { NextResponse,NextRequest } from "next/server";

//get all tasks
export async function GET(){
    const user = auth();
    try{
        if(!user.userId) throw new Error ("unauthorized");
        const results = await db.query.todos.findMany({
            where:(model,{eq})=>eq(model.userId,user.userId),
            with:{
              subTasks:true
            },columns:{
              userId:false
            }
          })    
        return NextResponse.json(results)
    }catch(e){
        console.log("failed to fetch tasks",e)
        return NextResponse.json([])
    }
}

// export async function GET(request: Request) {
//   const user = auth();
//   if(!user.userId) throw new Error ("unauthorized");
//   const { searchParams } = new URL(request.url);
//   const query = searchParams.get("query");
//   if(!query) return NextResponse.json([])
//   const results = await db.query.todos.findMany({
//     where: like(todos.title, `%${query}%`),
//     with:{
//       subTasks:true
//     }
//   })    
//   return NextResponse.json(results)
// }               