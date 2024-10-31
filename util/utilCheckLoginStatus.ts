import Cookies from "js-cookie"
import { toast } from "sonner"
export default function utilcheckFirstTimeLogin(redirect:(arg:string)=>void){
    if(Cookies.get("questionFinished")){
      if(sessionStorage.getItem('go-to-step-3')){
        return
      }
     toast(`You've booked your call! Don't forget to watch all the videos in Step 3.`, {
          closeButton:true,
          action: {
               label: "Go to Step 3",
               onClick: function(){toast.dismiss();redirect('/step-3')},
             },
          style: {
            backgroundColor: '#facc15', // Yellow color
            color: '#000000', // Black text color for contrast
            border: '1px solid #fbbf24', // Darker yellow border
            fontWeight: 'bold',// Set a longer width
            minWidth: '500px', // Set a max-width to prevent overflow on large screens
            marginTop: '3rem', // Center the toast horizontally
          },
          position: 'top-left', // Position at the top center
          duration: Infinity, // Show for 5 seconds
        })
        sessionStorage.setItem('go-to-step-3',"true")
    }
    else if(Cookies.get("booked")){
      if(sessionStorage.getItem('go-to-question')){
        return
      }
     toast(`You've booked your call, but haven't answered the important questions yet.`, {
          closeButton:true,
          action: {
               label: "Complete Questionnaire",
               onClick: function(){toast.dismiss();redirect('/questionnire')},
             },
          style: {
            backgroundColor: '#facc15', // Yellow color
            color: '#000000', // Black text color for contrast
            border: '1px solid #fbbf24', // Darker yellow border
            fontWeight: 'bold',
            minWidth: '500px', // Set a max-width to prevent overflow on large screens
            marginTop: '3rem', // Center the toast horizontally
          },
          position: 'top-left', // Position at the top center
          duration: Infinity, // Show for 5 seconds
        })
        sessionStorage.setItem('go-to-question','true')
    }
    else if(Cookies.get("step-2-watched")){
      if(sessionStorage.getItem('go-to-book')){
        return
      }
     toast(`You've completed Step 2! You're now ready to book a call`, {
          closeButton:true,
          action: {
               label: "Book a Call",
               onClick: function(){toast.dismiss();redirect('/book')},
             },
          style: {
            backgroundColor: '#facc15', // Yellow color
            color: '#000000', // Black text color for contrast
            border: '1px solid #fbbf24', // Darker yellow border
            fontWeight: 'bold',// Set a longer width
            minWidth: '500px', // Set a max-width to prevent overflow on large screens
            marginTop: '3rem', // Center the toast horizontally
          },
          position: 'top-left', // Position at the top center
          duration: Infinity, // Show for 5 seconds
        })
        sessionStorage.setItem('go-to-book','true')
    }
    else if(Cookies.get("step-1-watched")){
      if(sessionStorage.getItem('go-to-step-2')){
        return
      }
     toast(`You've completed Step 1! You can now proceed to Step 2.`, {
          closeButton:true,
          action: {
               label: "Watch Step 2",
               onClick: function(){toast.dismiss();redirect('/step-2')},
             },
          style: {
            backgroundColor: '#facc15', // Yellow color
            color: '#000000', // Black text color for contrast
            border: '1px solid #fbbf24', // Darker yellow border
            fontWeight: 'bold',// Set a longer width
            minWidth: '500px', // Set a max-width to prevent overflow on large screens
            marginTop: '3rem', // Center the toast horizontally
          },
          position: 'top-left', // Position at the top center
          duration: Infinity, // Show for 5 seconds
        })
        sessionStorage.setItem('go-to-step-2',"true")
   }
   else if(Cookies.get('token')){
    if(sessionStorage.getItem('token')){
      return
    }
    toast(`You've Signup Successfully! You can now proceed to Step 1.`, {
         closeButton:true,
         action: {
              label: "Watch Step 1",
              onClick: function(){toast.dismiss();redirect('/step-1')},
            },
         style: {
           backgroundColor: '#facc15', // Yellow color
           color: '#000000', // Black text color for contrast
           border: '1px solid #fbbf24', // Darker yellow border
           fontWeight: 'bold',// Set a longer width
           minWidth: '500px', // Set a max-width to prevent overflow on large screens
            marginTop: '3rem', // Center the toast horizontally
         },
         position: 'top-left', // Position at the top center
         duration: Infinity, // Show for 5 seconds
       })
       sessionStorage.setItem('token','true')
  }
}