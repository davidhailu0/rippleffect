'use client'
import { useFormState } from "react-dom"
import { useState } from "react"
import { useRouter } from "next/navigation"
import TextField from "./TextField"
import { createAccount } from "../lib/actions"

export default function SignUpForm() {
    const [, formAction] = useFormState(createAccount, undefined)
    const [pressed, setPressed] = useState(false)
    const router = useRouter()

    return <form action={formAction} className="flex flex-col w-11/12 md:w-1/3 gap-4 mx-auto">
        <TextField name={pressed ? "code" : "email"} type={pressed ? "text" : "email"} placeholder={pressed ? "Confirmation Code" : "Email"} />
        <button onClick={pressed ? () => router.push('/step-2') : () => setPressed(true)} type={pressed ? 'button' : 'submit'} className="bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-6 col-span-2 w-[260px] mx-auto text-center">{!pressed ? "Sign Up" : "Confirm"}</button>
    </form>
}
