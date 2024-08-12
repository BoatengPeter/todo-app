import PageHeader from "../_components/PageHeader"
import { TodoList } from "../../../components/common/TodoList"
import TodoForm from "../../../components/common/TodoForm"
import { getAllTodos } from "~/server/db/queries"
import Sort from "../../../components/common/Sort"
import Link from "next/link"
export default async function page() {
    const todos = await getAllTodos()
    return (
        <main className=" flex-1 h-screen  overflow-y-scroll ">
            <PageHeader />
            <div className="w-[80%] mx-auto my-3 flex items-center justify-between">
                <h1 className="text-3xl text-slate-900 font-bold">Inbox</h1>

                <Sort data={todos} />
            </div>
            <section className="w-[80%] h-full flex flex-col mx-auto  ">
                <TodoList initialTodos={todos} />
                <TodoForm />

            </section>

        </main>

    )
}

