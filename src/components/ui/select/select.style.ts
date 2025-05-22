import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export const selectStyle: SxProps<Theme> = {
  mt: 0.5,
  borderRadius: "0.5rem",
  backgroundColor: "background.paper",
  boxShadow: "0px 1px 2px 0px #0A0D120D",
  height: "40px",
  border: "1px #a0a0a0 solid",
  "&:focus": {
    outline: "none", // إزالة تأثير الفوكس الافتراضي
    borderColor: "primary.main", // لون الحدود عند الفوكس
  },
  "&:hover": {
    borderColor: "primary.main", // لون الحدود عند التمرير
    // backgroundColor: "blueShadow.main", // لون الخلفية عند التمرير
    // color: "primary.main", // لون النص عند التمرير
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "primary.main", // تعديل الحدود عند الفوكس الخاص بـ Input
  },
};

export const selectLabelStyle: SxProps<Theme> = {
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "20px",
  textAlign: "left",
  color: "gray.400",
  // "&.Mui-focused": {
  //   color: "#2196F3",
  // },
};

export const menuItemStyle: SxProps<Theme> = {
  fontSize: "14px",
  backgroundColor: "white",
  color: "#333",
  "&.Mui-selected": {
    backgroundColor: "blueShadow.main",
    color: "text.primary",
    // "&:hover": {
    //   backgroundColor: "primary.main",
    // },
  },
  "&:hover": {
    backgroundColor: "blueShadow.main",
  },
  "&:focus": {
    backgroundColor: "background.paper", // تأثير خاص عند الفوكس على عنصر القائمة
    color: "text.primary", // لون النص عند الفوكس على عنصر القائمة
  },
};
