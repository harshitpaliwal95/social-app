import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const NotificationMsg = () => {
  return (
    <Typography
      variant="subtitle1"
      sx={{
        bgcolor: "#eaeaea",
        p: "3px",
        borderRadius: "8px",
        paddingLeft: "1rem",
      }}
    >
      <strong>harshit</strong> like your post just now
    </Typography>
  );
};

export const Notification = () => {
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
      <Stack spacing={2} sx={{ marginTop: "2rem" }}>
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
        <NotificationMsg />
      </Stack>
    </Box>
  );
};
