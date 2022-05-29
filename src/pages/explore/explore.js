import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { allPosts } from "../../feature/posts/postSlice";
import { BasicTabs } from "./basicTabs";

export const Explore = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allPosts());
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
