import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/authSlice";
import profileReducer from "./feature/profile/profileSlice";
import postReducer from "./feature/posts/postSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    posts: postReducer,
  },
});
