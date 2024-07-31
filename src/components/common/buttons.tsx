import React from "react"
import { deleteTodo } from "../../server/db/actions"
import { PenLine, Trash2 } from "lucide-react"

// export function UpdateTodo({ id }: { id: string }) {
//     const targetTodo = UpdateTodo(id)
//     return (


//         <>
//             <form action={targetTodo}>

//                 <button className="z-20">
//                     <PenLine size={20} className="hover:bg-slate-200 " />
//                 </button>
//             </form>
//         </>
//     )
// }


export function DeleteTodo({ id }: { id: string }) {

    const targetTodo = deleteTodo.bind(null, id)
    return (
        <>
            <form action={targetTodo}>
                <button className="z-20 rounded-md">
                    <span className="sr-only">Delete</span>
                    <Trash2 size={20} className="hover:bg-slate-200 " />
                </button>

            </form>

        </>
    )
}

