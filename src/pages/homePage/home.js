import { Box } from "@mui/material";
import { React } from "react";
import { NewPost } from "../../components";


export const Home = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "0",
        right: "0",
        marginLeft: { md: "auto", xs: "4rem" },
        marginRight: "auto",
        width: "40rem",
      }}
    >
      <NewPost/>
    </Box>
  );
};
