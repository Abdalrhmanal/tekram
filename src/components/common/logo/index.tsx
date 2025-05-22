import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Image
        src="/images/logo/icon.svg"
        alt="Logo Melo"
        width="30"
        height="30"
      />
      <Typography
        variant="body1"
        sx={{
          fontSize: "24px",
          fontWeight: "600",
          color: "#2196F3",
        }}
      >
        Melo
      </Typography>
    </Box>
  );
}
