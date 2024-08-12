"use client"
import React from "react"
import { PenLine, Trash2 } from "lucide-react"
import { toast } from "sonner";
import { X } from "lucide-react";
import { useTransition, useState, useRef } from "react"
import { Button } from "../ui/button"
import { createPortal } from "react-dom";
interface UpdateTodoProps {
    onclick?: () => void
    todo?: Todo

}
interface Todo {
    id?: string
    title: string
    description: string
    status: boolean
}



export function UpdateTodo({ onclick, todo }: UpdateTodoProps) {
    // const targetTodo = updateTodo(id)

    return (


        <>
            {/* <form > */}

            <button onClick={onclick} className="z-20 ">
                <PenLine size={20} className="hover:bg-slate-200 " />
            </button>
            {/* </form> */}
        </>
    )
}


export function DeleteTodo({ id, onDeleteTodo, onCancel }: { id: string, onDeleteTodo: (id: string) => Promise<void>, onCancel?: () => void }) {
    const [isPending, startTransition] = useTransition()
    const [isDeleting, setIsDeleting] = useState(false)
    const [cancel, setCancel] = useState(false)
    // const timerRef = useRef<NodeJS.Timeout | null>(null)
    // const isCancelledRef = useRef(false)

    // const handleDelete = async () => {
    //     setIsDeleting(true)
    //     setTimeout(() => {
    //         startTransition(async () => {
    //             if (isPending) {
    //                 toast.loading(<div className="flex items-center justify-between"><p>Deleting...</p><button onClick={() => { setIsDeleting(true) }}><X size={20} /></button></div>)
    //             }
    //             try {
    //                 const result = await deleteTodo(id)
    //                 if (result.success) {
    //                     toast.success(result.message)
    //                     //   router.refresh()
    //                 } else {
    //                     toast.error(result.message)
    //                 }
    //             } catch (error) {
    //                 toast.error('An error occurred while deleting')
    //             } finally {
    //                 setIsDeleting(false)
    //             }
    //         })
    //     }, 2000)
    // }
    //APPROACH 2   
    // const handleDelete = () => {
    //     toast.promise(
    //         new Promise((resolve, reject) => {
    //             setTimeout(() => {
    //                 startTransition(async () => {
    //                     try {
    //                         const result = await deleteTodo(id)
    //                         if (result.success) {
    //                             resolve(result)
    //                         } else {
    //                             reject(new Error(result.message))
    //                         }
    //                     } catch (error) {
    //                         reject(error)
    //                     }
    //                 })
    //             }, 2000)
    //         }),
    //         {
    //             loading: "Deleting...",
    //             success: 'Todo deleted successfully',
    //             error: (err) => `Failed to delete todo `,
    //         }
    //     )

    // }



    // const targetTodo = deleteTodo.bind(null, id)
    // toast.success("Todo deleted")
    const handleDelete = () => {
        setIsDeleting(true);
        toast.promise(
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    startTransition(async () => {
                        try {
                            await onDeleteTodo(id);
                            resolve('Todo deleted successfully');
                        } catch (error) {
                            reject(error);
                        } finally {
                            setIsDeleting(false);
                        }
                    });
                }, 2000); // Keeping the 2-second delay as in your original code
            }),
            {
                loading: "Deleting...",
                success: 'Todo deleted successfully',
                error: 'Failed to delete todo',
            }
        );
    };
    return (
        <>
            {/* 
            <div className="fixed top-0 left-0 h-screen w-full z-40 bg-black/50 backdrop-blur-sm">
                <div className=" top-1/2 left-1/2 translate-x-[-50%] rounded-md translate-y-[-50%] z-50 w-[300px] flex flex-col gap-5 p-3 bg-white shadow-lg ">
                    <h3 className="text-base font-medium text-slate-900 dark:text-white">Are you sure you want to delete this todo?</h3>
                    <div className="flex items-center justify-between">
                        <Button variant="outline" onClick={() => setCancel(true)}>Cancel</Button>
                        <Button onClick={handleDelete} className=" bg-red-500 text-white">Delete</Button>
                    </div>
                </div>
            </div> */}
            {/* <button onClick={() => setCancel(!cancel)} */}
            <button onClick={handleDelete}

                className=" rounded-md">
                <span className="sr-only">Delete</span>
                <Trash2 size={20} color="red" className={`hover:bg-slate-200 ${isDeleting || isPending ? 'opacity-50' : ''}`} />
            </button>




        </>
    )
}

export function confirmDelete({ children }: { children: React.ReactNode }) {

    return createPortal(
        <div className="fixed top-0 left-0 h-screen w-full z-40 bg-black/50 backdrop-blur-sm">
            <div className=" top-1/2 left-1/2 translate-x-[-50%] rounded-md translate-y-[-50%] z-50 w-[300px] flex flex-col gap-5 p-3 bg-white shadow-lg ">
                <h3 className="text-base font-medium text-slate-900 dark:text-white">Are you sure you want to delete this todo?</h3>
                <div className="flex items-center justify-between">
                    <Button variant="outline" onClick={() => setCancel(true)}>Cancel</Button>
                    <Button onClick={handleDelete} className=" bg-red-500 text-white">Delete</Button>
                </div>
            </div>
        </div>, document.body
    )
}