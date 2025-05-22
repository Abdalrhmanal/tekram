import { Box } from "@mui/material";
import Header from "../../components/header";

type LayoutProps = {
  params: any;
  children: React.ReactNode;
};

const Layout = ({ params, children }: LayoutProps) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
        bgcolor: "background.default",
      }}
    >
      <Header />
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
