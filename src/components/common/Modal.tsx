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
        <div className="modal-backdrop" >
            <dialog ref={dialogRef} className="modal  " onClose={onDismissDialog}>
                {children}
                <button onClick={onDismissDialog} className="close-button" ><X size={12} /></button>
            </dialog>
        </div>,
        document.body)
}