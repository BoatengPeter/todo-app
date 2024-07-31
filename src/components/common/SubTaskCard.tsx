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
import TodoForm from "../common/TodoForm"
import { type SubTaskProps } from "../../lib/types"
export function SubTaskCard({ subTasks }: { subTasks: SubTaskProps[] }) {
    const [showCard, setShowCard] = useState(false)
    const [checked, Setchecked] = useState(true)
    // const [subTask, setSubTask] = useState(subTasks)

    return (
        <>
            {subTasks?.length > 0 ? (
                <Accordion type="single" collapsible className="w-full  focus:outline-none focus:ring-0">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="border-b-[1px] border-slate-200  font-semibold">Sub Tasks({subTasks.length})</AccordionTrigger>
                        <AccordionContent >
                            {subTasks.map((subTask) => (
                                <div className="ml-6  border-b-[1px] border-slate-200" key={subTask.title}>
                                    <div className="flex py-3 gap-2 items-center">
                                        <div className="flex gap-2 items-center">

                                            <Checkbox checked={checked} onClick={() => Setchecked(!checked)} />
                                            <h1>{subTask.title}</h1>
                                        </div>

                                    </div>
                                    <p className="mb-2">{subTask.description}</p>
                                </div>

                            ))}
                            <>
                                {showCard ? (<TodoForm />

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
                    {showCard ? (<TodoForm />

                    ) : (<Button variant='outline' className=" bg-transparent w-32  text-bg-slate-700 hover:bg-blue-500 hover:border-b-[1px] hover:text-white" onClick={() => setShowCard(!showCard)}>
                        <Plus className="hover:fill-red-500 mr-2" fill="red-300" />
                        Add sub-task
                    </Button>
                    )}
                </>
                )}
        </>

    )
}

