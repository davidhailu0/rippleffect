'use client'
export default function checkEnv(){
    if(process.env.NEXT_PUBLIC_ENVIRONMENT==='dev'){
        localStorage.setItem("step-1-watched","true")
        localStorage.setItem("step-2-watched","true")
        localStorage.setItem("step-3-watched","true")
    }
}