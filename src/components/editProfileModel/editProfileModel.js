import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export const EditProfileModel = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
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
          <Typography id="modal-modal-title" variant="subtitle1" >
            Edit your Bio
          </Typography>
          <TextField
            placeholder="Write here something cool !!!"
            id='edit-bio-input'
            multiline
            rows={3}
            sx={{
              height: "9rem",
              border: "none",
              marginTop:'5px'
            }}
          ></TextField>
          <Button variant="outlined" sx={{marginTop:'-2rem'}}>Change</Button>
        </Box>
      </Modal>
    </div>
  );
};
