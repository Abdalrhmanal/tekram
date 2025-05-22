"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  TextField,
  Grid,
} from "@mui/material";

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate API call for password reset request
      console.log("Forgot password form submitted", { email });

      // Example: simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Assuming password reset request is successful
      setSuccess("A password reset link has been sent to your email.");
    } catch (err) {
      setError(
        "An error occurred while processing your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      justifyContent="center"
      alignItems="center"
      sx={{
        maxWidth: "400px",
        width: "100%",
        padding: "20px",
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto", // Added to center the form horizontally
      }}
    >
      <Typography
        variant="h6"
        component="h1"
        align="center"
        gutterBottom
        sx={{ marginBottom: 10 }}
      >
        Enter your email so we send you a verification code
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 400 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ marginBottom: "10px" }}>
          {success}
        </Alert>
      )}

      {/* Email input field */}
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: "20px" }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ padding: "10px 0" }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Send verification link"}
      </Button>
    </Box>
  );
};

export default ForgotPasswordPage;
