"use client"
import { Input } from "../ui/input"
import React from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import { useDebouncedCallback } from "use-debounce"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
const Search = ({ placeholder }: { placeholder: string }) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((value: string) => {
        console.log(`searching for ${value}`);
        const params = new URLSearchParams(searchParams)
        if (value) {
            params.set("query", value)
            // params.set("query", "1")

        } else {
            params.delete("query")
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)
    return (
        <div className=''>
            <div className='flex py-2 items-center gap-2'>
                <SearchIcon size={20} />
                <label htmlFor="search" className='sr-only'>Search</label>
                <Input type="text" className='mr-auto focus-visible:ring-0 border-none focus-visible:ring-offset-0 ' placeholder={placeholder} onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get('query')?.toString()} />
                {/* <X size={20} /> */}
            </div>
        </div>
    )
}

export default Search
