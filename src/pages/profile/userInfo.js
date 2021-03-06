import Link from "@mui/material/Link";
import { Avatar, Typography } from "../../getUi";
import { UserModalBox } from "../../components";
import { useSelector } from "react-redux";

export const UserInfo = () => {
  const { auth, profile, posts } = useSelector((store) => store);
  return (
    <>
      <Avatar
        alt={profile.userName ?? auth.userName}
        src={profile.userAvtar}
        sx={{ width: 100, height: 100 }}
      />
      <Typography variant="h5" mt={2}>
        {profile.userName ?? auth.userName}
      </Typography>
      <Typography mt={0} sx={{ fontSize: ".7rem" }}>
        @{profile.userName ?? auth.userName}
      </Typography>
      <Typography>
        {posts.userPosts ? posts.userPosts.length : null} post
      </Typography>
      <Typography mt={2} sx={{ maxWidth: "50ch", textAlign: "center" }}>
        {profile.userBio}
      </Typography>
      <Link href={profile.userPortfolio} underline="none" mt={1}>
        {profile.userPortfolio}
      </Link>
      <UserModalBox inputText="Edit Bio" modalFor="editProfile" />
    </>
  );
};
