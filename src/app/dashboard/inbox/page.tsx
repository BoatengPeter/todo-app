import { type Metadata } from 'next';

export const metadata: Metadata = {
    title: "Inbox",
};

import PageHeader from "../_components/PageHeader"
import { TodoList } from "../../../components/common/TodoList"
import { getAllTodos } from "~/server/db/queries"
import Sort from "../../../components/common/Sort"
import { Suspense } from 'react';
import { PageSkeleton } from '~/components/common/skeletons';
import TodoFormWithBtn from '../../../components/common/TodoForm';
export default async function page() {
    const todos = await getAllTodos()

    return (
        <main className=" flex-1 h-screen  overflow-y-scroll ">
            <Suspense fallback={<PageSkeleton />}>
                <PageHeader />
                <div className="w-[80%] mx-auto my-3 flex items-center justify-between">
                    <h1 className="text-3xl text-slate-900 font-bold">Inbox</h1>
                    <Sort data={todos} />
                </div>
                <section className="w-[80%] h-full flex flex-col mx-auto  ">
                    <TodoList todos={todos} />
                    <TodoFormWithBtn />
                </section>
            </Suspense>
        </main>

    )
}

