"use client"
import { Checkbox } from "../../components/ui/checkbox"
import clsx from "clsx"
import { Calendar, Workflow } from "lucide-react"
import { TodoFormOnly } from "./TodoForm"
import React from "react"
import { useState } from "react"
import { type TodoCardProps } from "~/lib/types"
import { formatDateToLocal } from "~/lib/utils"
import { DeleteTodo, UpdateTodo } from "./buttons"
import Link from "next/link"
import { usePathname } from "next/navigation"


export function TodoCard({ todos, onUpdateStatus, onDeleteTodo }: { todos: TodoCardProps, onUpdateStatus: (id: string, status: boolean) => Promise<void>, onDeleteTodo: (id: string) => Promise<void> }) {


    const [update, setUpdateTodo] = useState(false);
    const [checkDone, setCheckDone] = useState(false);
    const pathname = usePathname()

    return (
        <>
            <div className="relative flex justify-between items-center  border-b-[1px]  border-slate-200 py-2  ">
                {update ? <TodoFormOnly onclick={() => setUpdateTodo(!update)} todo={todos} /> :
                    <>

                        <div className="flex-1 peer hover:cursor-pointer">
                            {/* <Link href={`${pathname}/${todos?.id}`} > */}

                            <div className="flex py-2 gap-2 items-center">
                                <Checkbox className="rounded-full" defaultChecked={todos?.status} checked={todos?.status} onChange={() => onUpdateStatus(String(todos?.id), todos?.status)} />
                                <h1 className={clsx("text-slate-600 font-medium mr-auto ")}>{todos?.title}</h1>
                            </div>
                            <div className="ml-6">

                                <p className="text-slate-700 ">{todos?.description}</p>
                                <div className="flex items-center gap-2">
                                    <Calendar size={15} />
                                    <small>{formatDateToLocal(String(todos?.createdAt))}</small>
                                </div>
                            </div>
                            {todos?.subTasks ? <div className="flex items-center gap-2"><Workflow size={15} className="hover:bg-slate-200" />0/({todos?.subTasks?.length})</div> : null}
                            {/* </Link> */}
                        </div>
                        <div className="absolute right-0 z-20 top-0 hidden gap-2 peer-hover:flex ">
                            <UpdateTodo onclick={() => setUpdateTodo(!update)} />

                            <DeleteTodo id={String(todos?.id)} onDeleteTodo={onDeleteTodo} />
                        </div>
                    </>
                }
            </div >
        </>
    )
}



