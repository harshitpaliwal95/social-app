import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/authSlice";
import profileReducer from "./feature/profile/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});
