import { CircularProgress } from "@mui/material";

export const CircularLoader = ({ loading, text }) => {
  return loading ? <CircularProgress size={25} /> : text;
};
