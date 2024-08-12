"use client"
import React, { useState } from "react"

import { ArrowUpDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface Item {
    id: number
    name: string
    date: string
}


const SortItems = ({ data }) => {
    const [dataSort, setDataSort] = useState<Item[]>([data])

    function sortByProperty<T>(
        items: T[],
        property: keyof T,
        options: Intl.CollatorOptions = { sensitivity: 'base' }
    ): T[] {
        return items.sort((a: T, b: T) => {
            if (typeof a[property] === 'string' && typeof b[property] === 'string') {
                return (a[property] as string).localeCompare(b[property] as string, undefined, options);
            }
            else if (typeof a[property] === 'number' && typeof b[property] === 'number') {
                return a[property] - b[property];
            }
            return 0;
        });
    }

    function sortItemsByName(items: Item[]): Item[] {
        return items.sort((a: Item, b: Item) =>
            a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
        );
    }


    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button >
                        <ArrowUpDown size={23} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent >
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                        <DropdownMenuItem><button onClick={() => sortByProperty(dataSort, 'name')}  >Name</button></DropdownMenuItem>
                        <DropdownMenuItem><button   >Date</button></DropdownMenuItem>
                    </DropdownMenuGroup>

                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default SortItems
