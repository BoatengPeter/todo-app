import { type Metadata } from 'next';

export const metadata: Metadata = {
    title: "Today's ",
};

import React from "react"
import PageHeader from "../_components/PageHeader"
import { TodoList } from "../../../components/common/TodoList"
import TodoFormWithBtn from "../../../components/common/TodoForm"
import { fetchTodaysTodos } from "../../../server/db/queries"
import { PageSkeleton } from '~/components/common/skeletons';
import { Suspense } from "react"
export default async function page() {
    const todos = await fetchTodaysTodos()

    const todaysdate = new Date();
    const date = todaysdate.getDate();
    const month = todaysdate.getMonth() + 1;
    const day = todaysdate.getDay().toLocaleString();

    return (
        <main className="w-full h-screen  overflow-y-scroll ">
            <Suspense fallback={<PageSkeleton />}>
                <PageHeader />
                <div className="w-[80%] mx-auto my-3">
                    <h1 className="text-3xl text-slate-900 font-bold">Today</h1>
                    <div className="border-b-[1px] border-slate-200 mt-2 ">

                        <h3 className="pt-2 text-slate-700 font-medium">{`${month} ${date} . Today . ${day}`}</h3>
                    </div>
                </div>
                <section className="w-[80%] h-full flex flex-col mx-auto  ">
                    <TodoFormWithBtn />
                    <TodoList todos={todos} />

                </section>
            </Suspense>

        </main>

    )
}

