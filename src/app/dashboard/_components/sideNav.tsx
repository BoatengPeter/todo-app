"use client"
import Links from "./links"
import { useState } from "react"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { Bell, SearchIcon, CircleArrowLeft, CircleArrowRight, PlusIcon } from "lucide-react"
// import SearchCard from '../../../components/common/SearchCard'
import AddTodoBtn from '../../../components/common/AddTodoBtn'
import { useUser } from "@clerk/nextjs"
import { cn } from "../../../lib/utils"
import { TodoForm } from '../../../components/common/TodoForm'
import { Button } from "../../../components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../components/ui/popover"
const SideNav = () => {
    const { isSignedIn, user } = useUser();
    const [hideNav, setHideNav] = useState(true)
    return (
        <>
            {hideNav ? (<div className={cn("hidden md:block  md:overflow-y-hidden w-[420px]  h-screen bg-slate-50  transform transition-transform duration-300 ease-in-out ", hideNav ? 'translate-x-0' : '-translate-x-full')}>
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
                            <button onClick={() => setHideNav(!hideNav)}>

                                <CircleArrowLeft />
                            </button>
                        </div>
                    </div>
                    {/* <SearchCard  > */}
                    <div className="  flex p-2 hover:bg-blue-300 hover:text-white cursor-pointer items-center rounded-md ">
                        <SearchIcon className="mr-2" />
                        <h2>Search</h2>
                    </div>
                    {/* POPOVER */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <div>

                                <AddTodoBtn icon={<PlusIcon />} text="Add Task" className="bg-transparent  text-base hover:bg-blue-300 hover:text-white w-full font-normal" >
                                </AddTodoBtn>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-[450px] min-w-[375px] " sideOffset={10} >
                            <TodoForm className="m-0"  >

                                <Button variant="outline" >Cancel</Button>

                            </TodoForm>
                        </PopoverContent>
                    </Popover>

                    {/* </SearchCard> */}

                    <Links />
                </div>

            </div>) : (<div className={cn(" hidden md:block h-screen w-[70px]  bg-slate-50  transform transition-transform duration-300 ease-in-out ", !hideNav ? 'block translate-x-0' : '-translate-x-full')}>
                <button className="p-2 mx-auto" onClick={() => setHideNav(!hideNav)}>
                    <CircleArrowRight size={30} />
                </button>

            </div>)}


        </>

    )
}

export default SideNav
