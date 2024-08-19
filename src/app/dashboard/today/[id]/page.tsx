import React from 'react'
import { ModalTodoCard } from "~/components/common/TodoCard"
import { SubTaskCard } from "~/components/common/SubTaskCard"
import { fetchTodoById } from '~/server/db/queries'
import { notFound } from "next/navigation"

const page = async ({ params: { id: todoId } }: { params: { id: number } }) => {
  const data = await fetchTodoById(todoId)
  if (!data) notFound()
  return (
    <div className='w-full'>

      <div className='w-[800px] mx-auto'>
        <ModalTodoCard todos={data} />
        <SubTaskCard subTasks={data.subTasks} />

      </div>
    </div>
  )
}
export default page