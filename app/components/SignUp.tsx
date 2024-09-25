'use client'
import { MouseEvent } from "react"
import TextField from "./TextField"
import Button from "./Button"
import { useRouter } from "next/navigation"
export default function SignUpForm() {
    const router = useRouter()
    const handleRegister = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        router.push('/step-1')
    }
    return <form className="grid grid-cols-2 grid-rows-3 w-1/2 gap-4 mx-auto">
        <TextField name="username" type="text" placeholder="Username" />
        <TextField name="firstname" type="text" placeholder="First Name" />
        <TextField name="lastname" type="text" placeholder="Last Name" />
        <TextField name="email" type="email" placeholder="Email" />
        <TextField name="password" type="password" placeholder="Password" />
        <TextField name="confirmpassword" type="password" placeholder="Confirm Password" />
        <Button callBack={handleRegister} type="submit" title="Register Now" />
    </form>
}