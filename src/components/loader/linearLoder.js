import React from "react";
import { Box } from "@mui/system";
import LinearProgress from "@mui/material/LinearProgress";

export const LinearLoder = () => {
  return (
    <Box
      sx={{
        marginInline: "auto",
        width: "30rem",
        marginTop: "5rem",
      }}
    >
      <LinearProgress />
    </Box>
  );
};
