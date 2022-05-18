import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../../components";
import { userProfile } from "../../feature/profile/profileSlice";
import { useEffect } from "react";
import { UserInfo } from "./userInfo";

export const Profile = () => {
  const { auth } = useSelector((store) => store);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfile(auth.userID));
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
        <UserInfo auth={auth} />
        <Box>
          <Typography variant="h6" mt={4}>
            Your post
          </Typography>
          <PostCard />
          <PostCard />
          <PostCard />
        </Box>
      </Box>
    </Box>
  );
};
