import TextField from "@mui/material/TextField";
import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";

export const NewPost = () => {
  return (
    <Box>
      <Box
        sx={{
          width: "40rem",
          height: "12.5rem",
          bgcolor: "#fff",
          marginTop: ".4rem",
          paddingTop: "1rem",
          borderRadius: "10px",
        }}
      >
        <Box sx={{ display: "flex", marginLeft: "2rem" }}>
          <Avatar sx={{ bgcolor: "#1d9bf0", marginRight: ".4rem" }}>H</Avatar>
          <TextField
            placeholder="Whats your thought"
            id="post"
            multiline
            rows={4}
            sx={{
              width: "25ch",

              height: "9rem",
              border: "none",
              alignItems: "flex-start",
            }}
          ></TextField>
        </Box>
        <Box sx={{ marginRight: "4rem", float: "right" }}>
          <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
