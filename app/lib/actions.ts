import {z} from "zod"

const AccountSchema = z.object({
    username:z.string(),
    firstname:z.string(),
    lastname:z.string(),
    email:z.string(),
    password:z.string(),
    confirmpassword:z.string()
})

export async function createAccount(formData:FormData){
    const validatedAccount = AccountSchema.safeParse(Object.fromEntries(formData.entries()))
    if(!validatedAccount.success){
        
    }
}