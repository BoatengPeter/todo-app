import { Menu } from 'lucide-react'
import { SignInButton, SignedOut, SignedIn, UserButton } from "@clerk/nextjs"
import { Button } from "~/components/ui/button";

const Header = ({ children }: { children?: React.ReactNode }) => {
    return (
        <header className="flex justify-between items-center mt-4 mb-16 ">
            <h1 className="text-3xl font-bold text-black">DOiT</h1>
            <Menu size={24} strokeWidth={2} className="md:hidden text-black" />
            <div className="hidden md:flex flex-row gap-4">
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton >
                        <Button aria-describedby="signUp" className="   bg-blue-500 text-base hover:bg-blue-400">Sign In</Button>
                    </SignInButton>
                </SignedOut>
                {children}
            </div>
        </header>
    )
}

export default Header
