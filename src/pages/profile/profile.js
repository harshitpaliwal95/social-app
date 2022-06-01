import { Box, Typography } from "../../getUi";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../feature/profile/profileSlice";
import { useEffect } from "react";
import { UserInfo } from "./userInfo";
import { userPosts } from "../../feature/posts/postSlice";
import { LinearLoder, PostCard } from "../../components";

export const Profile = () => {
  const { auth, posts } = useSelector((store) => store);

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
          marginTop: "4.6rem",
          color: "white",
        }}
      >
        <UserInfo />
        <Box
          sx={{
            width: {
              xs: "20rem",
              md: "40rem",
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
