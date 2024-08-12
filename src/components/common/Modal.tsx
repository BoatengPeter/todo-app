"use client";
import { useRouter } from "next/navigation";
import { type ElementRef, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react"


export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<'dialog'>>(null);
    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal()
        }
    }, [])
    function onDismissDialog() {
        router.back()
    }
    // return createPortal(
    //     <div className=" aboslute top-0 left-0 right-0 bottom-0 z-50 flex h-screen w-screen items-center justify-center  backdrop:bg-black/50 backdrop:backdrop-blur-sm">
    //         <dialog ref={dialogRef} className=" w-[80%] h-auto max-w-[500px] border-none rounded-md bg-white relative flex items-center justify-center p-4 max-h-[500px] " onClose={onDismissDialog}>
    //             {children}
    //             <button onClick={onDismissDialog}><X size={15} className="top-2 right-2 w-12 bg-transparent border-none items-center display flex cursor-pointer h-12" /></button>
    //         </dialog>
    //     </div>,
    //     document.getElementById("modal-root")!

    return createPortal(
        <div className="modal-backdrop" >
            <dialog ref={dialogRef} className="modal  " onClose={onDismissDialog}>
                {children}
                <button onClick={onDismissDialog} className="close-button" />
            </dialog>
        </div>,
        document.body)
    // document.getElementById("modal-root")!)
}