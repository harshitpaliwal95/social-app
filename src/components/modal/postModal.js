import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { supabase } from "../../supabaseClient";
import { useSelector } from "react-redux";

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

export const PostModal = () => {
  const [content, setContent] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { auth } = useSelector((store) => store);

  const createPost = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([{ content: content, userId: auth.userID }]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <AddIcon onClick={handleOpen} />

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

          <Typography id="modal-modal-title" variant="subtitle1">
            Post your thought
          </Typography>
          <TextField
            placeholder="Write here something cool !!!"
            id="edit-bio-input"
            multiline
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            sx={{
              height: "9rem",
              border: "none",
              marginTop: "5px",
            }}
          ></TextField>

          <Button
            variant="outlined"
            onClick={createPost}
            sx={{ marginTop: "-2rem" }}
          >
            {"post"}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
