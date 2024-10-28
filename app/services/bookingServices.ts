'use client'
import Cookies from 'js-cookie'

export const fetchAvailableDates = async(month:number,year:number)=>{
    const token = Cookies.get('token')
    const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/availabilities/?year=${year}&month=${month}`,{
        headers:{
            'Content-Type':'application/json',
            'Origin':process.env.NEXT_PUBLIC_APP_ORIGIN as string,
            'Origin-Override': process.env.NEXT_PUBLIC_APP_ORIGIN as string,
            'Authorization':token||''
        },
    })
    const respJson = await resp.json()
    if(respJson.availabilities){
      return respJson.availabilities;
    }
    return [];
}

type BookParams = {start_time:string, end_time:string,timezone:string}

export const bookSession = async({start_time, end_time,timezone}:BookParams)=>{
    const token = Cookies.get('token')
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/bookings`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'Origin': window.location.origin,
                        'Authorization': token || '',
                        'Origin-Override': process.env.NEXT_PUBLIC_APP_ORIGIN as string,
                    },
                    body: JSON.stringify({ start_time, end_time, timezone })
                })
            const respJson = await resp.json()
            if (respJson.message) {
                Cookies.set('bookedTime', start_time)
                // setShowRegistration(true)
                return "success"
            }
        }
        catch (e) {
            console.error(e)
        }
}
