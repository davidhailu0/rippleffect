'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
    error,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])
    return <div className="flex flex-col gap-10 h-full justify-center">
        <h2 className="text-3xl text-white text-center">Something Went Wrong!</h2>
        <p className='text-white text-center text-2xl'>The Page you are looking for can not be found</p>
    </div>
}