'use client';
import React from 'react';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="w-full grid  h-screen grid-cols-1 place-items-center">
            <div className="flex flex-col items-center justify-center w-full h-full">

                <h2 className="text-center text-3xl font-semibold text-slate-700">Unable to fetch  todos</h2>
                <h2 className="text-center">Something went wrong!</h2>
                <button
                    className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                    onClick={
                        () => reset()
                    }
                >
                    Try again
                </button>
            </div>
        </main>

    );
}