"use client"
import React from 'react'
import clsx from 'clsx'

interface ButtonProps {
    className?: string;
    text: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

const AddTodoBtn = ({ className, text, icon, onClick }: ButtonProps) => {
    return (
        <button className={clsx('bg-blue-500 flex gap-2   font-semibold py-2 px-4 rounded', className)} onClick={onClick}>
            {icon}
            {text}
        </button>
    )
}

export default AddTodoBtn
