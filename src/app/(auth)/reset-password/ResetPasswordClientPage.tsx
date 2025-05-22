"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import AuthFormCaption from "@/components/auth-form-caption";
import Input from "@/components/ui/input/Input";

const ResetPasswordClientPage: React.FC = () => {
  // TODO: send mail to user with link to reset password
  // const { login, loading, error } = useLogin();

  return (
    <>
        <Box
          sx={{
            width: "360px",
            margin: "20px auto 0",
          }}
        >
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
              caption="Enter your email so we send you a verification link"
              image={{
                src: "/images/logo.png",
                alt: "Logo",
              }}
            />
          </Box>
          <Box sx={{ mt: 4 }}>
            <Input
              label="New password"
              name="password"
              type="password"
              onChange={() => {}}
            />
            <Input
              label="Confirm password"
              name="confirm password"
              type="password"
              onChange={() => {}}
            />

            <Button
              variant="contained"
              sx={{ textTransform: "capitalize", mt: 3, width: "100%" }}
            >
              Change password
            </Button>
          </Box>
        </Box>
    </>
  );
};

export default ResetPasswordClientPage;
