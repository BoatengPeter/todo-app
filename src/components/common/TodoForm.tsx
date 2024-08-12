"use client"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import AddTodoBtn from "../../components/common/AddTodoBtn"
import { CirclePlus } from "lucide-react"
import { useState, useTransition, useEffect, useOptimistic } from "react"
import React from 'react'
import { toast } from "sonner"
import { createTodo, type CreateTodoData, updateTodo } from "~/server/db/actions"
import { type TodoCardProps } from "~/lib/types"
import { type TodoUpdateData } from "~/server/db/actions"

const TodoForm = () => {
    const [isPending, startTransition] = useTransition()
    const [showForm, setShowForm] = useState<boolean>(true)
    // const [optimistic, addOptimisticTodo] = useOptimistic<CreateTodoData>(data,(state,newTodo:CreateTodoData)=>{
    //     return [...state,newTodo]
    // })

    const [formData, setFormData] = useState<CreateTodoData>({
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
            try {
                const result = await createTodo(formData)
                if (result.success) {
                    toast.success('Todo created successfully')
                    setFormData({ title: '', status: false, description: '' })
                } else {
                    toast.error(result.error ?? 'Failed to create todo')
                }
            } catch (error) {
                toast.error('An unexpected error occurred')
            }
        })
    }


    return (
        <>
            {showForm ? <AddTodoBtn text="Add Todo" icon={<CirclePlus fill="#3b82f6" size={27} stroke="#fff" />} className="bg-transparent w-full text-slate-700 hover:bg-white border-b-[1px] border-slate-200 " onClick={() => setShowForm(!showForm)} />
                : <div className="border-[1px] my-1 border-slate-200 rounded-md p-4 shadow-sm  ">
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-1">
                        <div className=" flex items-center gap-1   ">

                            <input className="peer h-4 w-4 shrink-0 rounded-full border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground " type="checkbox" name="status" checked={formData.status}
                                onChange={handleChange}
                            />
                            {/* {state.errors?.status && <p className="error">{state.errors.status}</p>} */}
                            <Input type="text" name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Name of your project" className="outline-none border-none focus:border-none focus:ring-0 focus-visible:ring-0  " required />
                        </div>
                        {/* { && <p className="error">{}</p>} */}


                        <Input type="text" name="description"

                            placeholder="some description..."
                            value={formData.description ?? ''}
                            onChange={handleChange}
                            className="ml-6 outline-none border-none focus:border-none focus:ring-0 focus-visible:ring-0  "
                        />
                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setShowForm(!showForm)}>Cancel</Button>
                            <Button className="bg-blue-500 text-white disabled:cursor-not-allowed hover:bg-blue-400" type="submit" disabled={isPending} >{isPending ? "Adding todo..." : "Add todo"}</Button>
                        </div>
                        {/* {state.message && toast(<p className={state.errors ? 'error' : 'success'}>{state.message}</p>)} */}
                    </form>

                </div>
            }

        </>

    )
}

export default TodoForm


interface Todo {
    id?: string
    title: string
    description: string
    status: boolean
}
interface TodoFormOnlyProps {
    todo?: TodoCardProps
    onclick?: () => void
}

export function TodoFormOnly({ onclick, todo }: TodoFormOnlyProps) {

    const [isPending, startTransition] = useTransition()
    // const [state, formAction] = useFormState<State, FormData>(createTodo, initialValues)
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
    // const [state, formAction] = useActionState(createTodo, initialValues)
    return (
        <div className="border-[1px] w-full my-1 border-slate-200 rounded-md p-4 shadow-sm ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                <div className=" flex items-center gap-1   ">
                    <Checkbox name="status" checked={formData.status}
                    // onChange={handleChange}
                    />
                    <Input type="text" name="title" placeholder="Name of your project" className="outline-none border-none focus:border-none focus:ring-0 focus-visible:ring-0  " value={formData.title}
                        onChange={handleChange} required />
                </div>
                {/* <div aria-live="polite">
                    <p className="mt-2 text-sm text-red-500">{state?.errors?.title}</p>

                </div> */}
                <Input type="text" name="description" placeholder="some description..." className="pl-2 outline-none border-none focus:border-none focus:ring-0 focus-visible:ring-0  " value={formData?.description}
                    onChange={handleChange} />
                <div className="flex justify-between">
                    <Button variant="outline" onClick={onclick}>Cancel</Button>
                    <Button className="bg-blue-500 text-white disabled:cursor-not-allowed hover:bg-blue-400" type="submit" disabled={isPending} >{isPending ? "Updating todo..." : "Update todo"}</Button>
                </div>
            </form>

        </div>
    )
}






