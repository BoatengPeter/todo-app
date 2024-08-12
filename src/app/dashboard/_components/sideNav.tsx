"use client"
import Links from "./links"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { Bell, SearchIcon } from "lucide-react"
import SearchCard from '../../../components/common/SearchCard'
import { useUser } from "@clerk/nextjs"
const SideNav = () => {
    const { isSignedIn, user } = useUser();
    return (
        <div className="hidden md:flex h-screen bg-slate-50  static ">
            <div className="w-[95%] mx-auto  ">
                <div className="flex p-2 justify-between items-center ">
                    <div className="flex items-center gap-2">

                        <SignedIn>
                            <UserButton />
                        </SignedIn>

                        <h2 className="text-slate-700 text-base font-semibold">{isSignedIn && user?.username}</h2>
                    </div>
                    <div>
                        <Bell />
                    </div>
                </div>
                <SearchCard  >
                    <div className="flex p-2 hover:bg-[#d3d3d3]  hover:text-slate-700 cursor-pointer items-center ">
                        <SearchIcon className="mr-2" />
                        <h2>Search</h2>
                    </div>
                </SearchCard>

                <Links />
            </div>
        </div>
    )
}

export default SideNav
