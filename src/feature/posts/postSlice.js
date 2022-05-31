import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { supabase } from "../../supabaseClient";

const initialState = {
  isLoading: false,
  allPosts: null,
  userPosts: null,
  olderPosts: null,
  bookmark: null,
};

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ content, authId }, { rejectWithValue }) => {
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
  async ({ userId, postId, comment }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("comments").insert([
        {
          userId: userId,
          postId: postId,
          comment: comment,
        },
      ]);
      if (error) {
        rejectWithValue(error);
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const bookmarkPost = createAsyncThunk(
  "posts/bookmarkPost",
  async ({ postId, userId }) => {
    try {
      const { data, error } = await supabase
        .from("bookmark")
        .insert([{ userId: userId, postId: postId }]);
      if (error) {
        toast.error("something went wrong try later!");
      }
      if (data) {
        toast.success("post saved in bookmark");
      }
    } catch (error) {
      toast.error("something went wrong try later!");
    }
  }
);

export const getBookmarkPost = createAsyncThunk(
  "posts/getBookmarkPosts",
  async (authId, { rejectWithValue }) => {
    try {
      let { data: bookmark, error } = await supabase
        .from("bookmark")
        .select(
          `posts(
            *,
            profiles!posts_userId_fkey(
              username,avatar_url
            ),
            likes(postId,userId),
            comments(comment,comment_id,
             profiles(avatar_url,username)
             ),
             bookmark(postId,userId)
          )
        `
        )
        .eq("userId", authId);
      if (error) {
        toast.error("unable to get bookmark posts!!");
      }
      if (bookmark) {
        const updateBookmark = bookmark.map((item) => item.posts);
        return updateBookmark;
      }
    } catch (error) {
      toast.error("unable to get bookmark posts!!");
      return rejectWithValue(error);
    }
  }
);

export const removeBookmark = createAsyncThunk(
  "posts/removeBookmark",
  async ({ postId, userId }) => {
    try {
      const { error } = await supabase
        .from("bookmark")
        .delete()
        .eq("userId", userId)
        .eq("postId", postId);
      if (error) {
        toast.error("something went wrong!!");
      }
    } catch (error) {
      toast.error("something went wrong!!");
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
       comments(comment,comment_id,
        profiles(avatar_url,username)
        ),
        bookmark(postId,userId)
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
         comments(comment,comment_id,
          profiles(avatar_url,username)
          ),
          bookmark(postId,userId)
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
    builder
      .addCase(getBookmarkPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookmarkPost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.bookmark = payload.reverse();
      })
      .addCase(getBookmarkPost.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.authError = payload;
      });
  },
});

export default postSlice.reducer;
