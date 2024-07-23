"use client"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import AddTodoBtn from "../../components/common/AddTodoBtn"
import { CirclePlus } from "lucide-react"
import { useState } from "react"

import React from 'react'

const TodoForm = () => {
    const [showForm, setShowForm] = useState<boolean>(true)
    return (
        <>
            {showForm ? <AddTodoBtn text="Add Todo" icon={<CirclePlus fill="#3b82f6" size={27} stroke="#fff" />} className="bg-transparent w-full text-slate-700 hover:bg-white border-b-[1px] border-slate-200 " onClick={() => setShowForm(!showForm)} />
                : <div className="border-[1px] my-1 border-slate-200 rounded-md p-4 shadow-sm ">
                    <form className="flex flex-col gap-1">
                        <div className=" flex items-center gap-1   ">
                            <Checkbox name="completed" />
                            <Input name="title" placeholder="Name of your project" className="outline-none border-none focus:border-none focus:ring-0 focus-visible:ring-0  " />
                        </div>
                        <Input name="description" placeholder="some description..." className="outline-none border-none focus:border-none focus:ring-0 focus-visible:ring-0  " />
                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setShowForm(!showForm)}>Cancel</Button>
                            <Button type="submit" >Submit</Button>
                        </div>
                    </form>

                </div>
            }

        </>

    )
}

export default TodoForm







