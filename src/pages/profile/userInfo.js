import Link from "@mui/material/Link";
import { Avatar, Typography } from "@mui/material";
import { UserModalBox } from "../../components";

export const UserInfo = ({ auth }) => {
  return (
    <>
      <Avatar
        alt={auth.userName}
        src="/static/images/avatar/1.jpg"
        sx={{ width: 100, height: 100 }}
      />
      <Typography variant="h5" mt={2}>
        {auth.userName}
      </Typography>
      <Typography mt={0} sx={{ fontSize: ".7rem" }}>
        @{auth.userName}
      </Typography>
      <Typography>3 post | 30 Followers</Typography>
      <Typography mt={4} sx={{ maxWidth: "50ch", textAlign: "center" }}>
        I'm a developer skilled in JavaScript, React, and Web technologies. I
        like to ideate and build products by leveraging my problem-solving &
        programming skills.
      </Typography>
      <Link href="#" underline="none" mt={1}>
        {"harshit.in"}
      </Link>
      <UserModalBox inputText="Edit Bio" modalFor="editProfile" />
    </>
  );
};
