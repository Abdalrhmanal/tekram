"use client";
import React from "react";
import {
  HomeOutlined,
  PeopleAltOutlined,
  PersonOutline,
  GroupWorkOutlined,
  ApartmentOutlined,
  CalendarMonthOutlined,
  AccessTimeOutlined,
  WarningAmberOutlined,
  PauseCircleOutline,
  PublishOutlined,
  DashboardOutlined,
  ManageAccountsOutlined,
  DesignServicesOutlined,
  GavelOutlined,
  PolicyOutlined,
  ArticleOutlined,
  DescriptionOutlined,
  MenuBookOutlined,
  CampaignOutlined,
  HistoryOutlined,
  ChatBubbleOutlineOutlined,
  AccountBalanceWalletOutlined,
  ReportOutlined,
  EditOutlined,
} from "@mui/icons-material";

export interface MenuItem {
  text: string;
  href?: string;
  logo?: React.ReactNode;
  isActive: boolean;
  isExpanded?: boolean;
  role?: string;
  children?: MenuItem[];
}

export const menuItemsAll: MenuItem[] = [
  {
    text: "Home",
    href: "/",
    logo: <HomeOutlined />,
    isActive: false,
    role: "all",
  },
  {
    text: "Users",
    logo: <PeopleAltOutlined />,
    isActive: false,
    isExpanded: false,
    role: "all",
    children: [
      { text: "Customers", href: "/users/customers", logo: <PersonOutline />, isActive: false, role: "site-admin" },
      { text: "Service Providers", href: "/users/service-providers", logo: <GroupWorkOutlined />, isActive: false, role: "site-admin" },
      { text: "Account SProv", href: "/users/account-s-prov", logo: <GroupWorkOutlined />, isActive: false, role: "site-admin" },
      { text: "VIP Service Providers", href: "/users/vip-s-prov", logo: <GroupWorkOutlined />, isActive: false, role: "site-admin" },
      { text: "New Service Requests", href: "/users/new-request-service", logo: <GroupWorkOutlined />, isActive: false, role: "site-admin" },
    ],
  },
  {
    text: "Reservations Management",
    logo: <CalendarMonthOutlined />,
    isActive: false,
    isExpanded: false,
    role: "all",
    children: [
      { text: "All Reservations", href: "/", logo: <CalendarMonthOutlined />, isActive: false, role: "site-admin" },
      { text: "Manual reservation", href: "/", logo: <EditOutlined />, isActive: false, role: "site-admin" },
      { text: "Late delivery to (user)", href: "/", logo: <AccessTimeOutlined />, isActive: false, role: "site-admin" },
      { text: "Late delivery to (SProv)", href: "/", logo: <AccessTimeOutlined />, isActive: false, role: "site-admin" },
      { text: "Warnings for users", href: "/", logo: <WarningAmberOutlined />, isActive: false, role: "site-admin" },
    ],
  },
  {
    text: "Published Services",
    logo: <PublishOutlined />,
    isActive: false,
    isExpanded: false,
    role: "all",
    children: [
      { text: "All Published", href: "/", logo: <PublishOutlined />, isActive: false, role: "site-admin" },
      { text: "Paused", href: "/", logo: <PauseCircleOutline />, isActive: false, role: "site-admin" },
      { text: "Publish Request", href: "/", logo: <PublishOutlined />, isActive: false, role: "site-admin" },
    ],
  },
  {
    text: "Portfolio management",
    logo: <DashboardOutlined />,
    isActive: false,
    isExpanded: false,
    role: "all",
    children: [
      { text: "Skyline", href: "/", logo: <ApartmentOutlined />, isActive: false, role: "site-admin" },
      { text: "Customers", href: "/", logo: <PersonOutline />, isActive: false, role: "site-admin" },
      { text: "Service Providers", href: "/", logo: <GroupWorkOutlined />, isActive: false, role: "site-admin" },
    ],
  },
  {
    text: "Site Customization",
    logo: <DesignServicesOutlined />,
    isActive: false,
    isExpanded: false,
    role: "all",
    children: [
      { text: "Service Types", href: "/", logo: <DesignServicesOutlined />, isActive: false, role: "site-admin" },
      { text: "Basic Policies", href: "/", logo: <PolicyOutlined />, isActive: false, role: "site-admin" },
      { text: "Privacy Policy Text", href: "/", logo: <PolicyOutlined />, isActive: false, role: "site-admin" },
      { text: "Terms of Use Text", href: "/", logo: <GavelOutlined />, isActive: false, role: "site-admin" },
      { text: "Application Explanations", href: "/", logo: <ArticleOutlined />, isActive: false, role: "site-admin" },
      { text: "Magazine Management", href: "/", logo: <MenuBookOutlined />, isActive: false, role: "site-admin" },
    ],
  },
  {
    text: "Ad Management",
    logo: <CampaignOutlined />,
    isActive: false,
    isExpanded: false,
    role: "all",
    children: [
      { text: "Current Ads", href: "/", logo: <CampaignOutlined />, isActive: false, role: "site-admin" },
      { text: "Previous Ads", href: "/", logo: <HistoryOutlined />, isActive: false, role: "site-admin" },
    ],
  },
  {
    text: "Urgent Chats",
    logo: <ChatBubbleOutlineOutlined />,
    isActive: false,
    isExpanded: false,
    role: "all",
    children: [
      { text: "Unpaid Requests", href: "/", logo: <ReportOutlined />, isActive: false, role: "site-admin" },
      { text: "Wallet Top-up", href: "/", logo: <AccountBalanceWalletOutlined />, isActive: false, role: "site-admin" },
      { text: "Wallet Withdrawal", href: "/", logo: <AccountBalanceWalletOutlined />, isActive: false, role: "site-admin" },
    ],
  },
  {
    text: "Technical Support",
    logo: <ManageAccountsOutlined />,
    isActive: false,
    isExpanded: false,
    role: "all",
  },
  {
    text: "Reports",
    logo: <ReportOutlined />,
    isActive: false,
    isExpanded: false,
    role: "all",
  },
];