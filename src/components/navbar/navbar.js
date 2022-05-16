import React from "react";
import { Box } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <Box sx={{ position: "fixed", top: "0", width: "100vw" }}>
      <Box
        sx={{
          display: "flex",
          visibility:
            pathname === "/login" || pathname === "/signup"
              ? "hidden"
              : "visible",
          padding: { md: ".8rem 3rem", xs: ".4rem 1rem" },
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ffff",
        }}
      >
        <Link to="/">
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
        </Link>

        <Box>
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            sx={{ width: "15rem" }}
          />
        </Box>
      </Box>
    </Box>
  );
};
