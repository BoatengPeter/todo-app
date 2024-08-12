import PageHeader from "../_components/PageHeader"
export default async function page() {

    return (
        <main className=" flex-1 h-screen  overflow-y-scroll ">
            <PageHeader />
            <div className="w-[80%] mx-auto my-3 flex items-center justify-between">
                <h1 className="text-3xl text-slate-900 font-bold">Upcoming</h1>

            </div>

        </main>

    )
}

