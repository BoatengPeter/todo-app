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
    return createPortal(
        <div className="">
            <dialog ref={dialogRef} className="" onClose={onDismissDialog}>
                {children}
                <button onClick={onDismissDialog}><X size={15} /></button>
            </dialog>
        </div>,
        document.getElementById("modal-root")!
    )
}