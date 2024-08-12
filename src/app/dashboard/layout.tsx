import SideNav from "./_components/sideNav";
export default function Dashboardlayout({ children, inbox }: { children: React.ReactNode; inbox: React.ReactNode }) {
    return (<>
        <div className="  md:overflow-hidden md:grid md:grid-cols-[320px,1fr]  ">

            <div className="hidden md:block md:overflow-y-hidden  h-screen">

                <SideNav />
            </div>
            <section className="w-full mx-auto   ">

                {children}
                {inbox}
            </section>

        </div>
    </>

    )
}
