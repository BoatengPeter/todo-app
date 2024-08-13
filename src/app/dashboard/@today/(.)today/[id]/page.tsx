import { Modal } from "../../../../../components/common/Modal"
import { TodoCard } from "~/components/common/TodoCard"
import { SubTaskCard } from "~/components/common/SubTaskCard"
import { notFound } from "next/navigation"
import { fetchTodoById } from "~/server/db/queries"
export default async function CardModal({ params: { id: todoId } }: { params: { id: number } }) {
    const data = await fetchTodoById(todoId)
    if (!data) notFound()
    return (
        <>
            <Modal>
                <div className="flex flex-col gap-4">
                    <h1 className="text-xl font-bold">Todo</h1>
                    <TodoCard todos={data} />
                    <SubTaskCard subTasks={data.subTasks} />
                </div>
            </Modal>
        </>

    )
}


