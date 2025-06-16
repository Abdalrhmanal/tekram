"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import getTheme from "@/theme/theme";

type Direction = "rtl" | "ltr";

type ThemeContextType = {
  mode: "light" | "dark";
  color: "blue" | "green" | "red" | "yellow" | "purple" | "darkBlue";
  direction: Direction;
  toggleDarkMode: () => void;
  changeColor: (color: ThemeContextType["color"]) => void;
  setDirection: (dir: Direction) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [color, setColor] = useState<"blue" | "green" | "red" | "yellow" | "purple" | "darkBlue">("blue");
  const [direction, setDirection] = useState<Direction>("ltr");

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode") as "light" | "dark" | null;
    const savedColor = localStorage.getItem("themeColor") as ThemeContextType["color"] | null;
    const savedDirection = localStorage.getItem("themeDirection") as Direction | null;
    if (savedMode) setMode(savedMode);
    if (savedColor) setColor(savedColor);
    if (savedDirection) setDirection(savedDirection);
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
    localStorage.setItem("themeColor", color);
    localStorage.setItem("themeDirection", direction);
    // غيّر اتجاه الصفحة فعلياً
    if (typeof window !== "undefined") {
      document.body.dir = direction;
      document.documentElement.dir = direction;
    }
  }, [mode, color, direction]);

  const toggleDarkMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const changeColor = (newColor: ThemeContextType["color"]) => {
    setColor(newColor);
  };

  const theme = getTheme(color, mode, direction);

  return (
    <ThemeContext.Provider value={{ mode, color, direction, toggleDarkMode, changeColor, setDirection }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div dir={direction} style={{ width: "100%" }}>
          {children}
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};