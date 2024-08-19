import SideNav from "./_components/sideNav";
export default function Dashboardlayout({ children, inbox, today }: { children: React.ReactNode; inbox: React.ReactNode, today: React.ReactNode }) {
    return (<>
        <div className="  md:overflow-hidden md:flex  ">


            <SideNav />
            <section className="w-full mx-auto md:flex-grow-1  " >

                {children}
                {inbox}
                {today}
            </section>

        </div>
    </>

    )
}
