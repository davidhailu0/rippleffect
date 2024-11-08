import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export default function LeadSkeleton() {
    return (
        <div className="mt-6 w-full">
            {/* Mobile Skeleton */}
            <div className="md:hidden space-y-4">
                {[...Array(3)].map((_, index) => (
                    <Card key={index} className="p-4 bg-[#3A77BF]">
                        <CardContent>
                            <div className="flex items-center justify-between border-b border-gray-600 pb-4">
                                <div>
                                    <Skeleton className="h-4 w-24 mb-2 bg-gray-300 rounded" />
                                    <Skeleton className="h-4 w-40 bg-gray-300 rounded mt-2" />
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-between pt-4">
                                <Skeleton className="h-6 w-20 bg-gray-300 rounded" />
                                <Skeleton className="h-6 w-20 bg-gray-300 rounded" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Desktop Skeleton */}
            <div className="hidden md:block">
                <Table className="min-w-full">
                    <TableHeader className="bg-[#3A77BF] text-white">
                        <TableRow>
                            <TableHead className="px-4 py-5 font-medium sm:pl-6">#</TableHead>
                            <TableHead className="px-4 py-5 font-medium">Name</TableHead>
                            <TableHead className="px-3 py-5 font-medium">Email</TableHead>
                            <TableHead className="px-3 py-5 font-medium">Signup Date</TableHead>
                            <TableHead className="px-3 py-5 font-medium">Stage</TableHead>
                            <TableHead className="px-3 py-5 font-medium">Booking Date</TableHead>
                            <TableHead className="px-3 py-5 font-medium">Booking Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-transparent">
                        {[...Array(3)].map((_, index) => (
                            <TableRow key={index} className="animate-pulse border-b border-gray-600 h-20">
                                <TableCell className="py-3 pl-6 pr-3">
                                    <Skeleton className="h-4 w-6 bg-gray-300 rounded" />
                                </TableCell>
                                <TableCell className="px-3 py-3">
                                    <Skeleton className="h-4 w-24 bg-gray-300 rounded" />
                                </TableCell>
                                <TableCell className="px-3 py-3">
                                    <Skeleton className="h-4 w-40 bg-gray-300 rounded" />
                                </TableCell>
                                <TableCell className="px-3 py-3">
                                    <Skeleton className="h-4 w-24 bg-gray-300 rounded" />
                                </TableCell>
                                <TableCell className="px-3 py-3">
                                    <Skeleton className="h-4 w-20 bg-gray-300 rounded" />
                                </TableCell>
                                <TableCell className="px-3 py-3">
                                    <Skeleton className="h-4 w-24 bg-gray-300 rounded" />
                                </TableCell>
                                <TableCell className="py-3 pl-6 pr-3">
                                    <Skeleton className="h-4 w-10 bg-gray-300 rounded" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
