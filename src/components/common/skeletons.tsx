import { Skeleton } from "../../components/ui/skeleton"

export function CardSkeleton() {

    return (<>
        <div className=" flex justify-between items-center w-full  border-b-[1px] mb-2   ">
            <div className="w-full flex flex-col gap-1 ">

                <div className="w-full flex py-2 gap-2 items-center">
                    <Skeleton className="w-6 h-6 bg-slate-300 rounded-full" />
                    <Skeleton className=" w-32 h-6 mr-auto bg-slate-300 "></Skeleton>
                </div>
                <div className="w-full flex flex-col gap-2 mb-1 ">

                    <Skeleton className="w-52 h-6 bg-slate-300"></Skeleton>
                    <Skeleton className="w-16 h-4 bg-slate-300"></Skeleton>
                    <Skeleton className="w-12 h-2 bg-slate-300" />
                </div>
            </div>

        </div>

    </>
    );
}

export function SearchSkeleton() {
    return (
        <div className="w-full ">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    )
}
export function TodoListSkeleton() {
    return (
        <div className="mb-2 ">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    )
}
export function PageHeaderSkeleton() {
    return (
        <div className="w-full h-20 flex items-center   sticky top-0 bg-white z-20 shadow-sm ">
            <div className="px-5">

                <Skeleton className="w-14 h-8" />
            </div>
        </div>
    )

}
export function PageNameAndSort() {
    return (
        <div className="w-[80%] mx-auto my-10 flex items-center justify-between">
            <Skeleton className="w-20 h-7  bg-slate-300"></Skeleton>
            <Skeleton className="w-6 h-6 bg-slate-300 "></Skeleton>

        </div>
    )
}

export function PageSkeleton() {
    return (
        <>
            <PageHeaderSkeleton />
            <PageNameAndSort />
            <section className="w-[80%] h-full flex flex-col mx-auto  ">
                <TodoListSkeleton />
            </section>
        </>
    )
}

export function UserSkeleton() {
    return (
        <div className="flex gap-2">
            <Skeleton className="w-12 h-12 bg-slate-300 rounded-full" />
            <Skeleton className="w-32 h-12 bg-slate-300 rounded-md" />
        </div>
    )
}