"use client"
import { Button } from '../ui/button'
import React, { useState } from 'react'
import { TodoFormOnly } from './TodoForm'
const AddSubTask = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            {isOpen ? <TodoFormOnly onclick={() => setIsOpen(false)} /> :
                <Button onClick={() => setIsOpen(true)} >Add Sub Task</Button>
            }
        </>
    )
}

export default AddSubTask
