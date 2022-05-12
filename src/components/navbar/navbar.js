import React from "react";
import { Box } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const pathName = location.pathname;
  

  return (
    <Box
      sx={{
        display: "flex",
        visibility:
          pathName === "/login" || pathName === "/signup"
            ? "hidden"
            : "visible",
        backgroundColor: "inherit",
        padding: { md: ".8rem 3rem", xs: ".4rem 1rem" },
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          marginTop: ".9rem",
          display: "flex",
          alignItems: "center",
          color: "#1d9bf0",
        }}
      >
        <AdbIcon />
        <Typography
          variant="subtitle1"
          sx={{
            marginLeft: ".5rem",
            display: {
              md: "unset",
              xs: "none",
            },
          }}
        >
          ROBOT SOCIAL
        </Typography>
      </Box>
      <Box>
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          sx={{ width: "15rem" }}
        />
      </Box>
    </Box>
  );
};
