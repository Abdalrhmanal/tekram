import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const inputStyle: SxProps<Theme> = {
  mt: 0.5,
  borderRadius: "0.5rem",
  backgroundColor: "background.paper",
  boxShadow: "0px 1px 2px 0px #0A0D120D",
  height: "40px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "0.5px #a0a0a0 solid",
      borderRadius: "0.5rem", // إزالة الحدود الافتراضية
    },
    "&:hover fieldset": {
      borderColor: "primary.main",
      borderRadius: "0.5rem", // إزالة الحدود عند التحويم
    },
    "&.Mui-focused fieldset": {
      border: "2px primary.main solid",
      borderRadius: "0.5rem", // إزالة الحدود عند التركيز
    },
    padding: "8px", // التحكم في الـ padding الخارجي للمكون
    "& input": {
      padding: "0px 6px", // التحكم في الـ padding داخل الـ input نفسه
    },
  },
};
export const labelStyle: SxProps<Theme> = {
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "20px",
  textAlign: "left",
};
//styleName: Text sm/Medium;
