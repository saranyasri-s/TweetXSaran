import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./UserSlice";
import usersReducer from "./UsersSlice";
const store = configureStore({
  reducer: { user: rootReducer, users: usersReducer },
  // Other store configurations can be added here if needed
});

export default store;
