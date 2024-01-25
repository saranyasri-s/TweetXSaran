import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./UserSlice";

const store = configureStore({
  reducer: { user: rootReducer },
  // Other store configurations can be added here if needed
});

export default store;
