import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

import { supabase } from "../../supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../feature/profile/profileSlice";

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
    userName: "",
    userBio: "",
    userWebsite: "",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const updateUserInfo = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          username: userData.userName,
          user_bio: userData.userBio,
          website: userData.userWebsite,
        })
        .eq("id", auth.userID);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(userProfile(auth.userID));
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

          <Box>
            <TextField
              id="edit-bio-input"
              label="User Name"
              variant="outlined"
              onChange={(e) =>
                setData((pre) => ({ ...pre, userName: e.target.value }))
              }
            />

            <TextField
              sx={{ marginTop: "1rem" }}
              id="edit-bio-input"
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
            id="edit-bio-input"
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
