import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinearLoder, PostCard } from "../../components";
import { getBookmarkPost } from "../../feature/posts/postSlice";

export const Bookmark = () => {
  const { posts, auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookmarkPost(auth.userID));
  }, []);

  return (
    <Box sx={{ marginTop: "4.6rem" }}>
      {posts.bookmark === null ? (
        <LinearLoder />
      ) : (
        posts.bookmark.map((data) => (
          <PostCard key={data.postId} data={data} authId={auth.userID} />
        ))
      )}
    </Box>
  );
};
