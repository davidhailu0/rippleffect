'use server'
import { cookies } from 'next/headers'

// type PrevState = {error?:string,frontend_token?:string}|undefined|void

// export async function createAccount(ref_code:string|undefined,prevState:PrevState,formData:FormData){
//     const email = formData.get("email")
//     let data;
//     if(Boolean(ref_code)){
//         data = {
//             lead: {
//                 "email": email,
//                 "referral_code": ref_code
//             }
//         }
//     }
//     else{
//         data = {
//             lead: {
//                 "email": email
//             }
//         }
//     }
//     const resp = await fetch(`${process.env.APP_DOMAIN}/api/v1/leads`,{method:'POST',headers:{
//         'Content-Type':'application/json',
//         'Origin': process.env.APP_ORIGIN as string
//     },body:JSON.stringify(data)})
//     const jsonResp = await resp.json()
//     return jsonResp;
// }

// export async function confirmAccount(frontend_token:string|null,prevState:void,formData:FormData){
//     const confirmation_token = formData.get('token')
//      await fetch(`${process.env.APP_DOMAIN}/api/v1/leads/confirm`,{method:'POST',headers:{
//         'Content-Type':'application/json',
//         'Origin': process.env.APP_ORIGIN as string
//     },body:JSON.stringify({
//         lead: {
//             "confirmation_token": confirmation_token,
//             "frontend_token": frontend_token
//         }
//     })})
//     // const json = await resp.json()
//     redirect('/step-2')
// }



export const fetchFilteredMembers = async()=>{
    const token = cookies().get('token')?.value
    const email = cookies().get('email')?.value
    const referral_code = cookies().get('referral_code')?.value
    const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/leads`,{
        headers:{
            'Origin':process.env.APP_ORIGIN as string,
            'Authorization':token||''
        },
        body:JSON.stringify({
            "lead": {
              "email": email,
              "referral_code": referral_code
            }
          })
    })
    const respJson = await resp.json()
    return respJson;
}