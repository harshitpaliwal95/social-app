import { Avatar, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ModalBox, PostCard } from "../../components";

export const Profile = () => {
  const { auth } = useSelector((store) => store);

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
        <Avatar
          alt={auth.userName}
          src="/static/images/avatar/1.jpg"
          sx={{ width: 100, height: 100 }}
        />
        <Typography variant="h5" mt={2}>
          {auth.userName}
        </Typography>
        <Typography mt={0} sx={{ fontSize: ".7rem" }}>
          @{auth.userName}
        </Typography>
        <Typography>3 post | 30 Followers</Typography>
        <Typography mt={4} sx={{ maxWidth: "50ch", textAlign: "center" }}>
          I'm a developer skilled in JavaScript, React, and Web technologies. I
          like to ideate and build products by leveraging my problem-solving &
          programming skills.
        </Typography>
        <ModalBox
          imgText="Upload Avtar"
          inputText="Edit Bio"
          modalFor="editProfile"
        />
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
