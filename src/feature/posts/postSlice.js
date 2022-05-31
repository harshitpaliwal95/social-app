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

const errorToast = (error) => toast.error(error && "something went wrong!!!");

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ content, authId }) => {
    try {
      const { error } = await supabase
        .from("posts")
        .insert([{ content: content, userId: authId }]);
      if (error) {
        errorToast("unable to create post!!");
      }
    } catch (error) {
      errorToast("unable to create post!!");
    }
  }
);

export const commentPost = createAsyncThunk(
  "posts/commentPost",
  async ({ userId, postId, comment }) => {
    try {
      const { error } = await supabase.from("comments").insert([
        {
          userId: userId,
          postId: postId,
          comment: comment,
        },
      ]);
      if (error) {
        errorToast("unable to add comment!!");
      }
    } catch (error) {
      errorToast("unable to add comment!!");
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ postId, userId }) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .update({ content: content })
        .eq("id", postId)
        .eq("userId", userId);

      if (error) {
        errorToast("unable to edit Post");
      }
    } catch (error) {
      errorToast("unable to edit Post");
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId, userId }) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId)
        .eq("userId", userId);
      if (data) {
        toast.info("post deleted");
      }
      if (error) {
        errorToast("unable to delete post!");
      }
    } catch (error) {
      errorToast("unable to delete post!");
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
        errorToast();
      }
      if (data) {
        toast.success("post saved in bookmark");
      }
    } catch (error) {
      errorToast();
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
        errorToast("unable to get bookmark posts!!");
      }
      if (bookmark) {
        const updateBookmark = bookmark.map((item) => item.posts);
        return updateBookmark;
      }
    } catch (error) {
      errorToast("unable to get bookmark posts!!");
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
        errorToast();
      }
    } catch (error) {
      errorToast();
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ userId, postId }) => {
    try {
      const { data, error } = await supabase.from("likes").insert([
        {
          postId: postId,
          userId: userId,
        },
      ]);
      return { data, error };
    } catch (error) {
      errorToast();
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
        errorToast("unable to fetch posts");
        return rejectWithValue(error);
      }
      return posts;
    } catch (error) {
      errorToast("unable to fetch posts");
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
        errorToast("unable to fetch posts");
        return rejectWithValue(error);
      }
      return posts;
    } catch (error) {
      errorToast("unable to fetch posts");
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
