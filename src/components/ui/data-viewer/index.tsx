import { Box, Stack, Typography } from "@mui/material";
import React from "react";

interface DataViewerProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  type?: "active" | "inactive";
}

export default function DataViewer({
  icon,
  title,
  value,
  type,
}: DataViewerProps) {
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
        <Box sx={{ color: "text.primary" }}>{icon}</Box>
        <Typography sx={{ color: "text.primary" }} variant="body1" gutterBottom>
          {title}
        </Typography>
      </Stack>
      {type ? (
        <Box>
          {type === "active" ? (
            <>
              <Stack direction="row" alignItems="center" ml="32px">
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "success.main",
                    borderRadius: "50%",
                  }}
                ></Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "success.main",
                    ml: "8px",
                    textTransform: "capitalize",
                  }}
                  variant="h5"
                >
                  {value}
                </Typography>
              </Stack>
            </>
          ) : (
            <>
              <Stack direction="row" alignItems="center" ml="32px">
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "error.main",
                    borderRadius: "50%",
                  }}
                ></Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "error.main",
                    ml: "8px",
                    textTransform: "capitalize",
                  }}
                  variant="h5"
                >
                  {value}
                </Typography>
              </Stack>
            </>
          )}
        </Box>
      ) : (
        <Typography
          sx={{
            fontSize: "20px",
            color: "grey.400",
            ml: "32px",
          }}
        >
          {value}
        </Typography>
      )}
    </Box>
  );
}
