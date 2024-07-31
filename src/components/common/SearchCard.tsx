"use client"
import React from 'react'
import { Settings, Palette } from 'lucide-react'
import Link from 'next/link'
import { CalendarDays, CalendarSearch, HomeIcon, InboxIcon } from "lucide-react";
import Search from "../common/Search";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "../ui/dialog"
const SearchCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-full">


                <main>
                    <Search placeholder='searching ....' />
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
