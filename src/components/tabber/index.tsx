"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Divider,
} from "@mui/material";

export default function Tabber({
  tabsData,
}: {
  tabsData: { label: string; icon: React.ReactElement; component: React.ReactNode }[];
}) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            TabIndicatorProps={{
              style: { backgroundColor: "green", height: "4px" },
            }}
            sx={{
              flexGrow: 1,
              ".MuiTabs-flexContainer": {
                justifyContent: "space-around",
              },
            }}
          >
            {tabsData.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                iconPosition="start"
                label={tab.label}
                sx={{
                  flex: 1,
                  color: activeTab === index ? "green" : "gray",
                  fontWeight: activeTab === index ? "bold" : "normal",
                  maxWidth: "none",
                  justifyContent: "start",
                  gap: 1,
                }}
              />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>

      <Divider sx={{ borderColor: "#ccc" }} />

      <Box sx={{ p: 3, backgroundColor: "transparent" }}>
        {tabsData[activeTab].component}
      </Box>
    </Box>
  );
}
