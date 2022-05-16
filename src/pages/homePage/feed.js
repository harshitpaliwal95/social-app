import { Box, Fab } from "@mui/material";
import { React } from "react";
import { ModalBox, PostCard } from "../../components";

export const Feed = () => {
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
        <ModalBox
          imgText="Upload Image"
          inputText="Add Caption"
          modalFor="newPost"
        />
      </Fab>

      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </Box>
  );
};
