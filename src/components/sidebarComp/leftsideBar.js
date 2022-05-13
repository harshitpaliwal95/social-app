import {
  AccountCircleOutlined,
  BookmarkBorderOutlined,
  ExploreOutlined,
  HomeOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export const LeftSideBar = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <Box
      sx={{
        visibility:
          pathName === "/login" || pathName === "/signup"
            ? "hidden"
            : "visible",
        display: "flex",
        marginTop: "4.8rem",
        flexDirection: "column",
        borderRight: ".1px solid gray",
        position: "fixed",
        height: "90vh",
        width: {
          md: "unset",
          xs: "60px",
        },
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
      <Button
        variant="outlined"
        sx={{
          margin: "20rem auto",
          visibility: {
            md: "unset",
            xs: "hidden",
          },
        }}
      >
        <Avatar
          sx={{
            width: 26,
            height: 26,
            bgcolor: "#1d9bf0",
            fontSize: ".8rem",
            marginRight: ".6rem",
          }}
        >
          H
        </Avatar>
        <Box>
          <Typography variant="subtitle1">Logout</Typography>
        </Box>
      </Button>
    </Box>
  );
};
