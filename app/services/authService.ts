'use client'

import ConfirmLead from "../../types/ConfirmLead";
import CreateLead from "../../types/CreateLeadType";

export const createLead = async (data:CreateLead)=>{
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Origin': window.location.origin,
        'Origin-Override': process.env.NEXT_PUBLIC_APP_ORIGIN || '',
      };
      const url = `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/leads`;
      const response = await fetch(url, {
        headers,
        body: JSON.stringify(data),
        method:'POST'
      });
      return await response.json();
}

export const confirmLead = async(data:ConfirmLead)=>{
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Origin': window.location.origin,
        'Origin-Override': process.env.NEXT_PUBLIC_APP_ORIGIN || '',
      };
      const url = `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/leads/confirm`;
      const response = await fetch(url, {
        headers,
        body: JSON.stringify(data),
        method:'POST'
      });
      return await response.json();
}

export const verifyLoginTokenRequest = async(login_token:string)=>{
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Origin': window.location.origin,
        'Origin-Override': process.env.NEXT_PUBLIC_APP_ORIGIN || '',
    };
    const url = `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/login_with_token?login_token=${login_token}`;
    const response = await fetch(url, {
        headers,
    });
    return await response.json();
}