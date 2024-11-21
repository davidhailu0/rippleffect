'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { formatFriendlyDate } from '@/util/UtilformatDateFriendly'
import { fetchBookings } from '@/services/bookingServices'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Booking {
    id: string
    name: string
    start_date: string
    end_date: string
    status: string
    cancel_reason?: string
}

export default function BookingsPage() {
    const { data: bookings, isLoading, error } = useQuery<Booking[], Error>({
        queryKey: ['bookings'],
        queryFn: fetchBookings
    })

    const [expandedRows, setExpandedRows] = React.useState<Record<string, boolean>>({})

    const toggleRow = (id: string) => {
        setExpandedRows(prev => ({ [id]: !prev[id] }))
    }

    if (isLoading) {
        return <BookingSkeleton />
    }

    if (error) {
        return <ErrorMessage message="Error loading bookings." />
    }

    return (
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 min-h-screen">
            <h1 className="text-2xl font-bold text-white mb-6">Your Bookings</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]"></TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden md:table-cell">Start Date</TableHead>
                                <TableHead className="hidden md:table-cell">End Date</TableHead>
                                <TableHead>Status</TableHead>
                                {/* <TableHead className="hidden lg:table-cell">Cancel Reason</TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings?.map((booking) => (
                                <React.Fragment key={booking.id}>
                                    <TableRow className="cursor-pointer" onClick={() => toggleRow(booking.id)}>
                                        <TableCell>
                                            {expandedRows[booking.id] ? (
                                                <ChevronUp className="h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4" />
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{booking.name}</TableCell>
                                        <TableCell className="hidden md:table-cell">{formatFriendlyDate(booking.start_date)}</TableCell>
                                        <TableCell className="hidden md:table-cell">{formatFriendlyDate(booking.end_date)}</TableCell>
                                        <TableCell>
                                            <Badge>{booking.status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                    {expandedRows[booking.id] && (
                                        <TableRow>
                                            <TableCell colSpan={6}>
                                                <div className="p-4 bg-gray-50">
                                                    <p><strong>Start Date:</strong> {formatFriendlyDate(booking.start_date)}</p>
                                                    <p><strong>End Date:</strong> {formatFriendlyDate(booking.end_date)}</p>
                                                    {/* <p><strong>Cancel Reason:</strong> {booking.cancel_reason || 'N/A'}</p> */}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

function BookingSkeleton() {
    return (
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-64" />
            <h1 className="text-2xl font-bold text-white mb-6">Your Bookings</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead><Skeleton className="h-4 w-4" /></TableHead>
                                <TableHead><Skeleton className="h-4 w-24" /></TableHead>
                                <TableHead className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableHead>
                                <TableHead className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableHead>
                                <TableHead><Skeleton className="h-4 w-16" /></TableHead>
                                <TableHead className="hidden lg:table-cell"><Skeleton className="h-4 w-24" /></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...Array(5)].map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                    <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

function ErrorMessage({ message }: { message: string }) {
    return (
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Card>
                <CardHeader>
                    <CardTitle>Error</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-red-500">{message}</p>
                </CardContent>
            </Card>
        </div>
    )
}
