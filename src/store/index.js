import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./UserSlice";
import usersReducer from "./UsersSlice";
import followingReducer from "./FollowingSlice";
const store = configureStore({
  reducer: {
    user: rootReducer,
    users: usersReducer,
    following: followingReducer,
  },
  // Other store configurations can be added here if needed
});

export default store;
