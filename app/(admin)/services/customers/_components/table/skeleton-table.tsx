import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonTable() {
    return (
        <>
            <div className="lg:flex sm:w-full gap-4 space-y-1">
                <div className="lg:w-1/1 sm:w-full items-center justify-center">
                    <div className="grid gap-4 space-y-3 mt-6">
                        <Skeleton className="h-4 py-4 w-full" />
                        <Skeleton className="h-4 py-4 w-full" />
                        <Skeleton className="h-4 py-4 w-full" />
                        <Skeleton className="h-4 py-4 w-full" />
                        <Skeleton className="h-4 py-4 w-full" />
                        <Skeleton className="h-4 py-4 w-full" />
                    </div>
                </div>
            </div>
        </>
    )
}
