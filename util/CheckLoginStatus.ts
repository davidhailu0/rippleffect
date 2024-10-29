import Cookies from "js-cookie"
export default function checkFirstTimeLogin(){
    if(Cookies.get("questionFinished")){
         return "Go to Account"
    }
    else if(Cookies.get("booked")){
        return "Go to Questions"
    }
    else if(localStorage.getItem("step-2-watched")){
         return "Go to Booking"
    }
    else if(localStorage.getItem("step-1-watched")){
        return "Go to Step 2"
   }
   return 'Sign Up'
}