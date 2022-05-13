import { Avatar, Box, Typography } from "@mui/material";
import { PostCard } from "../../components";

export const Profile = () => {
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          margin: ".5rem",
        }}
      >
        <Avatar
          alt="Harshit"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 100, height: 100 }}
        />
        <Typography variant="subtitle1" mt={2}>
          Harshit Paliwal
        </Typography>
        <Typography mt={0} sx={{ fontSize: ".7rem" }}>
          @harshitpaliwal
        </Typography>
        <Typography mt={4} sx={{ textAlign: "center" }}>
          I'm a developer skilled in JavaScript, React, and Web technologies. I
          like to ideate and build products by leveraging my problem-solving &
          programming skills.
        </Typography>
        
        <Box sx={{ width: "100%" }}>
          <Typography variant="h6" mt={4}>
            Your post
          </Typography>
          <PostCard/>
          <PostCard/>
          <PostCard/>
        </Box>
      </Box>
    </Box>
  );
};
