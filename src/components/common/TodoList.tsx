"use client"
import { useOptimistic } from 'react'
import { TodoCard } from './TodoCard'
import { type TodoCardProps } from '~/lib/types'
import { deleteTodo } from "../../server/db/actions"

type OptimisticAction =
    | { type: 'delete'; id: string };

export function TodoList({ todos }: { todos: TodoCardProps[] }) {

    const [optimisticTodos, addOptimisticTodo] = useOptimistic<TodoCardProps[], OptimisticAction>(todos,

        (state, action): TodoCardProps[] => {
            switch (action.type) {
                case 'delete':
                    return state.filter(todo => String(todo.id) !== action.id);
                default:
                    return state;
            }
        }
    );



    const handleDeleteTodo = async (id: string) => {
        // Optimistically update the UI
        addOptimisticTodo({ id, type: 'delete' })
        // Perform the actual delete
        await deleteTodo(id)
    }

    return (
        <>
            {optimisticTodos?.map(todo => (
                <TodoCard
                    key={todo.id}
                    todos={todo}
                    onDeleteTodo={handleDeleteTodo}
                />
            )
            )}

        </>
    )
}