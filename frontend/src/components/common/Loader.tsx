import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface LoaderProps {
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ fullScreen = false }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={fullScreen ? "100vh" : "200px"}
      width="100%"
    >
      <CircularProgress />
    </Box>
  );
};
