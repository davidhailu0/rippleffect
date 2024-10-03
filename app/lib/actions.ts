'use server'

import { redirect } from "next/navigation";

type PrevState = {error?:string,frontend_token?:string}|undefined|void

export async function createAccount(ref_code:string|undefined,prevState:PrevState,formData:FormData){
    const email = formData.get("email")
    let data;
    if(Boolean(ref_code)){
        data = {
            lead: {
                "email": email,
                "referral_code": ref_code
            }
        }
    }
    else{
        data = {
            lead: {
                "email": email
            }
        }
    }
    const resp = await fetch(`${process.env.DOMAIN}/api/v1/leads`,{method:'POST',headers:{
        'Content-Type':'application/json',
        'Origin': process.env.ORIGIN as string
    },body:JSON.stringify(data)})
    const jsonResp = await resp.json()
    console.log(jsonResp)
    return jsonResp;
}

export async function confirmAccount(frontend_token:string|null,prevState:void,formData:FormData){
    const confirmation_token = formData.get('token')
     await fetch(`${process.env.DOMAIN}/api/v1/leads/confirm`,{method:'POST',headers:{
        'Content-Type':'application/json',
        'Origin': process.env.ORIGIN as string
    },body:JSON.stringify({
        lead: {
            "confirmation_token": confirmation_token,
            "frontend_token": frontend_token
        }
    })})
    // const json = await resp.json()
    redirect('/step-2')
}



export const fetchFilteredMembers = async()=>{
    return [{
        id:1,
        name:"Abebe",
        email:"Abe@gmail.com",
        signupdate:'Mar 2024',
        enegicId:'01',
        URLScheduler:'',
        StatusScheduler:false,
    }]
}