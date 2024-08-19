"use client"
import React from 'react'
import { Settings, Palette } from 'lucide-react'
import Link from 'next/link'
import { SearchSkeleton } from "./skeletons"

import { CalendarDays, CalendarSearch, HomeIcon, InboxIcon } from "lucide-react";
import Search from "../common/Search";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "../ui/dialog"

///////
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "../ui/command"
import { useState } from "react"
import { searchTodos } from "~/server/db/queries"


const SearchCard = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    const data = searchTodos(query)
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-full">


                <main>
                    <Search data={data} />
                    <div className="py-2">

                        {!isLoading && searchResults.length > 0 && (
                            <>
                                {query.map((todo) => (
                                    <TodoCard key={todo.id} todos={todo} />
                                ))}
                            </>
                        )}
                    </div>
                    <div className='px-2 text-slate-700'>
                        <section className='flex flex-col gap-4'>
                            <small>Navigation</small>
                            <Link href="/dashboard" className='flex gap-2 items-center'>
                                <HomeIcon size={20} />
                                <h3>Go to Home</h3>
                            </Link>
                            <Link href="/dashboard/today" className='flex gap-2 items-center'>
                                <CalendarDays size={20} />
                                <h3>Go to Today</h3>
                            </Link>
                            <Link href="/dashboard/inbox" className='flex gap-2 items-center'>
                                <InboxIcon size={20} />
                                <h3>Go to Inbox</h3>
                            </Link>

                        </section>
                        <section className='flex flex-col mt-3 gap-4'>
                            <div className='flex gap-2 items-center'>
                                <Settings size={20} />
                                <h3>Settings</h3>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <Palette size={20} />
                                <h3>Theme</h3>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <Settings size={20} />
                                <h3>Settings</h3>
                            </div>

                        </section>
                    </div>
                </main>
            </DialogContent>
        </Dialog>

    )
}

export default SearchCard




