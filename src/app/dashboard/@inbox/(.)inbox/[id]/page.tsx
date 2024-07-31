import { Modal } from "../../../../../components/common/Modal"
import { TodoCard } from "~/components/common/TodoCard"
import { SubTaskCard } from "~/components/common/SubTaskCard"
import { fetchTodoById } from "~/server/db/queries"
import { type TodoCardProps } from "~/lib/types"
export default async function CardModal({ params: { id: todoId } }: { params: { id: number } }) {
    const data = await fetchTodoById(todoId)
    return (
        <>
            <Modal>
                <div className="flex flex-col gap-4">
                    <h1 className="text-xl font-bold">Todo</h1>

                    {/* <TodoCard data={data} /> */}
                    {/* <SubTaskCard subTasks={todoId} /> */}
                </div>
            </Modal>
        </>

    )
}


