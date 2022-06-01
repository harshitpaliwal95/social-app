import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  allPosts,
  createPost,
  editPost,
  userPosts,
} from "../../feature/posts/postSlice";
import { CircularLoader } from "../../hooks/circularLoader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: 300,
    md: 400,
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export const PostModal = ({ EditPostContent, postId }) => {
  const [content, setContent] = useState(EditPostContent);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const createPostHandler = async () => {
    setLoading(true);
    await dispatch(createPost({ content: content, authId: auth.userID }));
    await dispatch(allPosts("posts"));
    setLoading(false);
    setTimeout(() => {
      setOpen(false);
    }, 500);
  };

  const editPostHandler = async () => {
    setLoading(true);
    await dispatch(
      editPost({ userId: auth.userID, postId: postId, content: content })
    );
    await dispatch(userPosts(auth.userID));
    setLoading(false);
    setTimeout(() => {
      setOpen(false);
    }, 500);
  };

  return (
    <Box>
      {EditPostContent ? (
        <Typography onClick={handleOpen}>Edit Post</Typography>
      ) : (
        <AddIcon onClick={handleOpen} />
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: "10px 0",
            }}
          ></Box>

          <Typography
            id="modal-modal-title"
            variant="subtitle1"
            sx={{ color: "gray" }}
          >
            Post your thought
          </Typography>
          <TextField
            placeholder="Write here something cool !!!"
            fullWidth={true}
            value={content}
            multiline
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            sx={{
              height: "9rem",
              border: "none",
              marginTop: "5px",
            }}
          ></TextField>

          {EditPostContent ? (
            <Button
              variant="outlined"
              onClick={editPostHandler}
              sx={{ marginTop: "-2rem" }}
            >
              <CircularLoader loading={loading} text={"Edit Post"} />
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={createPostHandler}
              sx={{ marginTop: "-2rem" }}
            >
              <CircularLoader loading={loading} text={"post"} />
            </Button>
          )}
        </Box>
      </Modal>
    </Box>
  );
};
