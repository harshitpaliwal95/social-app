import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../service/auth";

const initialState = {
  isAuth: localStorage.getItem("userID") === null ? false : true,
  userID: localStorage.getItem("userID") || null,
  userName: localStorage.getItem("userName") || null,
  isLoading: false,
  authError: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (requireData, { rejectWithValue }) => {
    try {
      const { user, error } = await login(requireData);
      localStorage.setItem("userID", user.id);
      localStorage.setItem("userName", user.user_metadata.user_name);
      rejectWithValue(error);
      return { user, error };
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducer: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isAuth = true;
        state.userID = payload.user.id;
        state.userName = payload.user.user_metadata.user_name;
        state.authError = !payload.error ? "something is wrong" : null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.authError = !payload.error ? "something is wrong" : null;
      });
  },
});

export default authSlice.reducer;
