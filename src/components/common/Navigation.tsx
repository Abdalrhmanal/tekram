import { Box, Link } from "@mui/material";

export default function Navigation() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 5,
        flexGrow: 1,
        justifyContent: "start",
        color: "#414141",
        fontSize: "18px",
      }}
    >
      <Link
        href="#home"
        color="inherit"
        underline="hover"
        sx={{ fontWeight: "500" }}
      >
        Home
      </Link>
      <Link
        href="#about"
        color="inherit"
        underline="hover"
        sx={{ fontWeight: "500" }}
      >
        About us
      </Link>
      <Link
        href="#contact"
        color="inherit"
        underline="hover"
        sx={{ fontWeight: "500" }}
      >
        Contact
      </Link>
      <Link
        href="#pricing"
        color="inherit"
        underline="hover"
        sx={{ fontWeight: "500" }}
      >
        Pricing
      </Link>
    </Box>
  );
}
