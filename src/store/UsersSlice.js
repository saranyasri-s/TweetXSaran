import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return [...action.payload];
    },
    clearUsers: (state) => initialState,
  },
});

export const { setUsers, clearUsers } = usersSlice.actions;

export default usersSlice.reducer;
