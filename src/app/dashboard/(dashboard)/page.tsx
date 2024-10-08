import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: "Home",
};

import PageHeader from "../_components/PageHeader"
import TodoFormWithBtn from "../../../components/common/TodoForm"
const page = () => {
  return (
    <>
      <main className="flex-1 h-screen  overflow-y-scroll ">

        <PageHeader />
        <div className="w-[80%] mx-auto my-3">

          <h1 className="text-3xl text-slate-900 font-bold">Dashboard</h1>
        </div>
        <section className="w-[80%] h-full flex flex-col mx-auto  ">
          <TodoFormWithBtn />
        </section>

      </main>
    </>

  )
}

export default page
