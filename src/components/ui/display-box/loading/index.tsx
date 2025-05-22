import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";

export default function DisplayBoxLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        flex: "1",
        gap: "10px",
        alignItems: "center",
        p: "10px 20px",
        borderRadius: "20px",
        bgcolor: "transparent",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.04)",
        minWidth: "250px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Skeleton variant="circular" width={50} height={50} />
      </Box>
      <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <Skeleton />
        <Skeleton width="30%" />
      </Box>
    </Box>
  );
}
