import { PostCard, LinearLoder } from "../../components";
import { Box } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useSelector } from "react-redux";

const CategoryRadioButton = () => {
  return (
    <FormControl sx={{ marginInline: "auto" }}>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="New Post" />
        <FormControlLabel value="male" control={<Radio />} label="Older Post" />
        <FormControlLabel
          value="other"
          control={<Radio />}
          label="New connection"
        />
      </RadioGroup>
    </FormControl>
  );
};

export const Explore = () => {
  const { auth, posts } = useSelector((store) => store);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "4rem",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            position: { xs: "unset", md: "fixed" },
            top: "8rem",
            left: "5rem",
          }}
        >
          <CategoryRadioButton />
        </Box>
        <Box sx={{ widht: "40rem" }}>
          {posts.allPosts === null ? (
            <LinearLoder />
          ) : (
            posts.allPosts.map((data) => (
              <PostCard key={data.id} data={data} authId={auth.userID} />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};
