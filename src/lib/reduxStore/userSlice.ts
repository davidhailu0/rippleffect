import { Video } from "@/types/Common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  videos: Video[] | null;
};

const initialState: UserState = {
  videos: null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<UserState["videos"]>) => {
      state.videos = action.payload;
    },
    resetAuthSlice: (state) => {
      const resetState = {
        ...initialState,
      };
      Object.assign(state, resetState);
    },
  },
});

export const { setVideos, resetAuthSlice } = authSlice.actions;

export default authSlice.reducer;
