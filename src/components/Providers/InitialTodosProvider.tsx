'use client'
import React, { createContext, useContext, useState } from 'react';
import { type TodoCardProps } from "~/lib/types"

type TodoContextType = {
    todos: TodoCardProps[];
    setTodos: React.Dispatch<React.SetStateAction<TodoCardProps[]>>;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children, initialTodos }: { children: React.ReactNode; initialTodos: TodoCardProps[] }) {
    const [todos, setTodos] = useState<TodoCardProps[]>(initialTodos);

    return (
        <TodoContext.Provider value={{ todos, setTodos }}>
            {children}
        </TodoContext.Provider>
    );
}

export function useTodoContext() {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
}