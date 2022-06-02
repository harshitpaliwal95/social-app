import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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

export const followAcc = createAsyncThunk(
  "profile/followAcc",
  async ({ userId, followingId }) => {
    try {
      const { data, error } = await supabase
        .from("follow")
        .insert([{ userId: userId, followingId: followingId }]);
      console.log(data, error);
    } catch (error) {
      toast.error("unable to follow!!");
    }
  }
);
export const unFollowAcc = createAsyncThunk(
  "profile/unFollowAcc",
  async ({ userId, followingId }) => {
    try {
      const { data } = await supabase
        .from("follow")
        .delete()
        .eq("userId", userId)
        .eq("followingId", followingId);
      console.log(data);
    } catch (error) {
      toast.error("something went wrong!!");
    }
  }
);

export const allUserProfile = createAsyncThunk(
  "profile/allUserProfile",
  async (authId, { rejectWithValue }) => {
    try {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select(`*, follow!follow_followingId_fkey(userId,followingId)`)
        .eq("follow.userId", authId);
      if (error) {
        return rejectWithValue(error);
      }

      const allPorfiles = profiles.filter((item) => item.id !== authId);
      return allPorfiles;
    } catch (error) {
      console.log(error);
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
        state.allProfiles = payload.reverse();
      })
      .addCase(allUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.authError = "something went wrong";
      });
  },
});

export default profileSlice.reducer;
