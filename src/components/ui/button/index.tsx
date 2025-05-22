import React from "react";
import Button from "@mui/material/Button";

export function CustomButton({
  children,
  onClick,
  variant,
  color,
  component,
  sx,
  type,
  disabled,
  startIcon,
}: {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant: "outlined" | "contained";
  color?: string;
  component?: React.ElementType;
  sx?: any;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  startIcon?: React.ReactNode;
}) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      {...(component ? { component } : {})}
      type={type}
      disabled={disabled}
      startIcon={startIcon}
      sx={{
        padding: "2px 5px",
        fontSize: "14px",
        textTransform: "capitalize",
        color: variant === "contained" ? "#fff" : color,
        bgcolor: variant === "contained" ? color : "",
        borderColor: color,
        borderRadius: "8px",
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}
