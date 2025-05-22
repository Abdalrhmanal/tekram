"use client";
import React from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { Phone } from "@mui/icons-material";

interface FieldAuthPhoneProps {
  name: string;
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  helperText?: string | false | undefined;
  error?: boolean;
}

const FieldAuthPhone: React.FC<FieldAuthPhoneProps> = ({
  name,
  label = "Phone",
  required,
  value,
  onChange,
  onBlur,
  helperText,
  error,
}) => {
  return (
    <Box sx={{ width: "100%", my: 2 }}>
      <TextField
        fullWidth
        id="phone"
        name={name}
        label={label}
        variant="outlined"
        type="tel"
        value={value}
        onChange={onChange}
        helperText={helperText}
        error={error}
        required={required}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  {/* Add any icon specific to phone numbers if needed */}
                  <Phone />
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">+ </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default FieldAuthPhone;
