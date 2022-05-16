import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AddIcon from "@mui/icons-material/Add";

const Input = styled("input")({
  display: "none",
});

const UploadButtons = () => {
  return (
    <label htmlFor="icon-button-file">
      <Input accept="image/*" id="icon-button-file" type="file" />
      <IconButton color="primary" aria-label="upload picture" component="span">
        <PhotoCamera />
      </IconButton>
    </label>
  );
};

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

export const ModalBox = ({ imgText, inputText, modalFor }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      {modalFor === "newPost" ? (
        <AddIcon onClick={handleOpen} />
      ) : (
        <Button
          onClick={handleOpen}
          variant="outlined"
          sx={{ marginTop: "1rem" }}
        >
          Edit Profile
        </Button>
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
          >
            <Typography>{imgText}</Typography>
            <UploadButtons />
          </Box>

          <Typography id="modal-modal-title" variant="subtitle1">
            {inputText}
          </Typography>
          <TextField
            placeholder="Write here something cool !!!"
            id="edit-bio-input"
            multiline
            rows={3}
            sx={{
              height: "9rem",
              border: "none",
              marginTop: "5px",
            }}
          ></TextField>
          <Button variant="outlined" sx={{ marginTop: "-2rem" }}>
            {modalFor === "newPost" ? "post" : "Update"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
