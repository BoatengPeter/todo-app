"use client"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import AddTodoBtn from "../../components/common/AddTodoBtn"
import { CirclePlus } from "lucide-react"
import { useState, useTransition, useEffect } from "react"
import React from 'react'
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { createSubTask, type CreateSubTaskData, createTodo, type CreateTodoData, updateTodo } from "~/server/db/actions"
import { type SubTaskProps, type TodoCardProps } from "~/lib/types"
import { type TodoUpdateData } from "~/server/db/actions"
import { cn } from "~/lib/utils"


const TodoFormWithBtn = () => {
    const [showForm, setShowForm] = useState<boolean>(true)
    return (
        <>
            {showForm ? <AddTodoBtn text="Add Task" icon={<CirclePlus fill="#3b82f6" size={27} stroke="#fff" />} className="bg-transparent w-full text-slate-700 hover:bg-white border-b-[1px] border-slate-200 " onClick={() => setShowForm(!showForm)} /> : <TodoForm >
                <Button variant="outline" onClick={() => setShowForm(!showForm)}>Cancel</Button>
            </TodoForm>}

        </>
    )
}
export default TodoFormWithBtn

export function TodoForm({ children, className }: { children?: React.ReactNode, className?: string, }) {
    const [isPending, startTransition] = useTransition()


    const [formData, setFormData] = useState<CreateTodoData>({
        title: '',
        status: false,
        description: '',
    })
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value,
        }))
    }




    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        startTransition(async () => {


            try {
                const result = await createTodo(formData);
                if (result.success) {
                    toast.success('Todo created successfully');

                    setFormData({ title: '', status: false, description: '' });

                } else {

                    toast.error(result.error ?? 'Failed to create todo');
                }
            } catch (error) {
                toast.error('An unexpected error occurred');

            }

        })
    }


    return (
        <>
            <div className={cn("border-[1px] my-1 border-slate-200 rounded-md p-4 shadow-sm  ", className)}>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-1">
                    <div className=" flex items-center gap-1   ">


                        <Input type="text" name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Name of your project" className="outline-none border-none focus:border-none focus:ring-0 focus-visible:ring-0  " required />
                    </div>


                    <Input type="text" name="description"

                        placeholder="some description..."
                        value={formData.description ?? ''}
                        onChange={handleChange}
                        className=" outline-none border-none focus:border-none focus:ring-0 focus-visible:ring-0  "
                    />
                    <div className="flex justify-between">
                        {children}
                        <Button className={cn("bg-blue-500 text-white disabled:cursor-not-allowed hover:bg-blue-400", isPending && "hover:disabled:cursor-not-allowed")} type="submit" disabled={isPending} >{isPending ? "Adding todo..." : "Add todo"}</Button>
                    </div>
                </form>

            </div>


        </>

    )
}





interface TodoFormOnlyProps {
    todo?: TodoCardProps
    onclick?: () => void
}



export function TodoFormOnly({ onclick, todo }: TodoFormOnlyProps) {

    const [isPending, startTransition] = useTransition()
    const [formData, setFormData] = useState<Omit<TodoUpdateData, 'id'>>({
        title: '',
        description: '',
        status: false,
    })


    useEffect(() => {
        if (todo) {
            setFormData({
                title: todo.title,
                description: todo.description,
                status: todo.status,
            })
        }
    }, [todo])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value,
        }))
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        startTransition(async () => {
            try {
                if (todo?.id) {
                    await updateTodo(String(todo.id), formData)
                    toast.success('Todo updated successfully')
                }

            } catch (error) {
                toast.error('Failed to save todo')
            }
        })
    }
    return (
        <div className="border-[1px] w-full my-1 border-slate-200 rounded-md p-4 shadow-sm ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                <div className=" flex items-center gap-1   ">

                    <Input type="text" name="title" placeholder="Name of your project" className="outline-none border-none focus:border-none focus:ring-0 focus-visible:ring-0  " value={formData.title}
                        onChange={handleChange} required />
                </div>
                <Input type="text" name="description" placeholder="some description..." className="pl-2 outline-none border-none focus:border-none focus:ring-0 focus-visible:ring-0  "
                    onChange={handleChange} value={formData?.description ?? ""} />
                <div className="flex justify-between">
                    <Button variant="outline" onClick={onclick}>Cancel</Button>
                    <Button className="bg-blue-500 text-white disabled:cursor-not-allowed hover:bg-blue-400" type="submit" disabled={isPending} >{isPending ? "Updating todo..." : "Update todo"}</Button>
                </div>
            </form>

        </div>
    )
}



