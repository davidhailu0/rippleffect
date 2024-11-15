'use client'

import * as React from 'react'
import { useQuery } from "@tanstack/react-query"
import { fetchLeads } from "@/services/leadsService"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { format } from 'date-fns'
import LeadsSkeleton from './leadsSkeleton'

interface Lead {
    id: string
    name: string
    email_address: string
    created_at: string
    stage: string
    booking_date?: string
    booking_status?: string
}

export default function LeadsTable() {
    const { data: leads, isLoading, error } = useQuery<Lead[], Error>({
        queryKey: ['leads'],
        queryFn: fetchLeads
    })

    const [expandedRows, setExpandedRows] = React.useState<Record<string, boolean>>({})

    const toggleRow = (id: string) => {
        setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }))
    }

    if (isLoading) return <LeadsSkeleton />

    if (error) return <ErrorMessage message="Error loading leads." />

    return (
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-white mb-6">Leads</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]"></TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden md:table-cell">Email</TableHead>
                                <TableHead className="hidden lg:table-cell">Signup Date</TableHead>
                                <TableHead>Stage</TableHead>
                                <TableHead className="hidden xl:table-cell">Booking Date</TableHead>
                                <TableHead className="hidden xl:table-cell">Booking Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads?.map((lead) => (
                                <React.Fragment key={lead.id}>
                                    <TableRow className="cursor-pointer" onClick={() => toggleRow(lead.id)}>
                                        <TableCell>
                                            {expandedRows[lead.id] ? (
                                                <ChevronUp className="h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4" />
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{lead.name}</TableCell>
                                        <TableCell className="hidden md:table-cell">{lead.email_address}</TableCell>
                                        <TableCell className="hidden lg:table-cell">{format(new Date(lead.created_at), 'MMM d, yyyy')}</TableCell>
                                        <TableCell>
                                            <Badge>{lead.stage}</Badge>
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell">{lead.booking_date ? format(new Date(lead.booking_date), 'MMM d, yyyy') : 'N/A'}</TableCell>
                                        <TableCell className="hidden xl:table-cell">
                                            {lead.booking_status ? (
                                                <Badge>{lead.booking_status}</Badge>
                                            ) : 'N/A'}
                                        </TableCell>
                                    </TableRow>
                                    {expandedRows[lead.id] && (
                                        <TableRow>
                                            <TableCell colSpan={7}>
                                                <div className="p-4 bg-gray-50">
                                                    <p><strong>ID:</strong> {lead.id}</p>
                                                    <p><strong>Email:</strong> {lead.email_address}</p>
                                                    <p><strong>Signup Date:</strong> {format(new Date(lead.created_at), 'MMMM d, yyyy')}</p>
                                                    <p><strong>Stage:</strong> {lead.stage}</p>
                                                    <p><strong>Booking Date:</strong> {lead.booking_date ? format(new Date(lead.booking_date), 'MMMM d, yyyy') : 'N/A'}</p>
                                                    <p><strong>Booking Status:</strong> {lead.booking_status || 'N/A'}</p>
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
