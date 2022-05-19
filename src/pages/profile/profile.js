import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { userProfile } from "../../feature/profile/profileSlice";
import { useEffect } from "react";
import { UserInfo } from "./userInfo";
import { userPosts } from "../../feature/posts/postSlice";

export const Profile = () => {
  const { auth, profile } = useSelector((store) => store);

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
        <Box>
          <Typography variant="h6" mt={4}>
            Your post
          </Typography>
          {/* <PostCard />
            <PostCard />
            <PostCard /> */}
        </Box>
      </Box>
    </Box>
  );
};
