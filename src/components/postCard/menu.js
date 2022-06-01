import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { deletePost, userPosts } from "../../feature/posts/postSlice";
import { PostModal } from "../modal/postModal";

export const MenuComp = ({ postId, userId, content }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const deletePostHandler = async () => {
    await dispatch(deletePost({ postId: postId, userId: userId }));
    await dispatch(userPosts(userId));
  };

  return (
    <div>
      <MoreVertIcon onClick={handleClick} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <PostModal EditPostContent={content} postId={postId} />
        </MenuItem>
        <MenuItem onClick={deletePostHandler}>Delete Post</MenuItem>
      </Menu>
    </div>
  );
};
