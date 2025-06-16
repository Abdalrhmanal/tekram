"use client";

import { Breadcrumbs, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// دالة لتحسين التنسيق - تستبدل - بـ " " وتستخدم الأحرف الكبيرة
const formatPart = (part: string) => {
  const decoded = decodeURIComponent(part);
  return decoded.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const BreadcrumbsDash = () => {
  const pathname = usePathname(); // مثل: /blog/category/react-hooks
  const pathParts = pathname.split("/").filter(Boolean); // ['blog', 'category', 'react-hooks']

  const breadcrumbs = pathParts.map((part, index) => {
    const href = "/" + pathParts.slice(0, index + 1).join("/");
    const label = formatPart(part);
    const isLast = index === pathParts.length - 1;

    return isLast ? (
      <Typography key={href} color="text.primary" sx={{ textTransform: "capitalize" }}>
        {label}
      </Typography>
    ) : (
      <MuiLink
        key={href}
        component={Link}
        href={href}
        underline="hover"
        color="inherit"
        sx={{ textTransform: "capitalize" }}
      >
        {label}
      </MuiLink>
    );
  });

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ my: 2 }}>
      <MuiLink component={Link} href="/" underline="hover" color="inherit">
        Home
      </MuiLink>
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default BreadcrumbsDash;
