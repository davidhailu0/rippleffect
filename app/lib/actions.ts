'use server'


export async function createAccount(prevState:void,formData:FormData){
    const email = formData.get("email")
    const resp = await fetch(`${process.env.DOMAIN}/api/v1/leads`,{method:'POST',headers:{
        'Content-Type':'application/json',
        'Origin': 'https://cribcrm.com/'
    },body:JSON.stringify({
        'affiliate_id':process.env.affiliate_ID,
        'email':email
    })})
    const json = await resp.json()
    return json
}