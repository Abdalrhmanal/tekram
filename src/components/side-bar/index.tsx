"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useFetchData from "@/hooks/get-global";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  DeleteOutline,
} from "@mui/icons-material";
import Image from "next/image";
import useDeleteData from "@/hooks/delete-global";
import { menuItemsAll } from "./using-sidebar";

interface MenuData {
  id: string;
  parent_id?: string | null;
  title: string;
  url?: string;
  logo?: string;
  children?: MenuData[];
}

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuData[]>([]);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  /*  const { data: menuResponse, refetch } = useFetchData<{
     message: string;
     data: MenuData[];
   }>({
     dataSourceName: "api/menu-links",
   });
  */
   //setMenuItems(menuItemsAll);
  console.log("menuResponse",menuItems);
  
  const { deleteData, isLoading: isDeleting } = useDeleteData({
    dataSourceName: "api/menu-links",
  });

  /*   useEffect(() => {
      if (menuResponse?.data ) {
        setMenuItems(menuResponse.data);
      }
    }, [menuResponse]);
   */

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  const handleNavigate = (url?: string) => {
    if (url) router.push(url);
  };

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getFullImageUrl = (path: string) => {
    return path.startsWith("http") ? path : `https://example.com${path}`;
  };

  const renderMenu = (items: MenuData[], level = 0) => {
    return items.map((item) => {
      const isExpanded = expandedItems[item.id] || false;
      const hasChildren = item.children && item.children.length > 0;
      const isActive = activeItem === item.url;
      
      return (
        <Box
          key={item.id}
          sx={
            {
              // ml: level * 2
            }
          }
        >
          <Tooltip title={!open ? item.title : ""} placement="right">
            <ListItem
              onClick={() =>
                hasChildren ? toggleExpand(item.id) : handleNavigate(item.url)
              }
              sx={{
                borderRadius: 2,
                mb: "4px",
                bgcolor: isActive ? "#ddecff" : "transparent",
                color: isActive ? "blueShadow.main" : "text.primary",
                p: 1,
                justifyContent: open ? "flex-start" : "center",
                "&:hover": {
                  bgcolor: "primary.light",
                  color: "primary.main",
                  cursor: "pointer",
                },
                minHeight: 48,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1.5 : 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 32,
                  height: 32,
                }}
              >
               {/*  {item.logo && (
                  <Image
                    src={getFullImageUrl(item.logo)}
                    alt={item.title}
                    width={20}
                    height={20}
                    quality={100}
                    style={{
                      objectFit: "contain",
                      // color: "primary.main"
                    }}
                  />
                )} */}
              </ListItemIcon>

              {open && <ListItemText primary={item.title} />}
              {open && (
                <IconButton
                  sx={{
                    ml: "auto",
                    color: "error.main",
                    "&:hover": {
                      bgcolor: "gray.300",
                    },
                  }}
                  onClick={() => {
                    deleteData(item.id);
                    // refetch();
                  }}
                >
                  {isDeleting ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <DeleteOutline />
                  )}
                </IconButton>
              )}
              {hasChildren &&
                open &&
                (isExpanded ? (
                  <ExpandLess
                    sx={{
                      borderRadius: "6px",
                      fontSize: "18px",
                      "&:hover": { bgcolor: "gray.300" },
                    }}
                  />
                ) : (
                  <ExpandMore
                    sx={{
                      borderRadius: "6px",
                      fontSize: "18px",
                      "&:hover": { bgcolor: "gray.300" },
                    }}
                  />
                ))}
            </ListItem>
          </Tooltip>
          {hasChildren && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List disablePadding>
                {renderMenu(item.children!, level + 1)}
              </List>
            </Collapse>
          )}
        </Box>
      );
    });
  };

  return (
    <Box
      sx={{
        width: open ? 260 : 80,
        transition: "width 0.3s",
        backgroundColor: "background.paper",
        boxShadow: "2px 0px 10px rgba(0,0,0,0.1)",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        p: 2,
        mb: 2,
        ml: 2,
        mr: 2,
        overflowY: "auto",
        scrollbarWidth: "none", // For Firefox
        "&::-webkit-scrollbar": {
          display: "none", // For Chrome, Safari, and Edge
        },
      }}
    >
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{ alignSelf: open ? "flex-end" : "center" }}
      >
        <MenuIcon />
      </IconButton>

      <List sx={{ flexGrow: 1, mt: 1 }}>
        {!menuItemsAll || isDeleting ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          renderMenu(menuItemsAll.map((item, index) => ({
                                id: `generated-id-${index}`,
                                title: item.text,
                                url: item.href,
                                logo: item.icon ? String(item.icon) : undefined,
                                children: item.children?.map((child, childIndex) => ({
                                  id: `generated-id-${index}-${childIndex}`,
                                  title: child.text,
                                  url: child.href,
                                  logo: child.icon ? String(child.icon) : undefined,
                                  children: child.children?.map((grandChild, grandChildIndex) => ({
                                    id: `generated-id-${index}-${childIndex}-${grandChildIndex}`,
                                    title: grandChild.text,
                                    url: grandChild.href,
                                    logo: grandChild.icon ? String(grandChild.icon) : undefined,
                                    children: [],
                                  })) || [],
                                })) || [],
                              })))
        )}
      </List>

      {/* <Box
        sx={{
          mt: 4,
        }}
      >
        <Tooltip title={!open ? "Dark Mode" : ""} placement="right">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: open ? "space-between" : "center",
              mb: 2,
            }}
          >
            {open && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <DarkModeOutlinedIcon />
                <Typography variant="body2">Dark Mode</Typography>
              </Box>
            )}
            <FormControlLabel
              control={
                <Switch checked={mode === "dark"} onChange={toggleDarkMode} />
              }
              label=""
              sx={{ m: 0 }}
            />
          </Box>
        </Tooltip>

        <Tooltip title={!open ? "Logout" : ""} placement="right">
          <ListItem
            onClick={logout}
            sx={{
              cursor: "pointer",
              borderRadius: 2,
              bgcolor: "primary.main",
              color: "#fff",
              justifyContent: open ? "flex-start" : "center",
              px: open ? 2 : 1,
              py: 1.5,
            }}
          >
            <LogoutOutlined sx={{ mr: open ? 1 : 0 }} />
            {open && (
              <ListItemText primary={loading ? "Logging out..." : "Logout"} />
            )}
          </ListItem>
        </Tooltip>
      </Box> */}
    </Box>
  );
};

export default Sidebar;
