"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import getTheme from "@/theme/theme";

type ThemeContextType = {
  mode: "light" | "dark"; // وضع الثيم (ضوئي أو داكن)
  color: "blue" | "green" | "red" | "yellow" | "purple" | "darkBlue"; // اللون الأساسي للثيم
  toggleDarkMode: () => void; // تغيير الوضع بين الضوئي والداكن
  changeColor: (color: "blue" | "green" | "red" | "yellow" | "purple" | "darkBlue") => void; // تغيير اللون الأساسي
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
  // الحالة الأولية للوضع (ضوئي أو داكن)
  const [mode, setMode] = useState<"light" | "dark">("light");

  // الحالة الأولية للون الأساسي
  const [color, setColor] = useState<"blue" | "green" | "red" | "yellow" | "purple" | "darkBlue">("blue");

  // استرجاع الإعدادات من localStorage عند تشغيل التطبيق
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode") as "light" | "dark" | null;
    const savedColor = localStorage.getItem("themeColor") as "blue" | "green" | "red" | "yellow" | null;

    if (savedMode) setMode(savedMode);
    if (savedColor) setColor(savedColor);
  }, []);

  // حفظ الإعدادات في localStorage عند تغييرها
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
    localStorage.setItem("themeColor", color);
  }, [mode, color]);

  // تغيير الوضع بين الضوئي والداكن
  const toggleDarkMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // تغيير اللون الأساسي
  const changeColor = (newColor: "blue" | "green" | "red" | "yellow" | "purple" | "darkBlue") => {
    setColor(newColor);
  };

  // إنشاء الثيم بناءً على الوضع الحالي واللون الأساسي
  const theme = getTheme(color, mode);

  return (
    <ThemeContext.Provider value={{ mode, color, toggleDarkMode, changeColor }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};