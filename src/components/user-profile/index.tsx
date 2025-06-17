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
import DrawerSettingUser from "./drawer-setting";

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
        <DrawerSettingUser fullName={fullName} email={email} avatar={avatar}  onCloseDrawer={() => setOpenDrawer(false)}/>
      </Drawer>
    </>
  );
}