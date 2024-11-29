import * as React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type LeaderboardData = { id: number; name: string; score: string; avatar?: string }[]

interface LeaderboardCardProps {
    data: LeaderboardData
    title: string
}

export default function LeaderboardCard({ data, title }: LeaderboardCardProps) {
    return (
        <Card className="w-full bg-[#0F2C40] text-white">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Mobile view */}
                <div className="md:hidden space-y-4">
                    {data?.map((leader, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-[#1a3f5c] rounded-lg"
                        >
                            <div className="flex items-center space-x-4">
                                <Badge variant="secondary" className="w-8 h-8 rounded-full">
                                    {index + 1}
                                </Badge>
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={leader.avatar} alt={leader.name} />
                                    <AvatarFallback className='text-black'>{leader.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{leader.name}</p>
                                    <p className="text-sm text-gray-300">Score: {leader.score}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop view */}
                <div className="hidden md:block">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-[#1a3f5c]">
                                <TableHead className="text-white">Rank</TableHead>
                                <TableHead className="text-white">Name</TableHead>
                                <TableHead className="text-white text-right">Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.map((leader, index) => (
                                <TableRow
                                    key={index}
                                    className="border-b border-[#1a3f5c] hover:bg-[#1a3f5c] transition-colors"
                                >
                                    <TableCell className="font-medium">
                                        <Badge variant="secondary" className="w-8 h-8 rounded-full">
                                            {index + 1}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Badge>{leader.name}</Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right text-white">{leader.score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}