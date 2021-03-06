import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  styled,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  blue,
  FavoriteBorderOutlinedIcon,
  BookmarkBorderOutlinedIcon,
  ShareIcon,
  ExpandMoreIcon,
  Bookmark,
  Favorite,
} from "../../getUi";

import { supabase } from "../../supabaseClient";
import { useDispatch } from "react-redux";
import {
  allPosts,
  bookmarkPost,
  commentPost,
  getBookmarkPost,
  removeBookmark,
  userPosts,
} from "../../feature/posts/postSlice";
import { Comments } from "./comments";
import { CircularLoader } from "../../hooks/circularLoader";
import { MenuComp } from "./menu";

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
  const {
    content,
    created_at,
    profiles,
    id,
    userId,
    likes,
    comments,
    bookmark,
  } = data;
  const [expanded, setExpanded] = useState(false);
  const [isLikeActive, setLikeActice] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBookmarkActive, setBookmarkAvtice] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const findObj = (type) => {
    return type.find((obj) => obj.postId === id && obj.userId === authId);
  };

  const postLikes = findObj(likes);
  const isBookmark = findObj(bookmark);

  const dispatch = useDispatch();

  useEffect(() => {
    setLikeActice(postLikes);
    setBookmarkAvtice(isBookmark);
  }, [postLikes, isBookmark]);

  const commentHandler = async () => {
    setLoading(true);
    await dispatch(
      commentPost({
        userId: authId,
        postId: id,
        comment: commentText,
      })
    );
    await dispatch(allPosts());
    await dispatch(userPosts(authId));
    setLoading(false);
  };

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
        setLikeCount((pre) => (pre === 1 ? 0 : -1));
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const bookmarkHandler = async () => {
    if (!isBookmarkActive) {
      await dispatch(bookmarkPost({ postId: id, userId: authId }));
      setBookmarkAvtice(true);
    } else {
      await dispatch(removeBookmark({ postId: id, userId: authId }));
      setBookmarkAvtice(false);
    }
    await dispatch(getBookmarkPost(authId));
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
            {authId === userId && (
              <MenuComp postId={id} userId={authId} content={content} />
            )}
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
        <IconButton aria-label="add to bookmark" onClick={bookmarkHandler}>
          {isBookmarkActive ? <Bookmark /> : <BookmarkBorderOutlinedIcon />}
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
          <Box sx={{ marginBottom: "2rem", display: "flex" }}>
            <Input
              placeholder="Your opinion"
              fullWidth={true}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button
              sx={{ marginLeft: "2rem" }}
              variant="outlined"
              onClick={commentHandler}
              disabled={loading}
            >
              <CircularLoader loading={loading} text={"Reply"} />
            </Button>
          </Box>
          {/* comments */}
          {comments.length !== 0 ? (
            comments.map((item) => (
              <Comments
                key={item.comment_id}
                username={item.profiles.username}
                avatartUrl={item.profiles.avatar_url}
                comment={item.comment}
              />
            ))
          ) : (
            <Typography>No comments yet</Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};
