import React from "react";
import { Box } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";

export const Navbar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        padding: { md: ".8rem 3rem", xs: ".4rem 2rem" },
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ marginTop: ".9rem", display: "flex", alignItems: "center" }}>
        <AdbIcon />
        <Typography
          variant="subtitle1"
          component="subtitle1"
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
        <TextField id="standard-basic" label="Search" variant="standard" />
      </Box>
    </Box>
  );
};
