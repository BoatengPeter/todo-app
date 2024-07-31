import React from 'react'
import { TodoCard } from '~/components/common/TodoCard'
import { fetchTodoById } from '~/server/db/queries'
const page = async ({ params: { id: todoId } }: { params: { id: number } }) => {
    // const idasNum = Number(params.id)
    // const todo = await fetchTodoById(todoId)
    return (
        <div>
            {todoId}
            hsjfhasljdh
            {/* <TodoCard data={todo} /> */}
        </div>
    )
}
export default page