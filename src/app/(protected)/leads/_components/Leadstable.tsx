'use client';

import { fetchLeads } from "@/services/leadsService";
import { useQuery } from "@tanstack/react-query";
import LeadsSkeleton from "./leadsSkeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Lead } from "@/types/Lead";

export default function LeadsTable() {
    const { data, isLoading } = useQuery<Lead[], Error>({ queryKey: ['leads'], queryFn: fetchLeads });

    if (isLoading) return <LeadsSkeleton />;
    return (
        <div className="mt-6 w-full">
            {/* Mobile View */}
            <div className="md:hidden text-white space-y-4">
                {data?.map((member) => (
                    <Card key={member!.id} className="bg-transparent p-4 border border-gray-700 rounded-lg">
                        <CardHeader>
                            <p className="text-lg font-semibold">{member.name}</p>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-300">{member.email_address}</p>
                            {/* Add other details as needed */}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
                <Table className="min-w-full text-white">
                    <TableHeader className="bg-pink-400 text-left text-lg">
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
                        {data?.map((member) => (
                            <TableRow key={member!.id} className="border-b border-gray-600 h-20">
                                <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                                    {member.id}
                                </TableCell>
                                <TableCell className="whitespace-nowrap px-3 py-3">
                                    {member.name}
                                </TableCell>
                                <TableCell className="whitespace-nowrap px-3 py-3">
                                    {member.email_address}
                                </TableCell>
                                {/* <TableCell className="whitespace-nowrap px-3 py-3">
                                    {member.created_at}
                                </TableCell> */}
                                <TableCell className="whitespace-nowrap px-3 py-3">
                                    {/* Display additional member details if needed */}
                                </TableCell>
                                <TableCell className="whitespace-nowrap px-3 py-3">
                                    {/* Display booking date if applicable */}
                                </TableCell>
                                <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                                    {/* Display booking status or other details */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
