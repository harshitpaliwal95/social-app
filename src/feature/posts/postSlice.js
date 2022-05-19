import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

const initialState = {
  isLoading: false,
  allPosts: null,
  userPosts: null,
};

export const allPosts = createAsyncThunk(
  "profile/allPosts",
  async (_, { rejectWithValue }) => {
    console.log("shoot allposts");
    try {
      let { data: posts, error } = await supabase.from("posts").select(
        `
      *,
      profiles!posts_userId_fkey(
         username,avatar_url
       ),
       likes(postId)
      `,
        { count: "exact" }
      );
      if (error) {
        return rejectWithValue(error);
      }
      return posts;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const userPosts = createAsyncThunk(
  "profile/userPosts",
  async (userID, { rejectWithValue }) => {
    try {
      let { data: posts, error } = await supabase
        .from("posts")
        .select(
          `
        *,
        profiles!posts_userId_fkey(
           username,avatar_url
         ),
         likes(postId)
        `
        )
        .eq("userId", userID);

      if (error) {
        return rejectWithValue(error);
      }
      return posts;
    } catch (error) {
      console.log("error");
      rejectWithValue(error);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.allPosts = payload.reverse();
      })
      .addCase(allPosts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.authError = payload;
      });
    builder
      .addCase(userPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userPosts = payload;
      })
      .addCase(userPosts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.authError = payload;
      });
  },
});

export default postSlice.reducer;
