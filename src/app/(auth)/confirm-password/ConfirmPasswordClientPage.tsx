"use client";
import React, { useState } from "react";
import { Box, Button, Alert, CircularProgress } from "@mui/material";

import useLogin from "../hooks/login";
import ResetPasswordStepper from "@/components/stepper";
import AuthFormCaption from "@/components/auth-form-caption";
import { MuiOtpInput } from "mui-one-time-password-input";
const ConfirmPasswordClientPage: React.FC = () => {
  //TODO: send mail to user with link to reset password
  const { login, loading, error } = useLogin();

  const [otp, setOtp] = useState("");

  const handleComplete = () => {};

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //TODO
    try {
      // await login({ email, password });
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <>
      {/* Stepper  */}
      <ResetPasswordStepper step={1} />

      {/* Form caption  */}
      <AuthFormCaption
        caption="Verification"
        image={{
          src: "/images/imgAuth/reset-password/reset-password-2.svg",
          alt: "reset-password-icons",
        }}
      />

      <Box component="form" onSubmit={handleSubmit}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* submit on complete  */}
        <MuiOtpInput
          value={otp}
          length={6}
          onChange={setOtp}
          onComplete={handleComplete}
          sx={{ my: 2 }}
        />

        <Button
          type="submit"
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          // disabled={true}
        >
          {false ? <CircularProgress size={24} /> : "Resend code"}
        </Button>
      </Box>
    </>
  );
};

export default ConfirmPasswordClientPage;
