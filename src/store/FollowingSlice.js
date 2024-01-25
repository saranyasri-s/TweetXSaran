import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const followingSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFollowing: (state, action) => {
      return [...action.payload];
    },
    clearFollowing: (state) => initialState,
  },
});

export const { setFollowing, clearFollowing } = followingSlice.actions;

export default followingSlice.reducer;
