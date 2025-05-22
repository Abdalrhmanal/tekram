import React from "react";
import TextField from "@mui/material/TextField";
import { Box, InputLabel } from "@mui/material";
import { inputStyle, labelStyle } from "./input.style";
interface ReusableInputProps {
  label?: string;
  name?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  size?: "small" | "medium" | undefined;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Input: React.FC<ReusableInputProps> = ({
  label = "",
  name = "",
  value = "",
  onChange = () => {},
  type = "text",
  size = "small",
  placeholder = "",
  error = false,
  helperText = "",
  disabled = false,
  fullWidth = true,
  icon,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "text.primary",
        }}
      >
        {icon}
        <InputLabel sx={labelStyle}>{label}</InputLabel>
      </Box>
      <TextField
        sx={{
          ...inputStyle,
          "& .MuiInputBase-input": {
            cursor: `${disabled ? "not-allowed" : "text"}`,
          },
          "&:hover": {
            cursor: `${disabled ? "not-allowed" : "text"}`,
          },
        }}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        disabled={disabled}
        size={size}
        fullWidth={fullWidth}
      />
    </>
  );
};

export default Input;
