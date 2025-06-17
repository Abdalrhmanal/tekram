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
    useMediaQuery,
    useTheme,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    BottomNavigation,
    BottomNavigationAction,
} from "@mui/material";
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import Notification from "../notifications";
import SelectLanguage from "../language-select";
import UserProfile from "../user-profile";
import { useThemeContext } from "@/theme/context-them";
import Cookies from "js-cookie";
import DrawerSettingUser from "../user-profile/drawer-setting";
import NavigationProvider, { nav } from "./nav-bottens";
import { usePathname, useRouter } from "next/navigation";

const HeaderProvider: FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const fullName = userData?.fullName || "Guest";
    const email = userData?.email || "guest@sky.com";
    const avatar = userData?.avatar || undefined;
    const pathname = usePathname();
    const router = useRouter();
    const [value, setValue] = useState(pathname);

    // للتحقق من العنصر النشط
    const isActive = (href: string) => pathname === href;
    useEffect(() => {
        const userCookie = Cookies.get("user_data");
        if (userCookie) {
            const parsedUserData = JSON.parse(decodeURIComponent(userCookie));
            setUserData(parsedUserData);
        }
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

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
                {isMobile ? (
                    <Box>
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                justifyContent: "space-between",
                                padding: "16px 0",
                            }}
                        >
                            <Grid
                                size={6}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <IconButton onClick={handleDrawerToggle}>
                                        <SortOutlinedIcon />
                                    </IconButton>
                                    <Notification />
                                </Box>
                            </Grid>
                            <Grid
                                size={6}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: theme.direction === "rtl" ? "flex-start" : "flex-end",
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "end", justifyContent: "flex-end", direction: theme.direction, gap: 2 }}>
                                    <Image
                                        src="/images/logo.png"
                                        alt="logo"
                                        width={40}
                                        height={40}
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
                        </Grid>
                        <Drawer
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                        >
                            <DrawerSettingUser fullName={fullName} email={email} avatar={avatar} onCloseDrawer={() => setMobileOpen(false)} />
                        </Drawer>
                        <Box
                            sx={{
                                position: "fixed",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 1301, // أعلى من Drawer (عادة z-index للـ Drawer هو 1200)
                                backgroundColor: theme.palette.background.paper,
                                boxShadow: "0px -2px 5px rgba(0,0,0,0.1)",
                            }}
                        >
                            <BottomNavigation
                                showLabels
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                    router.push(newValue);
                                }}
                            >
                                {nav.map((item, index) => (
                                    <BottomNavigationAction
                                        key={index}
                                        value={item.href}
                                        icon={item.icon}
                                        sx={{
                                            color: isActive(item.href) ? "white" : "black",
                                            background: isActive(item.href)
                                                ? "linear-gradient(52.07deg, #2196F3 -7.59%, #ADC4D7 129.4%)"
                                                : "transparent",
                                            "&:hover": {
                                                background: !isActive(item.href) ? "#E3F2FD" : undefined,
                                                color: !isActive(item.href) ? "primary.main" : "white",
                                            },
                                            borderRadius: 1,
                                            mx:0.75,
                                            minWidth: 46.5,
                                        }}
                                    />
                                ))}
                            </BottomNavigation>
                        </Box>
                    </Box>
                ) : (
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
                        <Grid
                            size={2}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <SortOutlinedIcon />
                                <Notification />
                            </Box>
                        </Grid>
                        <Grid
                            size={8}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                p: 1,
                            }}
                        >
                            <NavigationProvider />
                        </Grid>
                        <Grid
                            size={2}
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                gap: 3,
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
                    </Grid>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default HeaderProvider;
