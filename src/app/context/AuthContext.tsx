"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

type User = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  phoneNumber: string;
  avatar: string | null;
  role: string;
  permissions: string[];
};

type AuthContextType = {
  user: User | null; // بيانات المستخدم
  setUser: (user: User | null) => void; // تحديث بيانات المستخدم
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // استرجاع بيانات المستخدم من cookies عند تشغيل التطبيق
  useEffect(() => {
    const storedUser = Cookies.get("user_data");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};