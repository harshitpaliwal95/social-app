import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

const initialState = {
  isLoading: false,
  allPosts: null,
  userPosts: null,
  olderPosts: null,
};

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ content, authId }, { rejectWithValue }) => {
    console.log(content, authId);
    try {
      const { error } = await supabase
        .from("posts")
        .insert([{ content: content, userId: authId }]);
      if (error) {
        rejectWithValue(error);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const commentPost = createAsyncThunk(
  "posts/commentPost",
  async (
    { userId, postId, comment, username, avatarUrl },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase.from("comments").insert([
        {
          userId: userId,
          postId: postId,
          comment: comment,
          username: username,
          avatar_url: avatarUrl,
        },
      ]);
      if (error) {
        rejectWithValue(error);
      }
      console.log(data);
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const allPosts = createAsyncThunk(
  "posts/allPosts",
  async (_, { rejectWithValue }) => {
    try {
      let { data: posts, error } = await supabase.from("posts").select(
        `
      *,
      profiles!posts_userId_fkey(
         username,avatar_url
       ),
       likes(postId,userId),
       comments(comment,username,avatar_url,comment_id)
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
  "posts/userPosts",
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
         likes(postId,userId),
         comments(comment,username,avatar_url)
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
        state.allPosts = [...payload].reverse();
        state.olderPosts = payload;
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
        state.userPosts = [...payload].reverse();
      })
      .addCase(userPosts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.authError = payload;
      });
  },
});

export default postSlice.reducer;
