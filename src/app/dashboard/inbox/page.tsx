import PageHeader from "../_components/PageHeader"
import { TodoCard } from "../../../components/common/TodoCard"
import TodoForm from "../../../components/common/TodoForm"
import { getAllTodos } from "~/server/db/queries"
export default async function page() {
    const todos = await getAllTodos()
    return (
        <main className="flex-1 h-screen  overflow-y-scroll ">
            <PageHeader />
            <div className="w-[80%] mx-auto my-3">
                <h1 className="text-3xl text-slate-900 font-bold">Inbox</h1>
            </div>
            <section className="w-[80%] h-full flex flex-col mx-auto  ">
                <TodoForm />
                {todos?.map((todo) =>
                    <div key={todo.id}>
                        {/* <Link href={`/dashboard/inbox/${todo.id}`}> */}
                        <TodoCard data={todo} />
                        {/* </Link> */}
                    </div>
                )}

            </section>

        </main>

    )
}

