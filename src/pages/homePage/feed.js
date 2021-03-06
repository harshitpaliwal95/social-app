import { Box, Fab } from "../../getUi";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinearLoder, PostCard, PostModal } from "../../components";
import {
  allPosts,
  getBookmarkPost,
  userPosts,
} from "../../feature/posts/postSlice";
import {
  allUserProfile,
  userProfile,
} from "../../feature/profile/profileSlice";

export const Feed = () => {
  const { auth, posts } = useSelector((store) => store);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allPosts());
    dispatch(allUserProfile(auth.userID));
    dispatch(userProfile(auth.userID));
    dispatch(userPosts(auth.userID));
    dispatch(getBookmarkPost(auth.userID));
  }, [auth.userID]);

  return (
    <Box sx={{ marginTop: "4.6rem" }}>
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
        posts.allPosts.map((data) => (
          <PostCard key={data.id} data={data} authId={auth.userID} />
        ))
      )}
    </Box>
  );
};
