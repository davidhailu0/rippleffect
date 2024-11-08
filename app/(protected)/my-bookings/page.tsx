'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import BookingSkeleton from './BookingSkeleton';
import { fetchBookings } from '@/services/bookingServices';
import { formatFriendlyDate } from '@/util/UtilformatDateFriendly';


export default function BookingsPage() {
    const { data: bookings, isLoading, error } = useQuery<Booking[], Error>({ queryKey: ['bookings'], queryFn: fetchBookings });

    if (isLoading) {
        return (<BookingSkeleton />);
    }

    if (error) {
        return <p className="text-red-500">Error loading bookings.</p>;
    }

    return (
        <div className="mt-6 w-[95%] md:w-[83%] mx-auto space-y-4">
            {/* Mobile View */}
            <div className="md:hidden text-white space-y-4">
                {bookings?.map((booking) => (
                    <Card key={booking.id} className="bg-[#3A77BF] p-4">
                        <CardHeader>
                            <CardTitle className="text-[#d7b398]">{booking.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm mt-1">{format(new Date(booking.start_date), 'yyyy-MM-dd hh:mm a')}</p>
                            <p>Status: <span className="text-[#d7b398]">{booking.status}</span></p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
                <p className="text-xl md:text-4xl font-bold text-white mb-4">Your Bookings</p>
                <Table className="min-w-full text-white">
                    <TableHeader>
                        <TableRow className="bg-[#3A77BF]">
                            <TableHead className='text-lg'>ID</TableHead>
                            <TableHead className='text-lg'>Name</TableHead>
                            <TableHead className='text-lg'>Start Date</TableHead>
                            <TableHead className='text-lg'>End Date</TableHead>
                            <TableHead className='text-lg'>Status</TableHead>
                            <TableHead className='text-lg'>Cancel Reason</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings?.map((booking) => (
                            <TableRow key={booking.id} className="bg-[#3A77BF] h-16 border-b border-gray-600">
                                <TableCell>{booking.id}</TableCell>
                                <TableCell>{booking.name}</TableCell>
                                <TableCell>{formatFriendlyDate(booking.start_date)}</TableCell>
                                <TableCell>{formatFriendlyDate(booking.end_date)}</TableCell>
                                <TableCell className={booking.status === 'active' ? 'text-[#d7b398]' : 'text-red-500'}>
                                    {booking.status}
                                </TableCell>
                                <TableCell>{booking.cancel_reason || 'N/A'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
