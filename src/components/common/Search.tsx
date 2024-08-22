"use client"
import { Input } from "../ui/input"
import React, { useState, useEffect } from 'react'
import { useTodoContext } from "../Providers/InitialTodosProvider"
import { Search as SearchIcon, X } from 'lucide-react'
// import { useDebouncedCallback } from "use-debounce"
import useDebounce from "../../lib/Hooks/useDebounce"
import { useSearchParams, usePathname } from "next/navigation"
import { type TodoCardProps } from "~/lib/types"
// import { searchTodos } from "~/server/db/queries"
import { TodoCard } from "./TodoCard"

const Search = ({ query }: { query: TodoCardProps[] }) => {
    const searchParams = useSearchParams()
    const [search, searchTodos] = useState(query)
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<TodoCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // const { todos, setTodos } = useTodoContext();

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsLoading(true);
            searchTodos(debouncedSearchTerm)
                .then((results) => {
                    setSearchResults(results);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error searching todos:', error);
                    setIsLoading(false);
                });
        } else {
            setSearchResults([]);
        }
    }, [debouncedSearchTerm]);


    return (
        <div className=''>
            <div className='flex py-2 items-center gap-2'>
                <SearchIcon size={20} />
                <label htmlFor="search" className='sr-only'>Search</label>
                <Input type="text" className='mr-auto focus-visible:ring-0 border-none focus-visible:ring-offset-0 ' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    defaultValue={searchParams.get('query')?.toString()} />
                {/* <X size={20} /> */}
            </div>

        </div>
    )
}

export default Search

