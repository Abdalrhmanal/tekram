import { FC, ReactNode } from "react";
import Grid from "@mui/material/Grid";
import Header from "../../components/header-dashboard";
import Sidebar from "../../components/side-bar";
import Box from "@mui/material/Box";
import BreadcrumbsDash from "@/components/breadcrumbs";
import HeaderProvider from "@/components/header-provider";
import { Container } from "@mui/material";

interface MainLayoutProps {
    children: ReactNode;
}

export const metadata = {
    title: {
        template: "%s | Tekram",
        default: "Tekram",
    },
    description: "Main layout for the Tekram",
};

const MainProviderLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                bgcolor: "background.default",
            }}
        >
            <HeaderProvider />

            <Box sx={{ display: "flex", flex: 1, overflow: "hidden",pt: "80px" }}>
                {/* <Sidebar /> */}
                <Container sx={{ display: "flex", flexDirection: "row", flex: 1 }}>

                    <Box
                        sx={{
                            flex: 1,
                            // ml: "300px",
                            height: "calc(100vh - 80px)",
                            overflowY: "auto",
                        }}
                    >
                        <BreadcrumbsDash 
                        isProvider={true} />
                        {children}
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default MainProviderLayout;
