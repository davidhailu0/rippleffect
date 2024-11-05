import Cookies from "js-cookie";
import { axiosInstance } from "@/config/axiosConfig";

type AnswerSurveyParam = {
    "answer": {
        "question_id"?: string,
        "response"?: string
    }
}

export const fetchSurveys = async()=>{
    const resp = await axiosInstance(`/api/v1/surveys`)
    const respJson = await resp.data
    // console.log(respJson.availabilities)
    if(respJson.questions){
      return respJson;
    }
    return [];
}
export const answerSurvey = async(data:AnswerSurveyParam,id?:number)=>{
    try {
        const token = Cookies.get('token');
        if (!token) return;

        await axiosInstance.post(`/api/v1/surveys/${id}/answer`, data);
    } catch (error) {
        console.error('Error submitting answers:', error);
    }
}