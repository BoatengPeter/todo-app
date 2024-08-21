"use client";
import { useRouter } from "next/navigation";
import { type ElementRef, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react"
import { Button } from "../ui/button"


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
        <div className="modal-backdrop" >
            <dialog ref={dialogRef} className="modal  " onClose={onDismissDialog}>
                {children}
                <Button size="sm" variant="destructive" aria-describedby="close-modal" onClick={onDismissDialog} className="right-7 top-2 absolute z-30 rounded-none  " ><X size={15} /></Button>
            </dialog>
        </div>,
        document.body)
}