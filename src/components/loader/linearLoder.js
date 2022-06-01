import { Box, LinearProgress } from "../../getUi";

export const LinearLoder = () => {
  return (
    <Box
      sx={{
        marginInline: "auto",
        width: "30rem",
        marginTop: "8rem",
      }}
    >
      <LinearProgress />
    </Box>
  );
};
