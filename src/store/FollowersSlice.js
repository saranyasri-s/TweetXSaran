import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const followersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setfollowers: (state, action) => {
      return [...action.payload];
    },
    clearfollowers: (state) => initialState,
  },
});

export const { setfollowers, clearfollowers } = followersSlice.actions;

export default followersSlice.reducer;
