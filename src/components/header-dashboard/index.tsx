"use client";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Notification from "../notifications";
import SelectLanguage from "../language-select";
import UserProfile from "../user-profile";
import { useThemeContext } from "@/theme/context-them";
import Cookies from "js-cookie";
import { useTheme } from "@mui/material/styles";

const Header: FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const theme = useTheme();
  useEffect(() => {
    const userCookie = Cookies.get("user_data");
    if (userCookie) {
      const parsedUserData = JSON.parse(decodeURIComponent(userCookie));
      setUserData(parsedUserData);
    }
  }, []);

  return (
    <AppBar
      color="inherit"
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.05)",
        padding: "0 16px",
      }}
    >
      <Toolbar>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {/* Logo Section */}
          <Grid
            size={3}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Image
                src="/images/logo.png"
                alt="logo"
                width={50}
                height={50}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "primary.main", whiteSpace: "nowrap" }}
              >
                Tekram
              </Typography>
            </Box>
          </Grid>

          {/* Search Bar Section */}
          <Grid
            size={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              sx={{
                p: "2px 8px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                maxWidth: "400px",
                backgroundColor: "grey.100",
                borderRadius: 2,
                border: "1px solid #E0E0E0",
                height: "40px",
              }}
            >
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                  fontSize: "14px",
                  "& input::placeholder": {
                    color: "grey.400",
                    opacity: 1,
                  },
                }}
                placeholder="Search in Tekram"
                inputProps={{ "aria-label": "search in Tekram" }}
              />
              <IconButton
                type="button"
                sx={{ p: "10px", color: "grey.400" }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Right Controls Section */}
          <Grid
            size={5}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Notification />
            <SelectLanguage />

            <UserProfile data={userData} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;