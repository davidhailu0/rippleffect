import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/Common";
import { axiosInstance } from "@/config/axiosConfig";

export type AuthState = {
  isLogged: boolean;
  isLoggedOut: boolean;
  isAuthFailed: boolean;
  user: User | null;
};

const initialState: AuthState = {
  isLogged: false,
  isLoggedOut: false,
  isAuthFailed: false,
  user: null,
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
      localStorage.removeItem("token");
      axiosInstance.defaults.headers.common["Authorization"] = "";
      const resetState = {
        ...initialState,
        isLoggedOut: true,
      };
      Object.assign(state, resetState);
    },
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
    },
    resetAuthSlice: (state) => {
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
  setUser,
  setIsLoggedOut,
} = authSlice.actions;

export default authSlice.reducer;
