"use client";
import React, { useState } from "react";
import { Box, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FieldAuthPasswordProps {
  name: string;
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  helperText?: string | false | undefined;
  error?: boolean;
}

const FieldAuthPassword: React.FC<FieldAuthPasswordProps> = ({
  name,
  label = "Password",
  required,
  value,
  onChange,
  onBlur,
  helperText,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box sx={{ width: "100%", my: 2 }}>
      <TextField
        fullWidth
        id={name}
        name={name}
        label={label}
        variant="outlined"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        //temp message for design purpose
        helperText={helperText}
        error={error}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        required={required}
      />
    </Box>
  );
};

export default FieldAuthPassword;
