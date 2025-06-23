import React from 'react'
import { Card, CardContent } from '../ui/card'

export default function FeedListSkeleton() {
    return (
        <div className="space-y-4 p-4">
            {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="animate-pulse">
                    <CardContent className="p-4">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-muted rounded-md"></div>
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-muted rounded w-3/4"></div>
                                <div className="h-4 bg-muted rounded w-1/2"></div>
                                <div className="flex gap-2">
                                    <div className="h-6 bg-muted rounded w-20"></div>
                                    <div className="h-6 bg-muted rounded w-16"></div>
                                    <div className="h-6 bg-muted rounded w-24"></div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
