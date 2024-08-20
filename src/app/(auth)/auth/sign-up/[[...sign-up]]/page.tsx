import Header from "../../../../_components/Header"
import Image from "next/image";
import { SignUp } from "@clerk/nextjs";

export default function HomePage() {
    return (
        <main className="w-[80%] mx-auto h-screen ">
            <Header />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 place-items-center w-full pb-3">

                <div className="flex flex-col  justify-between">

                    <SignUp >
                    </SignUp>
                </div>
                <div className="hidden lg:block relative">
                    <Image src="/images/Hero.png" alt="Hero image" width={700} height={700} loading="eager" />
                    {/* testimonial card */}
                    <div className="absolute top-0 translate-y-[70%]  right-0 translate-x-1/3  h-auto w-2/3 bg-white z-10 p-5 shadow-md rounded-lg ">
                        <h3 className="text-baase font-semibold text-slate-700 mb-2">&quot; Its intuitive interface and seamless functionality have helped me stay organized and focused like never before. I can finally tackel my to-do list with confidence and clarity - it&apos;s a total productivity powerhouse!&quot;</h3>
                        <cite>~John Doe</cite>

                    </div>
                </div>
            </div>
        </main>
    );
}
