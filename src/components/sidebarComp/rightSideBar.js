import { Avatar, Box, Button, Typography, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import React from "react";
const FollowCard = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar sx={{ bgcolor: "#1d9bf0", margin: "0 .6rem" }}>H</Avatar>
      <Typography>Name</Typography>
      <Button sx={{ fontSize: ".8rem", marginLeft: "auto" }}>Follow</Button>
    </Box>
  );
};

export const RightSideBar = () => {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <Box
      sx={{
        visibility:
          pathName === "/login" || pathName === "/signup"
            ? "hidden"
            : "visible",
        position: "absolute",
        right: "20px",
        width: "16rem",
        marginTop: "4.8rem",
        borderRadius: "20px",
        display: {
          md: "unset",
          xs: "none",
        },
        zIndex: "-11",
      }}
    >
      <Box>
        <Typography sx={{ margin: "1rem .6rem" }} variant="h6">
          Other Robots
        </Typography>
        <Stack sx={{ margin: "0rem .4rem .5rem 0rem" }} spacing={2}>
          <FollowCard />
          <FollowCard />
          <FollowCard />
          <FollowCard />
        </Stack>
      </Box>
    </Box>
  );
};
