// import { fetchFilteredMembers } from '../lib/actions';

export default async function MembersTable(
    //     {
    //     currentPage,
    // }: {
    //     currentPage: number;
    // }
) {
    const members = [{
        id: 1,
        name: "Abebe",
        email: "Abe@gmail.com",
        signupdate: 'Mar 2024',
        enegicId: '01',
        URLScheduler: '',
        StatusScheduler: false,
    }]

    return (
        <div className="mt-6 flow-root w-full bg-transparent">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-transparent p-2 md:pt-0">
                    <div className="md:hidden text-white">
                        {members?.map((member) => (
                            <div
                                key={member.id}
                                className="mb-2 w-full rounded-md bg-transparent p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center">
                                            <p>{member.name}</p>
                                        </div>
                                        <p className="text-base">{member.email}</p>
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
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Signup Date
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Enagic ID
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Status
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    URL Scheduler
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Status Scheduler
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent text-white">
                            {members?.map((member) => (
                                <tr
                                    key={member.id}
                                    className="w-full border-b py-3 h-20 border-y [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <p>{member.id}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <p>{member.name}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {member.email}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {member.signupdate}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {/* {formatDateToLocal(invoice.date)} */}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {/* <InvoiceStatus status={invoice.status} /> */}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            {/* <UpdateInvoice id={invoice.id} />
                                            <DeleteInvoice id={invoice.id} /> */}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
