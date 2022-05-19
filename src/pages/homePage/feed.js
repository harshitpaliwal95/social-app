import { Box, Fab } from "@mui/material";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinearLoder, PostCard, PostModal } from "../../components";
import { allPosts, userPosts } from "../../feature/posts/postSlice";
import { allUserProfile } from "../../feature/profile/profileSlice";

export const Feed = () => {
  const { auth, posts } = useSelector((store) => store);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allPosts());
    dispatch(allUserProfile("profiles"));
    dispatch(userPosts(auth.userID));
  }, []);

  return (
    <Box>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: {
            xs: 20,
            md: 300,
            xl: 400,
          },
        }}
      >
        <PostModal inputText="Add Caption" modalFor="newPost" />
      </Fab>

      {posts.allPosts === null ? (
        <LinearLoder />
      ) : (
        posts.allPosts.map((data) => <PostCard key={data.id} data={data} />)
      )}
    </Box>
  );
};
