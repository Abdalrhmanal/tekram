"use client";
import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import { Menu, MenuItem } from "@mui/material";

export default function Notification() {
  const [notificationsAnchorEl, setNotificationsAnchorEl] =
    useState<null | HTMLElement>(null);

  const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleNotificationsClick}>
        <NotificationsIcon sx={{ color: "#2196F3" }} />
      </IconButton>
      <Menu
        anchorEl={notificationsAnchorEl}
        open={Boolean(notificationsAnchorEl)}
        onClose={handleNotificationsClose}
      >
        <MenuItem onClick={handleNotificationsClose}>Notification 1</MenuItem>
        <MenuItem onClick={handleNotificationsClose}>Notification 2</MenuItem>
        <MenuItem onClick={handleNotificationsClose}>Notification 3</MenuItem>
      </Menu>
    </>
  );
}
