import { Modal } from "../../../../../components/common/Modal"
import { ModalTodoCard } from "~/components/common/TodoCard"
import { SubTaskCard } from "~/components/common/SubTaskCard"
import { fetchTodoById } from "~/server/db/queries"
import { notFound } from "next/navigation"

export default async function CardModal({ params: { id: todoId } }: { params: { id: number } }) {
    const data = await fetchTodoById(todoId)
    if (!data) notFound()

    return (
        <>
            <Modal>
                <div className="w-full px-4 flex flex-col gap-4 ">
                    <div className=" sticky top-0 bg-white z-20 shadow-sm">

                        <h1 className="text-xl font-bold mb-4">Todo</h1>
                        <div className="overflow-y-auto oveflow-x-hidden">
                        </div>

                        <ModalTodoCard todos={data} />
                        <SubTaskCard subTasks={data.subTasks} />
                    </div>
                </div>
            </Modal>
        </>

    )
}


