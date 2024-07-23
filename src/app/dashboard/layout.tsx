import SideNav from "./_components/sideNav";
export default function Dashboardlayout({ children }: { children: React.ReactNode }) {
    return (
        <div className=" flex ">
            <SideNav />
            {children}
        </div>
    )
}
