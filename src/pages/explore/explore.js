import { Box } from "@mui/system";
import { BasicTabs } from "./basicTabs";

export const Explore = () => {
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
        <BasicTabs />
      </Box>
    </Box>
  );
};
