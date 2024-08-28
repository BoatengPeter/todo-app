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
import { usePathname } from "next/navigation"
import Link from "next/link"
import { updateTodoStatus, updateSubTaskStatus } from "../../server/db/actions"
import { toast } from "sonner"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuTrigger,
// } from "../ui/dropdown-menu"




export function TodoCard({ todos, onDeleteTodo }: { todos: TodoCardProps, onDeleteTodo: (id: string) => Promise<void> }) {

    const pathname = usePathname();
    const [update, setUpdateTodo] = useState(false);
    const [status, setStatus] = useState(todos?.status);
    const [isUpdating, setIsUpdating] = useState(false);
    // const [priority, setPriority] = useState('black');

    // const handleFlagClick = (color: string) => {
    //     setPriority(color);
    // }



    const handleStatusChange = async () => {
        setIsUpdating(true);
        const newStatus = !status;
        setStatus(newStatus);
        try {
            await updateTodoStatus(String(todos?.id), newStatus);
            toast.success("Task completed successfully");
        }
        catch (error) {
            toast.error("Failed to update todo");
            setStatus(!newStatus);
        }
        finally {
            setIsUpdating(false);
        }
    }

    return (
        <>
            <div className="w-full relative flex justify-between items-center  border-b-[1px]  border-slate-200 py-2  ">
                {update ? <TodoFormOnly onclick={() => setUpdateTodo(!update)} todo={todos} /> :
                    <>
                        <div className="flex w-[90%] peer ">
                            <div className=" flex  gap-2">

                                <Checkbox className="rounded-full h-[1.28rem] w-[1.25rem]" checked={todos?.status} onChange={() => setStatus(!status)}
                                    onCheckedChange={handleStatusChange} disabled={isUpdating} />
                                <Link href={`${pathname}/${todos?.id}`}>

                                    <h1 className={clsx("text-slate-600 font-medium mr-auto ", status ? "line-through" : "")}>{todos?.title}</h1>

                                    <p className=" text-slate-700 text-sm font-thin   overflow-hidden  ">{todos?.description}</p>
                                    <div className="flex items-center gap-2 ">
                                        <Calendar size={15} />
                                        <small>{formatDateToLocal(String(todos?.createdAt))}</small>
                                    </div>
                                    {(todos?.subTasks?.length ?? 1) ? <div className="flex items-center gap-2"><Workflow size={15} className="hover:bg-slate-200" /><small>0/({todos?.subTasks?.length})</small></div> : null}

                                </Link>

                            </div>
                        </div>

                        <div className="w-[10%] hover:flex absolute right-0  top-0 hidden gap-2 peer-hover:flex  ">

                            <UpdateTodo onclick={() => setUpdateTodo(!update)} />
                            {/* <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <button>
                                        <Ellipsis size={20} /></button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent  >
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>Set Priority</DropdownMenuLabel>
                                        <div className="flex gap-1">
                                            <DropdownMenuItem><button><Flag size={15} color="red" /></button></DropdownMenuItem>
                                            <DropdownMenuItem><button><Flag size={15} color="orange" /></button></DropdownMenuItem>
                                            <DropdownMenuItem><button><Flag size={15} color="blue" /></button></DropdownMenuItem>
                                            <DropdownMenuItem><button><Flag size={15} /></button></DropdownMenuItem>
                                        </div>
                                    </DropdownMenuGroup>

                                </DropdownMenuContent>
                            </DropdownMenu> */}
                            <DeleteTodo onDeleteTodo={() => onDeleteTodo(String(todos?.id))} />
                        </div>
                    </>
                }
            </div >
        </>
    )
}


export function ModalTodoCard({ todos }: { todos: TodoCardProps }) {
    const [update, setUpdateTodo] = useState(false);
    const [status, setStatus] = useState(todos?.status);
    const [isUpdating, setIsUpdating] = useState(false);



    const handleStatusChange = async () => {
        setIsUpdating(true);
        const newStatus = !status;
        setStatus(newStatus);
        try {
            await updateSubTaskStatus(String(todos?.id), newStatus);
            toast.success("Task completed successfully");
        }
        catch (error) {
            toast.error("Failed to update todo");
            setStatus(!newStatus);
        }
        finally {
            setIsUpdating(false);
        }
    }


    return (
        <>
            <div className="relative flex justify-between items-center  border-b-[1px]  border-slate-200 py-2  ">
                {update ? <TodoFormOnly onclick={() => setUpdateTodo(!update)} todo={todos} /> :
                    <>
                        <div className="flex-1 peer ">

                            <div className="flex  gap-2 items-center">

                                <Checkbox className="rounded-full h-[1.28rem] w-[1.28rem] " checked={todos?.status} onCheckedChange={handleStatusChange} disabled={isUpdating} />
                                <h1 className={clsx("text-slate-600 font-medium mr-auto ")}>{todos?.title}</h1>
                            </div>
                            <div className="ml-6">

                                <p className="text-slate-700 text-sm font-thin ">{todos?.description}</p>
                                <div className="flex items-center gap-2">
                                    <Calendar size={15} />
                                    <small>{formatDateToLocal(String(todos?.createdAt))}</small>
                                </div>
                            </div>
                            {(todos?.subTasks?.length ?? 1) ? <div className="flex items-center gap-2"><Workflow size={15} className="hover:bg-slate-200" /><small>0/({todos?.subTasks?.length})</small></div> : null}
                        </div>

                        <div className="hover:flex absolute right-0  top-0 hidden gap-2 peer-hover:flex ">
                            <UpdateTodo onclick={() => setUpdateTodo(!update)} />
                        </div>
                    </>
                }
            </div >
        </>
    )

}
