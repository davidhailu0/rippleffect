import { lato } from "@/app/fonts/lato";
import Navbar from "@/app/components/Navbar";
import Logo from "@/app/components/LogoComponent";

export default function Leaderboard() {
    return (
        <>
            <Logo />
            <Navbar />
            <div className="flex flex-col gap-4 md:gap-5 md:mt-7 items-start w-[95%] md:w-[85%] mx-auto">
                <p className="text-xl md:text-4xl font-bold text-white">Leaderboard</p>
                <p className={`${lato.className} text-white text-start md:text-center text-base px-0 leading-7 md:text-lg font-medium md:leading-[23.4px]`}>Compare your progress with our top users</p>
                <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-4">
                    <LeaderboardCard title="Today" data={[{ id: 1, name: 'Nate', score: '10' }, { id: 1, name: 'Nate', score: '10' }]} />
                    <LeaderboardCard title="Last 7 Days" data={[{ id: 1, name: 'Nate', score: '10' }, { id: 1, name: 'Nate', score: '10' }]} />
                    <LeaderboardCard title="Last 30 Days" data={[{ id: 1, name: 'Nate', score: '10' }, { id: 1, name: 'Nate', score: '10' }]} />
                    <LeaderboardCard title="All Time" data={[{ id: 1, name: 'Nate', score: '10' }, { id: 1, name: 'Nate', score: '10' }]} />
                </div>
            </div>
        </>
    );
}

type LeaderboardData = { id: number, name: string, score: string }[]
const LeaderboardCard = ({ data, title }: { data: LeaderboardData, title: string }) => {
    return (
        <div className="flex flex-col">
            <p className="text-2xl text-white font-bold">{title}</p>
            <div>
                <div className="mt-6 flow-root w-full bg-transparent">
                    <div className="inline-block min-w-full align-middle">
                        <div className="rounded-lg bg-transparent py-2 md:pt-0">
                            <div className="md:hidden">
                                {data?.map((leader) => (
                                    <div
                                        key={leader.id}
                                        className="mb-2 w-full rounded-md bg-transparent y-4"
                                    >
                                        <div className="flex items-center justify-between border-b pb-4">
                                            <div>
                                                <div className="mb-2 flex items-center">
                                                    <p>{leader.name}</p>
                                                </div>
                                                <p className="text-sm text-gray-500">{leader.name}</p>
                                            </div>
                                            {/* <InvoiceStatus status={invoice.status} /> */}
                                        </div>
                                        <div className="flex w-full items-center justify-between pt-4">
                                            <div>
                                                {/* <p className="text-xl font-medium">
                                            {formatCurrency(invoice.amount)}
                                        </p>
                                        <p>{formatDateToLocal(invoice.date)}</p> */}
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                {/* <UpdateInvoice id={invoice.id} />
                                        <DeleteInvoice id={invoice.id} /> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <table className="hidden min-w-full text-gray-900 md:table">
                                <thead className="rounded-lg text-left bg-[#0F2C40] font-bold text-white h-24">
                                    <tr>
                                        <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                            #
                                        </th>
                                        <th scope="col" className="px-4 py-5 font-medium">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-5 font-medium">
                                            Score
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-transparent text-white">
                                    {data?.map((leader) => (
                                        <tr
                                            key={leader.id}
                                            className="w-full border-b py-3 h-20 border-y [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                        >
                                            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                                <p>{leader.id}</p>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-3">
                                                <p>{leader.name}</p>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-3">
                                                {leader.score}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}