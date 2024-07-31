import SideNav from "./_components/sideNav";
export default function Dashboardlayout({ children, inbox }: { children: React.ReactNode; inbox: React.ReactNode }) {
    return (
        <div className=" flex md:overflow-hidden">

            <div className=" w-[23%] lg:max-w-[25%] h-screen">

                <SideNav />
            </div>
            <section className="grid grid-cols-1  w-[77%] ">

                {children}
            </section>
            {/* {inbox} */}
            {/* <div id="modal-root"></div> */}

        </div>
        // <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        //     <div className="w-full flex-none md:w-64">
        //         <SideNav />
        //     </div>
        //     <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        // </div>
    )
}
