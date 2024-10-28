export default function checkFirstTimeLogin(){
    if(localStorage.getItem("booked")){
        return "Go to Account"
    }
    else if(localStorage.getItem("step-2-watched")){
         return "Go to Booking"
    }
    else if(localStorage.getItem("step-1-watched")){
        return "Go to Step 2"
   }
   return 'Sign Up'
}