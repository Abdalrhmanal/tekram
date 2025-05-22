"use client";
import React, { useState } from "react";
import { Box, Button, Alert, CircularProgress } from "@mui/material";
import FildeAuthPassword from "@/components/field-auth/field-password";

import AuthFormCaption from "@/components/auth-form-caption";

const ChangePasswordClientPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handlePasswordChange = (value: string) => {
    setNewPassword(value);
    validatePasswords(value, confirmNewPassword);
  };

  const handleNewConfirmPassword = (value: string) => {
    setConfirmNewPassword(value);
    validatePasswords(newPassword, value); // تم التصحيح هنا
  };

  const validatePasswords = (password: string, confirmNewPassword: string) => {
    if (confirmNewPassword && password !== confirmNewPassword) {
      setError("Passwords do not match");
      setSuccess(null);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New Password and Confirmation do not match.");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call for creating a new password
      console.log("New password submitted");

      // Example: simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Assuming password creation is successful
      setSuccess("Your password has been successfully created.");

      // Note: Send the new password confirmation as the same value as the new password because they must match.
      // new_password : newPassword
      // new_password_confirmation : newPassword

      // إعادة تعيين الحقول
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
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
      {/* Form caption */}
      <AuthFormCaption
        caption="Change Password"
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
          name="current_password"
          label="Current Password"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <FildeAuthPassword
          name="new_password"
          label="New Password"
          required
          value={newPassword}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />

        <FildeAuthPassword
          name="new_password_confirmation"
          label="New Password Confirmation"
          required
          value={confirmNewPassword}
          onChange={(e) => handleNewConfirmPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading || !!error}
        >
          {loading ? <CircularProgress size={24} /> : "Change Password"}
        </Button>
      </Box>
    </>
  );
};

export default ChangePasswordClientPage;
