"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { menuItemsAll } from "./using-sidebar";

interface MenuData {
  id: string;
  parent_id?: string | null;
  title: string;
  url?: string;
  logo?: React.ReactNode;
  children?: MenuData[];
}

const Sidebar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  const handleNavigate = (url?: string) => {
    if (url) router.push(url);
  };

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderMenu = (items: MenuData[], level = 0, parentId?: string) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedItems[item.id] || false;
      const isActive = activeItem === item.url;
      const isParentHighlighted = expandedItems[item.id];

      return (
        <Box key={item.id}>
          <Tooltip title={!open ? item.title : ""} placement="right">
            <ListItem
              onClick={() =>
                hasChildren ? toggleExpand(item.id) : handleNavigate(item.url)
              }
              sx={{
                borderRadius: 2,
                mb: "4px",
                position: "relative",
                bgcolor: isActive
                  ? theme.palette.primary.light
                  : isParentHighlighted || expandedItems[parentId || ""]
                  ? theme.palette.action.selected
                  : "transparent",
                color: isActive
                  ? theme.palette.primary.contrastText
                  : theme.palette.text.primary,
                p: 1,
                justifyContent: open ? "flex-start" : "center",
                "&:hover": {
                  bgcolor: theme.palette.action.hover,
                  color: theme.palette.primary.main,
                  cursor: "pointer",
                },
                minHeight: 48,
                ...(isActive && {
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "4px",
                    backgroundColor: theme.palette.primary.main,
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                  },
                }),
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
                  color: isActive
                    ? theme.palette.primary.main
                    : theme.palette.text.primary,
                }}
              >
                {item.logo}
              </ListItemIcon>

              {open && <ListItemText primary={item.title} />}
              {hasChildren && open && (
                isExpanded ? (
                  <ExpandLess
                    sx={{
                      borderRadius: "6px",
                      fontSize: "18px",
                      "&:hover": {
                        bgcolor: theme.palette.action.hover,
                      },
                    }}
                  />
                ) : (
                  <ExpandMore
                    sx={{
                      borderRadius: "6px",
                      fontSize: "18px",
                      "&:hover": {
                        bgcolor: theme.palette.action.hover,
                      },
                    }}
                  />
                )
              )}
            </ListItem>
          </Tooltip>
          {hasChildren && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List disablePadding>
                {renderMenu(item.children!, level + 1, item.id)}
              </List>
            </Collapse>
          )}
        </Box>
      );
    });
  };

  const transformMenu = (): MenuData[] =>
    menuItemsAll.map((item, index): MenuData => ({
      id: `generated-id-${index}`,
      title: item.text,
      url: item.href,
      logo: item.logo,
      children:
        item.children?.map((child, childIndex): MenuData => ({
          id: `generated-id-${index}-${childIndex}`,
          title: child.text,
          url: child.href,
          logo: child.logo,
          children:
            child.children?.map((grandChild, grandChildIndex): MenuData => ({
              id: `generated-id-${index}-${childIndex}-${grandChildIndex}`,
              title: grandChild.text,
              url: grandChild.href,
              logo: grandChild.logo,
              children: [],
            })) || [],
        })) || [],
    }));

  return (
    <Box
      sx={{
        width: open ? 260 : 80,
        transition: "width 0.3s",
        backgroundColor: theme.palette.background.paper,
        boxShadow: "2px 0px 10px rgba(0,0,0,0.1)",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        p: 2,
        mb: 2,
        ml: 2,
        mr: 2,
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
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
        {!menuItemsAll ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          renderMenu(transformMenu())
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
