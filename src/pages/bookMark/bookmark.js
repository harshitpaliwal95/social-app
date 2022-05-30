import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { LinearLoder, PostCard } from "../../components";

export const Bookmark = () => {
  const { posts, auth } = useSelector((store) => store);

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
