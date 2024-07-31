import Links from "./links"
import { Bell, UserRound, SearchIcon } from "lucide-react"
import SearchCard from '../../../components/common/SearchCard'
const SideNav = () => {
    return (
        <div className="hidden md:flex h-screen bg-slate-50  static ">
            <div className="w-[95%] mx-auto  ">
                <div className="flex justify-between items-center ">

                    <div className="flex items-center"><UserRound /><span className="ml-2">Username</span></div>
                    <Bell />
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
