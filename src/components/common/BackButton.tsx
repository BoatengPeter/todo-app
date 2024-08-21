'use client'
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
const BackButton = () => {
    const router = useRouter()
    const handleBackEvent = () => {
        router.back()
    }
    return (
        <>
            <Button onClick={handleBackEvent} variant="link" className="text-xl ">Go Back
            </Button>

        </>
    )
}

export default BackButton
