import Links from "./links"
import { Bell, UserRound } from "lucide-react"
const SideNav = () => {
    return (
        <div className="hidden md:flex h-screen  w-[280px] max-w-[300px] border-4 border-border-blue-400  static ">
            <div className="w-[95%] mx-auto  ">
                <div className="flex justify-between items-center ">

                    <div className="flex items-center"><UserRound /><span className="ml-2">Username</span></div>
                    <Bell />
                </div>
                <Links />
            </div>
        </div>
    )
}

export default SideNav
