"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Search, CalendarDays, CalendarSearch, HomeIcon, InboxIcon } from "lucide-react";
import clsx from "clsx";


const links = [
    {
        name: "Home",
        href: "/dashboard",
        icon: HomeIcon
    },
    {
        name: "Search",
        href: "/dashboard/search",
        icon: Search
    },
    {
        name: "Inbox",
        href: "/dashboard/inbox",
        icon: InboxIcon
    },
    {
        name: "Today",
        href: "/dashboard/today",
        icon: CalendarDays
    },
    {
        name: "Upcoming",
        href: "/dashboard/upcoming",
        icon: CalendarSearch
    }

]
export default function Links() {
    const pathname = usePathname()

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon
                return (
                    <Link key={link.name} href={link.href} className={clsx("w-full  my-2 relative flex cursor-default select-none items-center rounded-sm px-2 py-2 text-base outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:cursor-pointer hover:bg-bg-blue-300", {

                        "hover:bg-blue-300 bg-blue-500 hover:text-slate-700 rounded-lg": pathname === link.href
                    })}>
                        <LinkIcon className="mr-2 " size={20} />
                        <p className=" "
                        >{link.name}</p>

                    </Link>

                );
            }
            )}

        </>
    )
}
