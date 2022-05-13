import TextField from "@mui/material/TextField";
import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";

export const CreateNewPost = () => {
  return (
    <Box>
      <Box
        sx={{
          width: {
            xs: "20rem",
            sm:'40rem',
            md: "40rem",
            xl: "50rem",
          },
          height: "12.5rem",
          bgcolor: "#fff",
          marginTop: ".4rem",
          paddingTop: "1rem",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            marginLeft: {
              xs: "0rem",
              md: "2rem",
            },
          }}
        >
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
        <Box sx={{ marginRight:{xs:'0rem',md: "4rem"}, float: "right" }}>
          <Button variant="contained" endIcon={<SendIcon />}>
            Post
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
