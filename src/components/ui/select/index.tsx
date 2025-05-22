import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { menuItemStyle, selectLabelStyle, selectStyle } from "./select.style";

interface CustomSelectProps {
  label?: string;
  value: string | number;
  options: { value: string | number; label: string }[];
  icon?: React.ReactNode;
  onChange?: (e: SelectChangeEvent) => void;
  sx?: any; // لإضافة المزيد من الأنماط عند الحاجة
}

export default function CustomSelect({
  label,
  value,
  options,
  icon,
  sx,
  ...props
}: CustomSelectProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {icon && <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.primary",
          }}
        >
          {icon}
        </Box>}
        <InputLabel sx={selectLabelStyle}>{label}</InputLabel>
      </Box>
      <FormControl fullWidth>
        <Select
          {...props}
          // input={
          //   <OutlinedInput
          //     startAdornment={
          //       icon && (
          //         <div
          //           style={{
          //             marginRight: 2,
          //             display: "flex",
          //             alignItems: "center",
          //             justifyContent: "center",
          //           }}
          //         >
          //           {icon}
          //         </div>
          //       )
          //     }
          //  />
          // }
          sx={{
            ...selectStyle,
            ...sx,
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // إزالة الأنماط الافتراضية
            },
          }}
          label={label}
          value={value.toString()}
        >
          {options.map((option) => (
            <MenuItem
              sx={menuItemStyle}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
