import { SignInButton, SignedOut } from "@clerk/nextjs"
import { Button } from "~/components/ui/button";


const Header = ({ children }: { children?: React.ReactNode }) => {
    return (
        <header className="flex justify-between items-center mt-2 md:mt-4 mb-12 md:mb-16 ">
            <h1 className="text-3xl font-bold text-black">DOiT</h1>


            <div className=" flex flex-row gap-2 md:gap-4">

                <SignedOut>
                    <SignInButton >
                        <Button size='sm' aria-describedby="signUp" className="   bg-blue-500 text-base hover:bg-blue-400">Sign In</Button>
                    </SignInButton>
                </SignedOut>
                {children}
            </div>
        </header>
    )
}

export default Header
