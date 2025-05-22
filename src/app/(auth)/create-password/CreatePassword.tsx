"use client";
import React, { useState } from "react";
import FildeAuthEmail from "@/components/field-auth/field-email";

import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import FildeAuthPassword from "@/components/field-auth/field-password";

const CreatePasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate API call or handle password creation logic here
      console.log("Password creation submitted");

      // Example: simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Assuming password creation is successful
      setSuccess("Your password has been created successfully!");
    } catch (err) {
      setError(
        "An error occurred while creating the password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Create New Password
      </Typography>

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

      <FildeAuthEmail name="email" required />
      <FildeAuthPassword name="password" required />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Create Password"}
      </Button>
    </Box>
  );
};

export default CreatePasswordPage;
