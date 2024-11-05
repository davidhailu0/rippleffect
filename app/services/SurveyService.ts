import Cookies from "js-cookie";
import { axiosInstance } from "@/config/axiosConfig";


export const fetchSurveys = async()=>{
    const resp = await axiosInstance(`/api/v1/surveys`)
    const respJson = await resp.data
    // console.log(respJson.availabilities)
    if(respJson.questions){
      return respJson;
    }
    return [];
}
export const answerSurvey = async(data:any,id?:number)=>{
    try {
        const token = Cookies.get('token');
        if (!token) return;

        await axiosInstance.post(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/surveys/${id}/answer`, data);
    } catch (error) {
        console.error('Error submitting answers:', error);
    }
}