import { type Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Today ',
};

import React from "react"
import PageHeader from "../_components/PageHeader"
import { TodoCard } from "../../../components/common/TodoCard"
import TodoForm from "../../../components/common/TodoForm"
import { fetchTodaysTodos } from "../../../server/db/queries"
// import UpdateTodo from "../../../components/common/UpdateTodo"
import { DeleteTodo } from "../../../components/common/buttons"
import { UpdateTodo } from '~/server/db/actions';

export default async function page() {
    const todos = await fetchTodaysTodos()

    const todaysdate = new Date();

    // const date =  new Date().toISOString().split('T')[0];

    const date = todaysdate.getDate();
    const month = todaysdate.getMonth() + 1;
    const day = todaysdate.getDay();
    return (
        <main className="flex-1 h-screen  overflow-y-scroll ">
            <PageHeader />
            <div className="w-[80%] mx-auto my-3">
                <h1 className="text-3xl text-slate-900 font-bold">Today</h1>
                <div className="border-b-[1px] border-slate-200 mt-2 ">

                    <h3 className="pt-2 text-slate-700 font-medium">{`${month} ${date} . Today . ${day}`}</h3>
                </div>
            </div>
            <section className="w-[80%] h-full flex flex-col mx-auto  ">
                <TodoForm />
                {todos?.map((todo) =>
                    <div key={todo.id}>

                        <TodoCard data={todo} >
                            {/* <UpdateTodo id={Number(todo.id)} /> */}
                            {/* <DeleteTodo id={String(todo.id)} /> */}
                        </TodoCard>
                    </div>
                )}

            </section>

        </main>

    )
}

