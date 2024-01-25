import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  displayName: "",
  posts: [],
  following: [],
  followers: [],
  uid: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Assuming action.payload is an object with the properties you want to update
      return {
        ...state,
        ...action.payload,
      };
    },
    clearUser: (state) => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
