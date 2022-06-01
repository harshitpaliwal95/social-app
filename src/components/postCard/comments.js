import React from "react";
import { Box, Avatar, Typography, blue } from "../../getUi";

export const Comments = ({ username, avatartUrl, comment }) => {
  return (
    <Box
      sx={{
        display: "flex",
        marginBottom: "1rem",
      }}
    >
      <Avatar
        sx={{ bgcolor: blue[500] }}
        aria-label="recipe"
        src={avatartUrl}
      />
      <Box sx={{ marginLeft: "5px" }}>
        <Typography sx={{ marginBottom: "-6px" }}>{username}</Typography>
        <Typography variant="caption">{comment}</Typography>
      </Box>
    </Box>
  );
};
