"use client"
import { Checkbox } from "../../components/ui/checkbox"
import clsx from "clsx"
import { TodoFormOnly } from "./TodoForm"
import UpdateTodo from "./UpdateTodo"
import { useState } from "react"
export function TodoCard() {
    return (
        <div>


        </div>
    )
}

export function TodoItems() {
    const [update, setUpdateTodo] = useState(false);
    return (
        <div className="flex justify-between items-center  border-b-[1px]  border-slate-200 py-2 hover:cursor-pointer ">
            {update ? <TodoFormOnly onclick={() => setUpdateTodo(!update)} /> :
                <>
                    <div>
                        <div className="flex py-3 gap-2 items-center">
                            <Checkbox />
                            <h1 className={clsx("text-slate-600 font-medium mr-auto ")}>Todos</h1>
                        </div>
                        <p>hdahfdljshflkajs</p>
                        <p>sjalsfdhjlfaljdfhla</p>
                        {/* {subTasks ? <div className="flex items-center gap-2"><Workflow size={15} className="hover:bg-slate-200" />0/({subTasks.length})</div> : null} */}
                    </div>
                    <UpdateTodo edit={() => setUpdateTodo(!update)} deleteTodo={() => console.log("delete")} />
                </>
            }


        </div>
    )
}
