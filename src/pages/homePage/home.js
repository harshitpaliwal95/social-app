import { Box } from "@mui/material";
import { React } from "react";
import { CreateNewPost, PostCard } from "../../components";

export const Home = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        marginTop: "4.8rem",
        left: "0",
        right: "0",
        marginLeft: { md: "auto", xs: "4rem" },
        marginRight: "auto",
        width: "40rem",
        zIndex: "-11",
      }}
    >
      <CreateNewPost />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </Box>
  );
};
