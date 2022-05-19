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

      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const allUserProfile = createAsyncThunk(
  "profile/allUserProfile",
  async (data, { rejectWithValue }) => {
    try {
      let { data: profiles, error } = await supabase.from(data).select("*");
      if (error) {
        return rejectWithValue(error);
      }
      return profiles;
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
        console.log(payload);
        state.isLoading = false;
        state.userName = payload.username;
        state.userBio = payload.user_bio;
        state.userAvtar = payload.avatar_url;
        state.userPortfolio = payload.website;
      })
      .addCase(userProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.authError = payload;
      });
    builder
      .addCase(allUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allUserProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allProfiles = payload;
      })
      .addCase(allUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.authError = "something went wrong";
      });
  },
});

export default profileSlice.reducer;
