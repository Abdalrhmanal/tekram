"use client";
import { Box, Button } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

// استيراد الأيقونات
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import MiscellaneousServicesOutlinedIcon from "@mui/icons-material/MiscellaneousServicesOutlined";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
export const nav = [
  { label: "Dashboard", icon: <DashboardOutlinedIcon fontSize="medium" />, href: "/dashboard" },
  { label: "Wallet", icon: <AccountBalanceWalletOutlinedIcon fontSize="medium" />, href: "/wallet" },
  { label: "Reservation Requests", icon: <EventAvailableOutlinedIcon fontSize="medium" />, href: "/reservation-requests" },
  { label: "Reservations", icon: <BookOnlineOutlinedIcon fontSize="medium" />, href: "/bookings" },
  { label: "Community", icon: <GroupsOutlinedIcon fontSize="medium" />, href: "/community" },
  { label: "My Services", icon: <MiscellaneousServicesOutlinedIcon fontSize="medium" />, href: "/my-services" },
];

export default function NavigationProvider() {
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 1,
            minWidth: 90,
            borderRadius: "12px",
            fontSize: "14px",
            textTransform: "capitalize",
            color: isActive(item.href) ? "white" : "black",
            background: isActive(item.href)
              ? "linear-gradient(52.07deg, #2196F3 -7.59%, #ADC4D7 129.4%)"
              : "transparent",
            "&:hover": {
              background: !isActive(item.href) ? "#E3F2FD" : undefined,
              color: !isActive(item.href) ? "primary.main" : "white",
            },
          }}
        >
          {item.icon}
          {item.label}
        </Button>
      ))}
    </Box>
  );
}
