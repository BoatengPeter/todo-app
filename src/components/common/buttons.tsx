"use client"
import React from "react"
import { PenLine, Trash2 } from "lucide-react"
import { toast } from "sonner";
import { useTransition, useState } from "react"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "../ui/dialog"
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


export function UpdateTodo({ onclick }: UpdateTodoProps) {
    return (
        <>
            <button onClick={onclick} className="z-20 ">
                <PenLine size={20} className="hover:bg-slate-200 " />
            </button>
        </>
    )
}


export function DeleteTodo({ onDeleteTodo }: { onDeleteTodo: () => Promise<void>, onCancel?: () => void }) {
    const [isPending, startTransition] = useTransition()
    const [isDeleting, setIsDeleting] = useState(false)
    const [cancel, setCancel] = useState(false)
    const handleDelete = () => {
        setIsDeleting(true);
        toast.promise(
            new Promise((resolve, reject) => {
                startTransition(async () => {
                    try {
                        await onDeleteTodo();
                        resolve('Todo deleted successfully');
                    } catch (error) {
                        reject(error);
                    } finally {
                        setIsDeleting(false);
                    }
                });
            }),
            {
                success: 'Todo deleted successfully',
                error: 'Failed to delete todo',
            }
        );
    };
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <button
                        className=" rounded-md">
                        <span className="sr-only">Delete</span>
                        <Trash2 size={20} color="red" className={`hover:bg-slate-200 ${isDeleting || isPending ? 'opacity-50' : ''}`} />
                    </button>
                </DialogTrigger>
                <DialogContent className="w-full">
                    <h3 className="text-base font-medium text-slate-900 dark:text-white">Are you sure you want to delete this todo?</h3>
                    <div className="flex items-center justify-between">

                        <Button variant="outline" onClick={() => setCancel(!cancel)}>Cancel</Button>
                        <Button onClick={handleDelete} className=" bg-red-500 text-white hover:bg-red-300 ">Delete</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

