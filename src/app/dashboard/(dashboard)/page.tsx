import PageHeader from "../_components/PageHeader"
import { TodoCard } from "../../../components/common/TodoCard"
import TodoForm from "../../../components/common/TodoForm"
import { TestTodoCard } from "~/components/common/TestTodoCard"
const page = () => {
  return (
    <>
      <main className="flex-1 h-screen  overflow-y-scroll ">

        <PageHeader />
        <div className="w-[80%] mx-auto my-3">

          <h1 className="text-3xl text-slate-900 font-bold">Dashboard</h1>
        </div>
        <section className="w-[80%] h-full flex flex-col mx-auto  ">
          <TodoForm />
          <TestTodoCard />

          {/* <TodoCard  /> */}

        </section>

      </main>
    </>

  )
}

export default page
