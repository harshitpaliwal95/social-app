import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPosts } from "../../feature/posts/postSlice";
import { allUserProfile } from "../../feature/profile/profileSlice";
import { BasicTabs } from "./basicTabs";

export const Explore = () => {
  const { userID } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allPosts());
    dispatch(allUserProfile(userID));
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "4rem",
          flexDirection: "column",
        }}
      >
        <BasicTabs />
      </Box>
    </Box>
  );
};
