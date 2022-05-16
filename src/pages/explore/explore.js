import { PostCard } from "../../components";
import { Box } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const CategoryRadioButton = () => {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="New Post" />
        <FormControlLabel value="male" control={<Radio />} label="Older Post" />
        <FormControlLabel value="other" control={<Radio />} label="All" />
      </RadioGroup>
    </FormControl>
  );
};

export const Explore = () => {
  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <CategoryRadioButton />
      </Box>

      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </Box>
  );
};
