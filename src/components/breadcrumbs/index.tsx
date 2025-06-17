"use client";

import { Breadcrumbs, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

// دالة لتحسين التنسيق
const formatPart = (part: string, isLast: boolean) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  // تحقق إذا كان UUID أو رقم
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const isId = uuidRegex.test(part) || /^\d+$/.test(part);
  if (isLast && isId) return userName || "";
  const decoded = decodeURIComponent(part);
  return decoded.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const BreadcrumbsDash = ({ isProvider }: { isProvider?: boolean }) => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathParts.map((part, index) => {
    const href = "/" + pathParts.slice(0, index + 1).join("/");
    const isLast = index === pathParts.length - 1;
    const label = formatPart(part, isLast);

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
      {isProvider ? (
        <MuiLink component={Link} href="/dashboard" underline="hover" color="inherit">
          Dashboard
        </MuiLink>
      ) : (
        <MuiLink component={Link} href="/" underline="hover" color="inherit">
          Home
        </MuiLink>
      )}
      {breadcrumbs}
    </Breadcrumbs>
  );
};

export default BreadcrumbsDash;