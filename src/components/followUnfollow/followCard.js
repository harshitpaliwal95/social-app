import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  allUserProfile,
  followAcc,
  unFollowAcc,
} from "../../feature/profile/profileSlice";
import { CardHeader, Avatar, Button, blue } from "../../getUi";

export const FollowCard = ({ profiles, authId }) => {
  const [isFollowed, setIsfollowed] = useState(false);
  const [followText, setFollowText] = useState("Follow");
  const followObj = profiles.follow.find(
    (item) => item.userId === authId && item.followingId === profiles.id
  );

  useEffect(() => {
    setIsfollowed(followObj);
    setFollowText(() => (followObj ? "Unfollow" : "Follow"));
  }, [followObj]);

  const dispatch = useDispatch();
  const followHandler = async () => {
    if (!isFollowed) {
      setFollowText("Unfollow");
      await dispatch(followAcc({ userId: authId, followingId: profiles.id }));
    } else {
      setFollowText("Follow");
      await dispatch(unFollowAcc({ userId: authId, followingId: profiles.id }));
    }
    await dispatch(allUserProfile(authId));
  };

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
      action={
        <Button aria-label="settings" onClick={followHandler}>
          {followText}
        </Button>
      }
      title={profiles.username}
      subheader="June 2022"
    />
  );
};