export function SubTaskForm({ children, className, todoId }: { children?: React.ReactNode, className?: string, todoId: number }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [formData, setFormData] = useState<Omit<CreateSubTaskData, 'todoId'>>({
        title: '',
        status: false,
        description: '',
    })


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        startTransition(async () => {
            const subTaskData: CreateSubTaskData = {
                ...formData,
                todoId: Number(todoId),
            }
            try {
                const result = await createSubTask(subTaskData);
                if (result.success) {
                    toast.success('sub task created successfully');
                    setFormData({ title: '', status: false, description: '' });
                    router.refresh()
                } else {

                    toast.error(result.error ?? 'Failed to create sub task');
                }
            } catch (error) {
                toast.error('An unexpected error occurred');
            }

        })
    }


    return (
        <>
            <div className={cn("border-[1px] my-1 border-slate-200 rounded-md p-4 shadow-sm  ", className)}>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-1">
                    <div className=" flex items-center   ">


                        <Input type="text" name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Name of your project" className="outline-none border-none focus:border-none focus:ring-0 focus-visible:ring-0  " required />
                    </div>


                    <Input type="text" name="description"

                        placeholder="some description..."
                        value={formData.description ?? ''}
                        onChange={handleChange}
                        className=" outline-none border-none focus:border-none focus:ring-0 focus-visible:ring-0  "
                    />
                    <div className="flex justify-between">
                        {children}
                        <Button className={cn("bg-blue-500 text-white disabled:cursor-not-allowed hover:bg-blue-400", isPending && "hover:disabled:cursor-not-allowed")} type="submit" disabled={isPending} >{isPending ? "Adding subTask..." : "Add Sub task"}</Button>
                    </div>
                </form>

            </div>


        </>

    )
}

interface UpdateSubTaskFormProps {
    subTask?: SubTaskProps
    onclick?: () => void
}



export function UpdateSubTaskForm({ onclick, subTask }: UpdateSubTaskFormProps) {

    const [isPending, startTransition] = useTransition()
    const [formData, setFormData] = useState<Omit<TodoUpdateData, 'id'>>({
        title: '',
        description: '',
        status: false,
    })


    useEffect(() => {
        if (subTask) {
            setFormData({
                title: subTask.title,
                description: subTask.description,
                status: subTask.status,
            })
        }
    }, [subTask])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value,
        }))
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        startTransition(async () => {
            try {
                if (subTask?.id) {
                    await updateTodo(String(subTask.id), formData)
                    toast.success('Todo updated successfully')
                }

            } catch (error) {
                toast.error('Failed to save subTask')
            }
        })
    }
    return (
        <div className="border-[1px] w-full my-1 border-slate-200 rounded-md p-4 shadow-sm ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                <div className=" flex items-center gap-1   ">

                    <Input type="text" name="title" placeholder="Name of your project" className="outline-none border-none focus:border-none focus:ring-0 focus-visible:ring-0  " value={formData.title}
                        onChange={handleChange} required />
                </div>

                <Input type="text" name="description" placeholder="some description..." className="pl-2 outline-none border-none focus:border-none focus:ring-0 focus-visible:ring-0  "
                    onChange={handleChange} value={formData?.description ?? ""} />
                <div className="flex justify-between">
                    <Button variant="outline" onClick={onclick}>Cancel</Button>
                    <Button className="bg-blue-500 text-white disabled:cursor-not-allowed hover:bg-blue-400" type="submit" disabled={isPending} >{isPending ? "Updating todo..." : "Update todo"}</Button>
                </div>
            </form>

        </div>
    )
}

