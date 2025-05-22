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
        src="/images/logo/logo.png"
        alt="Logo Melo"
        width={40}
        height={40}
      />
      <Typography
        variant="body1"
        sx={{
          fontSize: "24px",
          // fontWeight: "600",
          color: "primary.main",
        }}
      >
        MELO
      </Typography>
    </Box>
  );
}
