'use client'
import { Plus } from "lucide-react"
import React from "react"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion"
import { DeleteTodo, UpdateTodo } from "./buttons"
import { type SubTaskProps } from "../../lib/types"
import { SubTaskForm, UpdateSubTaskForm } from "./TodoForm"
import { useParams } from "next/navigation"
import { updateSubTaskStatus, deleteSubTask } from "../../server/db/actions"
import { toast } from "sonner"
import clsx from 'clsx'

interface ExtendedSubTaskProps extends SubTaskProps {
    onDeleteTodo: (id: string) => Promise<void>
}

function SUbTask({ title, description, status, createdAt, id, onDeleteTodo }: ExtendedSubTaskProps) {
    const [update, setUpdateSubTask] = useState(false);
    const [status1, setStatus] = useState(status);
    const [isUpdating, setIsUpdating] = useState(false);



    const handleStatusChange = async () => {
        setIsUpdating(true);
        const newStatus = !status1;
        setStatus(newStatus);
        try {
            await updateSubTaskStatus(String(id), newStatus);
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
            <div className="ml-6 relative  border-b-[1px] border-slate-200" >
                {update ? <UpdateSubTaskForm onclick={() => setUpdateSubTask(!update)} subTask={{ id, title, description, status, createdAt }} /> :
                    <div key={id}>
                        <div className="flex py-3 gap-2 items-center">
                            <div className="flex gap-2 items-center">
                                <Checkbox checked={status} onCheckedChange={handleStatusChange} disabled={isUpdating} />
                                <h1 className={clsx("text-slate-600 font-medium mr-auto ", status ? "line-through" : "")}>{title}</h1>
                            </div>

                        </div>
                        <p className="mb-2">{description}</p>
                        <div className="absolute right-0 z-20 top-0 gap-2 peer-hover:flex ">
                            <UpdateTodo onclick={() => setUpdateSubTask(!update)} />

                            <DeleteTodo onDeleteTodo={() => onDeleteTodo(String(id))} />
                        </div>

                    </div>


                }
            </div>

        </>

    )
}
export function SubTaskList({ subtasks }: { subtasks: SubTaskProps[] }) {
    const handleDeleteSubTask = async (id: string) => {
        await deleteSubTask(id)
    }
    return (

        <>
            {subtasks?.map(task => (
                <SUbTask key={task.id} {...task} onDeleteTodo={handleDeleteSubTask} />

            ))}
        </>



    )
}




export function SubTaskCard({ subTasks }: { subTasks: SubTaskProps[] }) {
    const [showCard, setShowCard] = useState(false)
    const params = useParams()
    const todoId = params.id



    return (
        <>

            {subTasks?.length > 0 ? (
                <Accordion type="single" collapsible className="w-full  focus:outline-none focus:ring-0">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="border-b-[1px] border-slate-200  font-semibold">Sub Tasks({subTasks.length})</AccordionTrigger>
                        <AccordionContent >


                            <SubTaskList subtasks={subTasks} />
                            <>
                                {showCard ? (<SubTaskForm todoId={Number(todoId)}>
                                    <Button variant="outline" onClick={() => setShowCard(!showCard)}>Cancel</Button>

                                </SubTaskForm>


                                ) : (<Button className="bg-transparent w-full text-bg-slate-700 hover:bg-transparent " onClick={() => setShowCard(!showCard)}>
                                    <Plus className="hover:fill-red-500 mr-2" fill="red-300" />
                                    Add task
                                </Button>
                                )}
                            </>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            )
                : (<>
                    {showCard ? (<SubTaskForm todoId={Number(todoId)} >
                        <Button variant="outline" onClick={() => setShowCard(!showCard)}>Cancel</Button>
                    </SubTaskForm>

                    ) : (<Button variant='outline' className=" bg-transparent w-32  text-bg-slate-700 hover:bg-blue-500 hover:border-b-[1px] hover:text-white" onClick={() => setShowCard(!showCard)}>
                        Add sub-task
                    </Button>
                    )}
                </>
                )}

        </>

    )
}

