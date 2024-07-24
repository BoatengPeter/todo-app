"use client"
import React from "react"
import { PenLine, Trash2 } from "lucide-react"
interface UpdateTodoProps {
    edit?: () => void
    deleteTodo?: () => void
}
const UpdateTodo = ({ edit, deleteTodo }: UpdateTodoProps) => {

    return (
        <>

            <div className="flex gap-2 items-center">
                <button onClick={edit} className="z-20">
                    <PenLine size={20} className="hover:bg-slate-200 " />
                </button>
                <button className="z-20" onClick={deleteTodo}>
                    <Trash2 size={20} className="hover:bg-slate-200" />
                </button>
            </div>



        </>

    );
}

export default UpdateTodo 