import { Box, Button, Typography, Modal, TextField } from "../../getUi";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../feature/profile/profileSlice";
import { UploadButtons } from "./uploadButton";
import { toast } from "react-toastify";

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

export const UserModalBox = () => {
  const [userData, setData] = useState({
    userName: null,
    userBio: null,
    userWebsite: null,
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { auth, profile } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(null);

  const updateUserInfo = async () => {
    try {
      const { data } = await supabase
        .from("profiles")
        .update({
          username: userData.userName ?? profile.userName,
          user_bio: userData.userBio ?? profile.userBio,
          website: userData.userWebsite ?? profile.userPortfolio,
          avatar_url: avatar ?? profile.userAvtar,
        })
        .eq("id", auth.userID);
      if (data) {
        toast.success("Profile updated 🥳");
        dispatch(userProfile(auth.userID));
      }
    } catch (error) {
      toast.success("Unable to update profile!");
      console.log(error);
    }
  };

  return (
    <Box>
      <Button
        onClick={handleOpen}
        variant="outlined"
        sx={{ marginTop: "1rem" }}
      >
        Edit Profile
      </Button>

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
          <Box mb={1} sx={{ color: "gray" }}>
            upload avatar
            <UploadButtons setAvatar={setAvatar} />
          </Box>
          <Box>
            <TextField
              fullWidth={true}
              label="User Name"
              variant="outlined"
              onChange={(e) =>
                setData((pre) => ({ ...pre, userName: e.target.value }))
              }
            />

            <TextField
              sx={{ marginTop: "1rem" }}
              fullWidth={true}
              label="Add Portfolio"
              variant="outlined"
              onChange={(e) =>
                setData((pre) => ({ ...pre, userWebsite: e.target.value }))
              }
            />
          </Box>
          <Typography id="modal-modal-title" variant="subtitle1">
            add bio
          </Typography>
          <TextField
            placeholder="Write here something cool !!!"
            fullWidth={true}
            multiline
            onChange={(e) =>
              setData((pre) => ({ ...pre, userBio: e.target.value }))
            }
            rows={3}
            sx={{
              height: "9rem",
              border: "none",
              marginTop: "5px",
            }}
          ></TextField>
          <Button
            variant="outlined"
            onClick={updateUserInfo}
            sx={{ marginTop: "-2rem" }}
          >
            {"Update"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
