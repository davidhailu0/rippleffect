'use client'

import * as React from 'react'
import { useQuery } from "@tanstack/react-query"
import { fetchLeads } from "@/services/leadsService"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronUp } from 'lucide-react'
import LeadsSkeleton from './leadsSkeleton'
import { Lead } from '@/types/Lead'

export default function LeadsTable() {
    const { data: leads, isLoading, error } = useQuery<Lead[], Error>({
        queryKey: ['leads'],
        queryFn: fetchLeads
    })

    const [expandedRows, setExpandedRows] = React.useState<Record<string, boolean>>({})

    const toggleRow = (id: string) => {
        setExpandedRows(prev => ({ [id]: !prev[id] }))
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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads?.map((lead) => (
                                <React.Fragment key={lead.id}>
                                    <TableRow className="cursor-pointer" onClick={() => toggleRow(lead.id.toString())}>
                                        <TableCell>
                                            {expandedRows[lead.id] ? (
                                                <ChevronUp className="h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4" />
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{lead.first_name ? lead.first_name + " " + lead.last_name : ""}</TableCell>
                                        <TableCell className="hidden md:table-cell">{lead.email_address}</TableCell>
                                    </TableRow>
                                    {expandedRows[lead.id] && (
                                        <TableRow>
                                            <TableCell colSpan={7}>
                                                <div className="p-4 bg-gray-50">
                                                    <p><strong>Name:</strong> {lead.first_name ? lead.first_name + " " + lead.last_name : ""}</p>
                                                    <p><strong>Email:</strong> {lead.email_address}</p>
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
