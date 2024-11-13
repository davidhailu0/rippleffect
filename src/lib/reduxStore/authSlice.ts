import { axiosInstance } from "@/config/axiosConfig";
import Cookies from "js-cookie";
import { Lead } from "@/types/Lead";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  isLogged: boolean;
  isLoggedOut: boolean;
  isAuthFailed: boolean;
  lead: Lead | null;
};
//FIXME: change isLogged to false
const initialState: AuthState = {
  isLogged: false,
  isLoggedOut: false,
  isAuthFailed: false,
  lead: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogged: (state) => {
      const resetState = {
        ...initialState,
        isLogged: true,
        isLoggedOut: false,
        isAuthFailed: false,
      };
      Object.assign(state, resetState);
    },
    setIsAuthFailed: (state, action: PayloadAction<boolean>) => {
      state.isAuthFailed = action.payload;
    },
    setIsLoggedOut: (state) => {
      Cookies.remove("token");
      axiosInstance.defaults.headers.common["Authorization"] = "";
      const resetState = {
        ...initialState,
        isLoggedOut: true,
      };
      Object.assign(state, resetState);
    },
    setLead: (state, action: PayloadAction<AuthState["lead"]>) => {
      state.lead = action.payload;
    },
    resetAuthSlice: (state) => {
      Cookies.remove("token");
      axiosInstance.defaults.headers.common["Authorization"] = "";
      const resetState = {
        ...initialState,
      };
      Object.assign(state, resetState);
    },
  },
});

export const {
  setIsLogged,
  setIsAuthFailed,
  resetAuthSlice,
  setLead,
  setIsLoggedOut,
} = authSlice.actions;

export default authSlice.reducer;
