
import { Box } from "@mui/material";
import HomePage from "./(project)/home/page";
import Sidebar from "@/components/side-bar";
import Header from "@/components/header-dashboard";

export default function Home() {
  return (
     <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Header />

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden", pt: "80px" }}>
        <Sidebar />

        <Box
          sx={{
            flex: 1,
            // ml: "300px",
            height: "calc(100vh - 80px)",
            overflowY: "auto",
          }}
        >
          {/* {children} */}<HomePage />
        </Box>
      </Box>
    </Box>
    
  );
}
