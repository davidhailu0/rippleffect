import Image from "next/image"
import Link from "next/link"
import Navbar from "../components/Navbar"

export default function Step3() {
    return <>
        <Navbar />
        <div className="flex flex-col gap-3 mt-7 items-center h-screen w-2/3 mx-auto">
            <p className="text-4xl font-bold text-white">Thanks for booking your 1-on-1</p>
            <p className="text-4xl font-bold text-white">Business Plan Call with us!</p>
            <p className="text-base font-light text-white text-center my-7">To Fully benefit from your call and to ensure you already understand business model and are able to ask the right question.Please make sure you watch the following series of videos.
                BEFORE we talk. unfortunately if you are unable to watch the videos beforehand,we will not be able to proceed with your call.
            </p>
            <p className="text-white font-bold text-xl">Please Select Your Country</p>
            <div className="mt-12 flex flex-col mx-auto justify-between h-full items-center">
                <div className="flex">
                    <Link href={'/step-3/us'}><Image src={'/us.png'} alt="US" height={100} width={100} /></Link>
                    <Link href={'/step-3/eu'}><Image src={'/eu.png'} alt="EU" height={100} width={100} /></Link>
                    <Link href={'/step-3/uk'}><Image src={'/uk.png'} alt="UK" height={100} width={100} /></Link>
                    <Link href={'/step-3/canada'}><Image src={'/canada.png'} alt="CANADA" height={100} width={100} /></Link>
                    <Link href={'/step-3/australia'}><Image src={'/australia.png'} alt="Australia" height={100} width={100} /></Link>
                    <Link href={'/step-3/mexico'}><Image src={'/mexico.png'} alt="Mexico" height={100} width={100} /></Link>
                </div>
                <div>
                    <p className="text-white text-sm">&copy; {new Date().getFullYear()} RippleEffect. Allrights reserved</p>
                </div>
            </div>
        </div>
    </>
}