import { Box, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";

export default function DisplayBox({
  title,
  value,
  img,
}: {
  title: string;
  value: string;
  img: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flex: "1",
        gap: "10px",
        alignItems: "center",
        p: "10px 20px",
        borderRadius: "20px",
        bgcolor: "background.paper",
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
        <Image src={img} alt={title} width="50" height="50" />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            fontSize: "16px",
            fontFamily: "karla",
            color: "text.primary",
          }}
          variant="h6"
          component="h2"
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "24px",
            fontFamily: "karla",
            color: "text.primary",
          }}
          variant="body2"
          component="p"
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}
