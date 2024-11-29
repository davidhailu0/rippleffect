"use client"

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function PreviewBanner() {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-yellow-100 border-t border-yellow-200 p-4 md:flex md:items-center md:justify-between z-50">
            <div className="flex items-center">
                <p className="text-yellow-800 font-medium">
                    This is a preview version. Features may change before the final release.
                </p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
                <Button
                    variant="outline"
                    size="sm"
                    className="text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900"
                    onClick={() => setIsVisible(false)}
                >
                    <X className="h-4 w-4 mr-2" />
                    Dismiss
                </Button>
            </div>
        </div>
    )
}

