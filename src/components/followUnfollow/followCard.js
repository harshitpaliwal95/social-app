import React from "react";
import { CardHeader, Avatar, Button, blue } from "../../getUi";

export const FollowCard = ({ profiles }) => {
  return (
    <CardHeader
      sx={{ color: "white" }}
      avatar={
        <Avatar
          sx={{ bgcolor: blue[500] }}
          aria-label="recipe"
          src={profiles.avatar_url}
        >
          {profiles.username.charAt(0)}
        </Avatar>
      }
      action={<Button aria-label="settings">Follow</Button>}
      title={profiles.username}
      subheader="June 2022"
    />
  );
};
