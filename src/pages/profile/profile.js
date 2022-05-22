import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { userProfile } from "../../feature/profile/profileSlice";
import { useEffect } from "react";
import { UserInfo } from "./userInfo";
import { userPosts } from "../../feature/posts/postSlice";
import { LinearLoder, PostCard } from "../../components";

export const Profile = () => {
  const { auth, profile, posts } = useSelector((store) => store);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile(auth.userID));
    dispatch(userPosts(auth.userID));
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          marginTop: "1rem",
        }}
      >
        <UserInfo auth={auth} profile={profile} />
        <Box
          sx={{
            width: {
              xs: "20rem",
              md: "36rem",
            },
          }}
        >
          <Typography variant="h6" mt={4}>
            Your post
          </Typography>
          {posts.userPosts === null ? (
            <LinearLoder />
          ) : (
            posts.userPosts.map((data) => (
              <PostCard key={data.id} data={data} authId={auth.userID} />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};
