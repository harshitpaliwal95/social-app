import { Avatar, Box, Button, Typography, Stack } from "@mui/material";

import React from "react";
const FollowCard = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar sx={{ bgcolor: "#1d9bf0", margin: "0 .6rem" }}>H</Avatar>
      <Typography>Name</Typography>
      <Button sx={{fontSize:'.8rem',marginLeft:'auto'}}>Follow</Button>
    </Box>
  );
};

export const RightSideBar = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        right: "20px",
        width: "16rem",
        borderRadius:'20px',
      }}
    >
      <Box>
        <Typography sx={{ margin: "1rem .6rem"}} variant="h6">Other Robots</Typography>
        <Stack sx={{margin:'0rem .4rem .5rem 0rem'}} spacing={2}>
         <FollowCard/>
         <FollowCard/>
         <FollowCard/>
         <FollowCard/>
        </Stack>
      </Box>
    </Box>
  );
};
