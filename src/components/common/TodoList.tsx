"use client"
import { useOptimistic } from 'react'
import { TodoCard } from './TodoCard'
import { type TodoCardProps } from '~/lib/types'
import { updateStatus } from "~/server/db/actions"
import { deleteTodo, updateTodo } from "../../server/db/actions"


type OptimisticAction =
    | { type: 'update_status'; id: string; status: boolean }
    | { type: 'delete'; id: string };

export function TodoList({ initialTodos }: { initialTodos: TodoCardProps[] }) {
    const [optimisticTodos, addOptimisticTodo] = useOptimistic<TodoCardProps[], OptimisticAction>(initialTodos,
        (state, action): TodoCardProps[] => {
            switch (action.type) {
                case 'update_status':
                    return state.map(todo =>
                        String(todo.id) === action.id ? { ...todo, status: action.status } : todo
                    );
                case 'delete':
                    return state.filter(todo => String(todo.id) !== action.id);
                default:
                    return state;
            }
        }
    );

    const handleUpdateStatus = async (id: string, currentStatus: boolean) => {
        // Optimistically update the UI
        addOptimisticTodo({ type: 'update_status', id, status: !currentStatus });
        // Perform the actual update
        await updateStatus(id, currentStatus)
    }

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
                    onUpdateStatus={handleUpdateStatus}
                    onDeleteTodo={handleDeleteTodo}
                />)
            )}

        </>
    )
}