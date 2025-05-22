"use client";
import { AppBar, Box, Button, Grid, Toolbar } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Navigation from "../common/nav";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // دالة لتحديد ما إذا كان الزر نشطًا
  const isActive = (path: string) => pathname === path;

  // أنماط الزر الافتراضي
  const baseButtonStyle = {
    padding: "10px 18px",
    borderRadius: "8px",
    textTransform: "capitalize",
    border: "1px solid transparent",
    color: "#FBFBFB",
    background: "#2196F3", // خلفية ثابتة للأزرار غير النشطة
    transition: "all 0.3s ease",
    fontWeight: 500,
    "&:hover": {
      background: "linear-gradient(52.07deg, #2196F3 -7.59%, #ADC4D7 129.4%)",
    },
  };

  // أنماط الزر النشط
  const activeButtonStyle = {
    background: "linear-gradient(52.07deg, #2196F3 -7.59%, #ADC4D7 129.4%)",
  };

  return (
    <AppBar
      position="static"
      sx={{
        padding: "0 32px",
        backgroundColor: "transparent",
        boxShadow: "none",
        mt: 2,
      }}
    >

      <Grid container alignItems="center">
        {/* الشعار */}
        <Grid size={2}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={60}
              height={50}
            />
          </Box>
        </Grid>

        {/* الروابط */}
        <Grid size={8}>
          <Box sx={{
            display: "flex", gap: 2, justifyContent: "center", alignItems: "center",
            borderRadius: 2, backgroundColor: '#fff',p:0.8
          }}>
            <Navigation />
          </Box>
        </Grid>

        {/* الأزرار */}
        <Grid size={2}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              sx={{
                ...baseButtonStyle,
                ...(isActive("/login") ? activeButtonStyle : {}),
              }}
              onClick={() => router.push("/login")}
            >
              Log in
            </Button>
            <Button
              sx={{
                ...baseButtonStyle,
                ...(isActive("/register") ? activeButtonStyle : {}),
              }}
              onClick={() => router.push("/register")}
            >
              Sign up
            </Button>
          </Box>
        </Grid>
      </Grid>

    </AppBar>
  );
}
