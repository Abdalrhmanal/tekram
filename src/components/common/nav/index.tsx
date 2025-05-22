"use client";
import { Box, Button } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

const nav = [
  { label: "welcome", href: "/welcome" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => pathname === href;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {nav.map((item, index) => (
        <Button
          key={index}
          onClick={() => router.push(item.href)}
          disableElevation
          sx={{
            p:0.5,
            pr: 1,
            pl: 1,
            borderRadius: "8px",
            fontSize: "18px",
            textTransform: "capitalize",
            color: "black",
            background: isActive(item.href)
              ? "linear-gradient(52.07deg, #2196F3 -7.59%, #ADC4D7 129.4%)"
              : "transparent",
            "&:hover": {
              background: !isActive(item.href) ? "blueShadow.main" : undefined,
              color: !isActive(item.href) ? "primary.main" : "black",
            },
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
}
