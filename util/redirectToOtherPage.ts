
const directToOtherPages = (btnText:string,redirectTo:(arg:string)=>void)=>{
    if(btnText==='Go to Account'){
        redirectTo('/account')
    }
    else if(btnText==='Go to Booking'){
        redirectTo('/book')
    }
    else if(btnText==='Go to Step 2'){
        redirectTo('/step-3')
    }
}
export default directToOtherPages