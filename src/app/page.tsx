import Header from "./_components/Header";
import Image from "next/image";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
export default function HomePage() {
    return (
        <main className="w-[80%] mx-auto h-screen ">
            <Header >
                <SignUpButton >
                    <Button aria-describedby="signUp" variant="outline" className="  text-base hover:scale-90">Sign Up</Button>
                </SignUpButton>
            </Header>
            <div className="flex flex-col md:flex-row gap-2 w-full items-center ">
                <div className="flex flex-col md:gap-6 flex-1 items-center">

                    <h1 className="text-3xl uppercase font-semibold text-center text-gray-700">Stay on Top of your Tasks with DOiT</h1>
                    {/* testimonial card */}
                    <div className="bg-white  p-5 shadow-md rounded-lg w-[90%] md:w-[80%] ">
                        <h3 className="text-baase font-semibold text-slate-700 mb-2">&quot; Its intuitive interface and seamless functionality have helped me stay organized and focused like never before. I can finally tackel my to-do list with confidence and clarity - it&apos;s a total productivity powerhouse!&quot;</h3>
                        <cite>~John Doe</cite>

                    </div>
                </div>
                <div className=" ">
                    <Image src="/images/Hero.png" alt="Hero image" width={500} height={500} loading="eager" />

                </div>
            </div>
        </main>
    );
}
