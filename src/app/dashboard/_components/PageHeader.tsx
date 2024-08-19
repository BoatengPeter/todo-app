"use client"
import Links from "./links"
import { useState } from "react"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { Menu, Bell, SearchIcon, PlusIcon, X } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../components/ui/popover"
import { useUser } from "@clerk/nextjs"
import Comments from "../../../components/common/Comments"
import { Button } from "../../..//components/ui/button"
import { TodoForm } from "../../../components/common/TodoForm"
import AddTodoBtn from "../../../components/common/AddTodoBtn"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetOverlay,
    SheetTrigger,
} from "../../../components/ui/sheet"

const PageHeader = () => {

    return (
        <div className="w-full h-20 flex items-center   sticky top-0 bg-white z-20 shadow-sm ">
            <div className="w-full flex items-center justify-between">

                <div >
                    <Comments />
                </div>

                <div className="flex md:hidden">
                    <Sheet  >
                        <SheetOverlay className="bg-transparent" />
                        <SheetTrigger asChild >

                            <button ><Menu /></button>
                        </SheetTrigger>
                        <SheetContent className="p-0 w-[320px] min-w-[200px]" >
                            <SmallNav >
                                <SheetClose>
                                    <button aria-describedby="close"><X /> </button>
                                </SheetClose>
                            </SmallNav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

        </div>
    )
}

export default PageHeader


function SmallNav({ children }: { children: React.ReactNode }) {
    const { isSignedIn, user } = useUser();
    const [showForm, setShowForm] = useState(false)
    return (
        <div className="w-[95%] mx-auto  ">
            <div className="flex p-2 justify-between items-center ">
                <div className="flex items-center gap-2">

                    <SignedIn>
                        <UserButton />
                    </SignedIn>

                    <h2 className="text-slate-700 text-base font-semibold">{isSignedIn && user?.username}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Bell />
                    {children}
                </div>
            </div>
            {/* <SearchCard  > */}
            <div className="  flex p-2 hover:bg-[#d3d3d3]  hover:text-slate-700 cursor-pointer items-center ">
                <SearchIcon className="mr-2" />
                <h2>Search</h2>
            </div>
            {/* POPOVER */}
            <Popover>
                <PopoverTrigger asChild>
                    <button>
                        <AddTodoBtn icon={<PlusIcon />} text="Add Todo" className="bg-transparent  text-base" >
                        </AddTodoBtn>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[450px] data-[side=right] " sideOffset={10} >
                    <TodoForm className="m-0"  >
                        <Button variant="outline" onClick={() => setShowForm(!showForm)}>Cancel</Button>

                    </TodoForm>
                </PopoverContent>
            </Popover>

            {/* </SearchCard> */}

            <Links />
        </div>
    )
}