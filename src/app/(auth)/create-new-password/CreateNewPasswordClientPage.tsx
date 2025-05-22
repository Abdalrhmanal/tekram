"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import FildeAuthPassword from "@/components/field-auth/field-password";
import ResetPasswordStepper from "@/components/stepper";
import AuthFormCaption from "@/components/auth-form-caption";

const CreateNewPasswordClientPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatched, setPasswordMatched] = useState(true);

  const handleMatchingPassword = (value: string) => {
    if (password !== value) {
      setError("Passwords do not match. Please try again.");
      setSuccess("");
      setPasswordMatched(false);
      return;
    }

    setError("");
    setPasswordMatched(true);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate API call for creating a new password
      console.log("New password submitted");

      // Example: simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Assuming password creation is successful
      setSuccess("Your password has been successfully created.");
    } catch (err) {
      setError(
        "An error occurred while creating your password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Stepper  */}
      <ResetPasswordStepper step={2} />

      {/* Form caption  */}
      <AuthFormCaption
        caption="New Password"
        image={{
          src: "/images/imgAuth/reset-password/reset-password-3.svg",
          alt: "reset-password-icons",
        }}
      />

      <Box component="form" onSubmit={handleSubmit}>
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

        <FildeAuthPassword
          name="new-password"
          label="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <FildeAuthPassword
          name="confirm-password"
          label="Confirm Password"
          required
          onChange={(e) => handleMatchingPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading || !passwordMatched}
        >
          {loading ? <CircularProgress size={24} /> : "Set New Password"}
        </Button>
      </Box>
    </>
  );
};

export default CreateNewPasswordClientPage;
