"use client";
import { Box, Button, Typography, Alert, CircularProgress } from "@mui/material";
import React, { useState } from "react";

import AuthFormCaption from "@/components/auth-form-caption";
import Input from "@/components/ui/input/Input";
import useResetPassword from "../hooks/reset-password";

const ResetPasswordClientPage: React.FC = () => {
  const { resetPassword, loading, error, success } = useResetPassword();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    await resetPassword({
      email,
      mail_verify_code: code,
      password,
    });
  };

  return (
    <Box sx={{ width: "360px", margin: "20px auto 0" }} component="form" onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <AuthFormCaption
          caption="Enter your information to reset your password"
          image={{
            src: "/images/logo.png",
            alt: "Logo",
          }}
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        {localError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {localError}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Verification Code"
          name="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Input
          label="New Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ textTransform: "capitalize", mt: 3, width: "100%" }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Change Password"}
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPasswordClientPage;
