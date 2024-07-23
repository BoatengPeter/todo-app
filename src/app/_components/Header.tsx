import LoginButton from "./LoginButton"
import { Menu } from 'lucide-react'
const Header = () => {
    return (
        <header className="flex justify-between items-center ">
            <h1 className="text-3xl font-bold text-black">DOiT</h1>
            <Menu size={24} strokeWidth={2} className="text-black" />
            <LoginButton />
        </header>
    )
}

export default Header
