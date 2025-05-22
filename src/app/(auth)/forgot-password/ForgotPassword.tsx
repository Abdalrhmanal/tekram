"use client";
import React, { useEffect, useState } from "react";
import {
  Box, Button, Typography, Alert, CircularProgress, TextField,
} from "@mui/material";
import useForgetPassword from "../hooks/forgot-password";
import { useRouter } from "next/navigation"; // ✅ استيراد router

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { forgetPassword, loading, error, success } = useForgetPassword();
  const router = useRouter(); // ✅ تهيئة router

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await forgetPassword({ email });
  };

  // ✅ عند نجاح الطلب، الانتقال إلى صفحة reset-password
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.push("/reset-password");
      }, 1500); // مهلة صغيرة لعرض رسالة النجاح قبل الانتقال
    }
  }, [success, router]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "400px",
        width: "100%",
        padding: "20px",
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Typography
        variant="h6"
        component="h1"
        align="center"
        gutterBottom
        sx={{ marginBottom: 4 }}
      >
        Enter your email so we send you a verification code
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2, width: "100%" }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ marginBottom: 2, width: "100%" }}>
          {success}
        </Alert>
      )}

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: 2 }}
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
