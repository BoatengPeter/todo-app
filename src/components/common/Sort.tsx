"use client"
import React, { useState } from "react"
import { ArrowUpDown } from "lucide-react"
import { type TodoCardProps } from "../../lib/types"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"




const SortItems = ({ data }: { data: TodoCardProps[] }) => {
    // const { todos, setTodos } = useTodoContext()
    const [todos, setTodos] = useState(data);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const sortByTitle = () => {
        const sorted = [...todos].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });
        setTodos(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        console.log('Sorted by title', sortOrder);
    };

    const sortByDate = () => {
        const sorted = [...todos].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.createdAt.getTime() - b.createdAt.getTime();
            } else {
                return b.createdAt.getTime() - a.createdAt.getTime();
            }
        });
        setTodos(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };


    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button >
                        <ArrowUpDown size={23} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent >
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                        <DropdownMenuItem><button onClick={sortByTitle}>title</button></DropdownMenuItem>
                        <DropdownMenuItem><button onClick={sortByDate}>Date</button></DropdownMenuItem>
                    </DropdownMenuGroup>

                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default SortItems
