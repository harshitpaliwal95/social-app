import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

const initialState = {
  isLoading: false,
  userName: null,
  userBio: null,
  userAvtar: null,
  userPortfolio: null,
  allProfiles: null,
};

export const userProfile = createAsyncThunk(
  "profile/userProfile",
  async (userId, { rejectWithValue }) => {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`*`)
        .eq("id", userId)
        .single();

      if (error && status !== 406) {
        return rejectWithValue(error);
      }
      return { data, error };
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userName = payload.data.username;
        state.userBio = payload.data.user_bio;
        state.userAvtar = payload.data.avatar_url;
        state.userPortfolio = payload.data.website;
      })
      .addCase(userProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.authError = payload.error;
      });
  },
});

export default profileSlice.reducer;
