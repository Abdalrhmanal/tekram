"use client";

import React, { useState } from "react";
import {
  Avatar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, Grid, useTheme,
} from "@mui/material";
import {
  Person, Settings, Close, Brightness7, Brightness4, KeyboardArrowDown, LogoutOutlined,
} from "@mui/icons-material";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import { useThemeContext } from "@/theme/context-them";
import { useRouter } from "next/navigation";
import useLogout from "@/hooks/logout";
import FormatTextdirectionRToL from "@mui/icons-material/FormatTextdirectionRToL";
import FormatTextdirectionLToR from "@mui/icons-material/FormatTextdirectionLToR";

export default function UserProfile({ data }: { data: any }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { toggleDarkMode, changeColor, mode, direction, setDirection } = useThemeContext();
  const { logout, loading, error } = useLogout();
  const router = useRouter();
  const theme = useTheme();

  const fullName = data?.fullName || "Guest";
  const username = data?.username || "Guest";
  const email = data?.email || "guest@sky.com";
  const avatar = data?.avatar || undefined;

  const colorOptions: { color: string; value: "blue" | "green" | "red" | "yellow" | "purple" | "darkBlue" }[] = [
    { color: "#50a6ea", value: "blue" },
    { color: theme.palette.success.main, value: "green" },
    { color: theme.palette.error.main, value: "red" },
    { color: "#ffeb3b", value: "yellow" },
    { color: theme.palette.secondary.main, value: "purple" },
    { color: "#1976d2", value: "darkBlue" },
  ];

  return (
    <>
      <Button
        onClick={() => setOpenDrawer(true)}
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
      >
        <Avatar variant="rounded" src={avatar} sx={{ width: 38, height: 38 }} />
        <Box>
          <Typography variant="body2" color="text.primary">
            {fullName}
          </Typography>
          <Typography variant="body2" color="primary.main">
            {username}
          </Typography>
        </Box>
      </Button>

      <IconButton
        onClick={() => setOpenDrawer(true)}
        sx={{ borderRadius: 2, width: 24, height: 24, bgcolor: "grey.100" }}
      >
        <KeyboardArrowDown sx={{ color: "primary.main" }} />
      </IconButton>

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          <IconButton onClick={() => setOpenDrawer(false)} sx={{ alignSelf: "flex-end", mb: 1 }}>
            <Close />
          </IconButton>

          <Stack alignItems="center" spacing={1} mb={2}>
            <Avatar src={avatar} sx={{ width: 80, height: 80 }} />
            <Typography variant="h6">{fullName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {email}
            </Typography>
          </Stack>

          <Divider />

          <Box sx={{ p: 1, bgcolor: "background.paper", borderRadius: 2 }}>
            <Grid container spacing={2}>
              {colorOptions.map(({ color, value }, index) => (
                <Grid size={4} key={index}>
                  <Button
                    onClick={() => changeColor(value)}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 3,
                      bgcolor: color,
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      "&:hover": { opacity: 0.8 },
                    }}
                  >
                    <SpaceDashboardRoundedIcon />
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ p: 1, bgcolor: "background.paper", borderRadius: 2 }}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                onClick={() => mode !== "light" && toggleDarkMode()}
                variant={mode === "light" ? "contained" : "outlined"}
                startIcon={<Brightness7 />}
                sx={{ borderRadius: 2 }}
              >
                Light
              </Button>
              <Button
                onClick={() => mode !== "dark" && toggleDarkMode()}
                variant={mode === "dark" ? "contained" : "outlined"}
                startIcon={<Brightness4 />}
                sx={{ borderRadius: 2 }}
              >
                Dark
              </Button>
            </Stack>
          </Box>
          <Divider sx={{ my: 2 }} />

          <Box sx={{ p: 1, bgcolor: "background.paper", borderRadius: 2 }}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant={direction === "rtl" ? "contained" : "outlined"}
                onClick={() => setDirection("rtl")}
                sx={{ borderRadius: 2 }}
                startIcon={<FormatTextdirectionRToL />}
              >
                RTL
              </Button>
              <Button
                variant={direction === "ltr" ? "contained" : "outlined"}
                onClick={() => setDirection("ltr")}
                sx={{ borderRadius: 2 }}
                startIcon={<FormatTextdirectionLToR />}
              >
                LTR
              </Button>
            </Stack>
          </Box>
          <Divider sx={{ my: 2 }} />

          <Box sx={{ p: 1, bgcolor: "background.paper", borderRadius: 2 }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton onClick={() => router.push("/settings")}>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Account settings" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>

        <Box>
          <Button
            startIcon={<LogoutOutlined />}
            variant="contained"
            fullWidth
            sx={{ borderRadius: 2, py: 2, justifyContent: "start", px: 3 }}
            onClick={logout}
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
          </Button>
          {error && (
            <Typography color="error.main" mt={2} textAlign="center">
              {error}
            </Typography>
          )}
        </Box>
      </Drawer>
    </>
  );
}