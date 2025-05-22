import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";

export default function DataViewerLoading() {
  return (
    <Box sx={{}}>
      <Stack
        sx={{
          alignItems: "center",
          fontSize: "16px",
        }}
        direction="row"
        spacing={1}
      >
        <Skeleton variant="circular" width={24} height={22} />
        <Typography sx={{ color: "#414141" }} variant="body1" gutterBottom>
          <Skeleton width={200} />
        </Typography>
      </Stack>
      <Typography
        sx={{
          color: "#717680",
          ml: 4,
        }}
      >
        <Skeleton width={150} />
      </Typography>
    </Box>
  );
}
