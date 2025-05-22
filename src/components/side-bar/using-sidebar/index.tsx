"use client";
import React from "react";
import {
  BusinessOutlined,
  DeviceHubOutlined,
  HomeOutlined,
  InventoryOutlined,
  PeopleOutlined,
  PersonOutlined,
  ReceiptOutlined,
  ReportOutlined,
  SubscriptionsOutlined,
  WarehouseOutlined,
} from "@mui/icons-material";

export interface MenuItem {
  text: string;
  href?: string;
  icon?: React.ReactNode;
  isActive: boolean;
  isExpanded?: boolean;
  role?: string;
  children?: MenuItem[];
}

export const menuItemsAll: MenuItem[] = [
  {
    text: "Home",
    href: "/",
    icon: <HomeOutlined />,
    isActive: false,
    role: "all",
  },
  {
    text: "Companies",
    icon: <BusinessOutlined />,
    isActive: false,
    isExpanded: false,
    role: "site-admin",
    children: [
      {
        text: "Add new company",
        href: "/site-admin/companies/add-company",
        icon: <BusinessOutlined />,
        isActive: false,
        role: "site-admin",
      },
      {
        text: "All companies",
        href: "/site-admin/companies",
        icon: <BusinessOutlined />,
        isActive: false,
        role: "site-admin",
      },
    ],
  },
  {
    text: "Reports",
    icon: <ReportOutlined />,
    isActive: false,
    isExpanded: false,
    role: "all",
  },
];
