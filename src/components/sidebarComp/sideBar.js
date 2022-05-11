import {
  AccountCircleOutlined,
  BookmarkBorderOutlined,
  ExploreOutlined,
  HomeOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

export const SideBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRight: ".1px solid gray",
        position: "fixed",
        height: "90vh",
      }}
    >
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: { md: ".8rem 3rem", xs: ".6rem 1rem" },
        }}
      >
        <HomeOutlined />
        <Typography
          sx={{
            marginLeft: ".4rem",
            display: {
              md: "unset",
              xs: "none",
            },
          }}
        >
          Home
        </Typography>
      </Box>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: { md: ".8rem 3rem", xs: ".6rem 1rem" },
        }}
      >
        <ExploreOutlined />
        <Typography
          sx={{
            marginLeft: ".4rem",
            display: {
              md: "unset",
              xs: "none",
            },
          }}
        >
          Explore
        </Typography>
      </Box>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: { md: ".8rem 3rem", xs: ".6rem 1rem" },
        }}
      >
        <NotificationsOutlined />
        <Typography
          sx={{
            marginLeft: ".4rem",
            display: {
              md: "unset",
              xs: "none",
            },
          }}
        >
          Notification
        </Typography>
      </Box>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: { md: ".8rem 3rem", xs: ".6rem 1rem" },
        }}
      >
        <BookmarkBorderOutlined />
        <Typography
          sx={{
            marginLeft: ".4rem",
            display: {
              md: "unset",
              xs: "none",
            },
          }}
        >
          Bookmark
        </Typography>
      </Box>
      <Box
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: { md: ".8rem 3rem", xs: ".6rem 1rem" },
        }}
      >
        <AccountCircleOutlined />
        <Typography
          sx={{
            marginLeft: ".4rem",
            display: {
              md: "unset",
              xs: "none",
            },
          }}
        >
          Profile
        </Typography>
      </Box>
      <Box
        sx={{
          cursor: "pointer",
          border: "1px solid gray",
          borderRadius: "50px",
          margin: "18rem auto",
          width: "5rem",
          display: "flex",
          alignItems: "center",
          padding: { md: ".8rem 3rem", xs: ".6rem 1rem" },
        }}
      >
        <Avatar
          sx={{
            width: 26,
            height: 26,
            bgcolor: "black",
            fontSize: ".8rem",
            marginRight: ".6rem",
          }}
        >
          H
        </Avatar>
        <Box>
          <Typography variant="subtitle1">Logout</Typography>
        </Box>
      </Box>
    </Box>
  );
};
