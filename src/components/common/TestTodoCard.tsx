"use client"
import { Checkbox } from "../../components/ui/checkbox"
import clsx from "clsx"
import { Workflow } from "lucide-react"
import { TodoFormOnly } from "./TodoForm"
// import UpdateTodo from "./UpdateTodo"
import React from "react"
import { useState } from "react"
import { type TodoCardProps } from "~/lib/types"
import { formatDateToLocal } from "~/lib/utils"
import { DeleteTodo } from "./buttons"
import Link from "next/link"

// import { deleteTodo } from "~/server/db/actions"

export function TestTodoCard() {
    const [update, setUpdateTodo] = useState(false);
    const [checkDone, setCheckDone] = useState(false);
    return (
        <>
            <div className="flex justify-between items-center  border-b-[1px]  border-slate-200 py-2  ">
                {update ? <TodoFormOnly onclick={() => setUpdateTodo(!update)} /> :
                    <>

                        <div className="flex-1 peer hover:cursor-pointer">
                            <Link href={`/dashboard/inbox/${1}`} >

                                <div className="flex py-3 gap-2 items-center">
                                    <Checkbox checked={false} onChange={() => setCheckDone(!checkDone)} />
                                    <h1 className={clsx("text-slate-600 font-medium mr-auto ")}>Hello</h1>
                                </div>
                                <p>We are up and running</p>
                                <p>{formatDateToLocal("2023-03-01")}</p>

                            </Link>
                        </div>
                        <div className="hidden peer-hover:flex ">
                            {/* {children} */}
                            {/* <DeleteTodo id={String(todos.id)} /> */}

                        </div>
                    </>
                }


            </div >
        </>

    )
}
