import { Box } from "@mui/system";
import { PostCard } from "../../components";

export const Bookmark = () => {
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
        <PostCard/>
        <PostCard/>
        <PostCard/>
        <PostCard/>
    </Box>
  );
};
