'use client'
import Cookies from "js-cookie";
import { axiosInstance } from "@/config/axiosConfig";

export const fetchAvailableDates = async(month:number,year:number)=>{
    const resp = await axiosInstance.get(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/availabilities/?year=${year}&month=${month}`)
    if(resp.data.availabilities){
      return resp.data.availabilities;
    }
    return [];
}

type BookParams = {start_time:string, end_time:string,timezone:string}

export const bookSession = async({start_time, end_time,timezone}:BookParams)=>{
        try {
            const resp = await axiosInstance.post(`/api/v1/bookings`,{ start_time, end_time, timezone })
            const respJson = await resp.data
            if (respJson.message) {
                Cookies.set('bookedTime', start_time)
                return "success"
            }
        }
        catch (e) {
            console.error(e)
        }
}
