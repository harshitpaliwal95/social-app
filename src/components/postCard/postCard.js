import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { supabase } from "../../supabaseClient";
import { Favorite } from "@mui/icons-material";
import { Box, Button, Input } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const PostCard = ({ data, authId }) => {
  const { content, created_at, profiles, id, likes } = data;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [isLikeActive, setLikeActice] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const postLikes = likes.find(
    (obj) => obj.postId === id && obj.userId === authId
  );
  useEffect(() => {
    setLikeActice(postLikes);
  }, [postLikes]);

  const likePost = async () => {
    try {
      if (!isLikeActive) {
        const { data, error } = await supabase.from("likes").insert([
          {
            postId: id,
            userId: authId,
          },
        ]);
        if (data) {
          setLikeActice(true);
          setLikeCount(1);
        }
        if (error) {
          throw error;
        }
      } else {
        await supabase
          .from("likes")
          .delete()
          .eq("postId", id)
          .eq("userId", authId);
        setLikeActice(false);
        setLikeCount(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: {
          xs: 356,
          md: 600,
          xl: 800,
        },
        marginInline: "auto",
        marginTop: "1rem",
      }}
    >
      <CardHeader
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
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={profiles.username}
        subheader={created_at}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={likePost}>
          {isLikeActive ? <Favorite /> : <FavoriteBorderOutlinedIcon />}

          <Typography sx={{ marginLeft: "3px" }}>
            {likes.length + likeCount}
          </Typography>
        </IconButton>
        <IconButton aria-label="add to bookmark">
          <BookmarkBorderOutlinedIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box sx={{ marginBottom: "2rem" }}>
            <Input placeholder="Your opinion" id="edit-bio-input" />
            <Button sx={{ marginLeft: "7rem" }} variant="outlined">
              Reply
            </Button>
          </Box>
          {/* comments */}
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe" src={""} />
            <Box sx={{ marginLeft: "5px" }}>
              <Typography sx={{ marginBottom: "-6px" }}>user name</Typography>
              <Typography variant="caption">yes today is super cool</Typography>
            </Box>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};
