import { useState } from "react"
import { useRouter } from "nextjs-toploader/app"
import { differenceInDays } from 'date-fns';
import Cookies from 'js-cookie';

function BookingRegistration({ callback }: { callback: () => void }) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState(Cookies.get('email'))
    const [phone, setPhone] = useState('')
    const router = useRouter()

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const token = Cookies.get('token')
        const id = Cookies.get('id')
        const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/leads/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Origin': process.env.NEXT_PUBLIC_APP_ORIGIN as string,
                'Authorization': token || '',
                'Origin-Override': process.env.NEXT_PUBLIC_APP_ORIGIN as string,
            },
            body: JSON.stringify({
                "lead": {
                    "email": email,
                    "first_name": firstName,
                    "last_name": lastName,
                    "phone": phone,
                    "terms_accepted": true
                }
            })
        })
        const respJson = await resp.json()
        if (respJson.message === 'Lead has been updated.') {
            Cookies.set('name', firstName, { path: '/', expires: 365 * 10 })
            Cookies.set('booked', "true", { path: '/', expires: differenceInDays(Cookies.get("bookedTime")!, new Date()) + 1 })
            router.replace('/questionnaire')
        }
    }
    return <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">User Information</h2>

        <form id="user-form" onSubmit={handleFormSubmit} className="space-y-4">
            <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" id="first-name" name="first-name" required
                    className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d7b398]" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>

            <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" id="last-name" name="last-name" required
                    className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d7b398]" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" name="email" required
                    className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d7b398]" value={email!} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" id="phone" name="phone" required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-black focus:ring-[#d7b398]"
                    placeholder="123-456-7890" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="flex items-start mt-4">
                <input type="checkbox" id="terms" name="terms" required
                    className="h-4 w-4 text-blue-600 focus:ring-[#d7b398] border-gray-300 rounded mt-0.5" />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                    I agree to the <span className="text-blue-600 underline">terms and conditions</span> provided by the company. By providing my phone number, I agree to receive text messages from the business.
                </label>
            </div>
            <div className="flex justify-between items-center mt-6">
                <button type="button" onClick={callback}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none">
                    Back
                </button>
                <button type="submit"
                    className="px-6 py-2 bg-[#d7b398] text-white rounded-md hover:bg-[#ab907b] transition-colors ease-in-out duration-75 focus:outline-none">
                    Schedule Meeting
                </button>
            </div>

        </form>
    </div>
}

export default BookingRegistration;