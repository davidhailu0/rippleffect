'use client'
import { useFormState } from "react-dom"
import TextField from "./TextField"
import { confirmAccount, createAccount } from "../lib/actions"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export default function SignUpForm({ ref_code }: { ref_code: string | undefined }) {
    const createAccountWithRef = createAccount.bind(null, ref_code)
    const [state, formAction] = useFormState(createAccountWithRef, undefined)
    const [, confirmFormAction] = useFormState(confirmAccount.bind(null, state && state.frontend_token ? state.frontend_token : null), undefined)

    if (state && state.error) {
        toast.error(state.error, { position: "top-center", })
    }
    if (state && state.frontend_token) {
        toast.success("Please Check Your Email", { position: "top-center", })
    }

    return <>
        <ToastContainer />
        <form action={state && state.frontend_token ? confirmFormAction : formAction} className="flex flex-col w-11/12 md:w-1/3 gap-4 mx-auto">
            <TextField name={"email"} type={"email"} placeholder={"Email"} hidden={state && Boolean(state.frontend_token)} />
            <TextField name={"token"} type={"text"} placeholder={"Confirmation Token"} hidden={!Boolean(state) || state.error} />
            <button type={'submit'} className={`${(!Boolean(state) || state.error) && 'hidden'} bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-6 col-span-2 w-[260px] mx-auto text-center`}>Confirm</button>
            <button type={'submit'} className={`${state && state.frontend_token && 'hidden'} bg-gradient-to-r from-[#18455F] via-[#4B7A87] to-black h-12 rounded-[50px] text-white shadow-xl font-bold mt-6 col-span-2 w-[260px] mx-auto text-center`}>{"Sign Up"}</button>
        </form>
    </>
}
