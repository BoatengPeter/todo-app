"use client"
import { toast } from 'sonner'
import { useState } from 'react'

// Custom hook for cancellable async operations
function useCancellableAsync<T>(asyncFn: () => Promise<T>, delay = 2000) {
    const [isLoading, setIsLoading] = useState(false)

    const execute = () => {
        setIsLoading(true)
        let isCancelled = false

        const toastId = toast.loading(
            (t: number) => (
                <span>
                    Deleting todo...
                    <button
                        className="ml-2 bg-gray-200 px-2 py-1 rounded-md text-sm"
                        onClick={() => {
                            isCancelled = true
                            toast.dismiss(t.id)
                            toast.success('Deletion cancelled')
                            setIsLoading(false)
                        }}
                    >
                        Cancel
                    </button>
                </span>
            ),
            { duration: Infinity }
        )

        setTimeout(() => {
            if (isCancelled) return

            asyncFn()
                .then((result) => {
                    if (isCancelled) return
                    toast.success('Todo deleted successfully', { id: toastId })
                })
                .catch((error) => {
                    if (isCancelled) return
                    toast.error('Failed to delete todo', { id: toastId })
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }, delay)
    }

    return { execute, isLoading }
}

