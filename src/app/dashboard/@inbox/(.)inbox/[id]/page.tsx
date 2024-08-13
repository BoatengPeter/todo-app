import { Modal } from "../../../../../components/common/Modal"
import { TodoCard } from "~/components/common/TodoCard"
import { SubTaskCard } from "~/components/common/SubTaskCard"
import { fetchTodoById } from "~/server/db/queries"
import { notFound } from "next/navigation"
import AddSubTask from "~/components/common/AddSubTask"
export default async function CardModal({ params: { id: todoId } }: { params: { id: number } }) {
    const data = await fetchTodoById(todoId)
    if (!data) {
        notFound()
    }
    return (
        <>
            <Modal>
                <div className="w-full px-4 flex flex-col gap-4">
                    <h1 className="text-xl font-bold">Todo</h1>

                    <TodoCard todos={data} />
                    <AddSubTask />
                    <SubTaskCard subTasks={data.subTasks} />
                </div>
            </Modal>
        </>

    )
}


