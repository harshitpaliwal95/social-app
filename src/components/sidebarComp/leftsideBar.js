import {
  AccountCircleOutlined,
  BookmarkBorderOutlined,
  ExploreOutlined,
  HomeOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const style = {
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  color: "black",
  padding: { md: ".8rem 3rem", xs: ".6rem 1rem" },
};
const typoStyle = {
  marginLeft: ".4rem",
  display: {
    md: "unset",
    xs: "none",
  },
};

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
      <Link to="/">
        <Box sx={style}>
          <HomeOutlined />
          <Typography sx={typoStyle}>Home</Typography>
        </Box>
      </Link>
      <Link to="/explore">
        <Box sx={style}>
          <ExploreOutlined />
          <Typography sx={typoStyle}>Explore</Typography>
        </Box>
      </Link>
      <Link to="notification">
        <Box sx={style}>
          <NotificationsOutlined />
          <Typography sx={typoStyle}>Notification</Typography>
        </Box>
      </Link>
      <Link to="/bookmark">
        <Box sx={style}>
          <BookmarkBorderOutlined />
          <Typography sx={typoStyle}>Bookmark</Typography>
        </Box>
      </Link>
      <Link to="/profile">
        <Box sx={style}>
          <AccountCircleOutlined />
          <Typography sx={typoStyle}>Profile</Typography>
        </Box>
      </Link>
      <Button
        variant="outlined"
        sx={{
          marginInline: "auto",
          marginTop: "auto",
          marginBottom: "2rem",
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
