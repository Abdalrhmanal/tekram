import { FC } from "react";
import { Box, Switch, Button, ListItemText } from "@mui/material";
import { DarkModeOutlined, LogoutOutlined } from "@mui/icons-material";
import useLogout from "@/hooks/logout";

const SidebarFooter: FC = () => {
  const { logout, loading, error } = useLogout();

  return (
    <Box  >
      <Box sx={{ mb: "auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            padding: "8px 16px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <DarkModeOutlined />
            <ListItemText primary="Dark Mode" />
          </Box>
          <Switch />
        </Box>
      </Box>

      <Box>
        <Button
          startIcon={<LogoutOutlined />}
          variant="contained"
          fullWidth
          sx={{
            borderRadius: "12px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            padding: "16px 12px 16px 24px",
            textTransform: "none",
            background:
              "linear-gradient(52.07deg, #2196F3 -7.59%, #ADC4D7 129.4%)",
          }}
          onClick={logout}
          disabled={loading}
        >
          {loading ? "Logging out..." : "Logout"}
        </Button>
        {error && (
          <Box sx={{ color: "error.main", mt: "8px" }}>{error}</Box>
        )}
      </Box>
    </Box>
  );
};

export default SidebarFooter;
