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
  "auth/loginUser",
  async (requireData, { rejectWithValue }) => {
    try {
      const { user, error } = await login(requireData);
      localStorage.setItem("userID", user.id);
      localStorage.setItem("userName", user.user_metadata.user_name);
      if (error) {
        return rejectWithValue(error);
      }
      return { user, error };
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isAuth = false;
      state.userID = null;
      state.userName = null;
      state.isLoading = false;
      state.authError = null;
      localStorage.removeItem("userID");
      localStorage.removeItem("userName");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.userID = action.payload.user.id;
        state.userName = action.payload.user.user_metadata.user_name;
        state.authError = !action.payload.error ? "something is wrong" : null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.authError = !payload.error ? "something is wrong" : null;
      });
  },
});
export const { logOut } = authSlice.actions;
export default authSlice.reducer;
