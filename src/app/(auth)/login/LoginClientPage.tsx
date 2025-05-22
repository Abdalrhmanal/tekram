"use client";
import {
  loginPageContainer,
  formContainer,
  formContainerBody,
  googleBtn,
  h1Text,
  haveAccont,
  imageContainer,
  pText,
  submitBtn,
} from "@/app/(auth)/login/LoginClientPage.style";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import Input from "@/components/ui/input/Input";
import Image from "next/image";
import useLogin from "../hooks/login";
import Link from "next/link";
import useGoogleLogin from "../hooks/useGoogleLogin";

const LoginClientPage: React.FC = () => {
  const { login, loading, error, success } = useLogin();
  const {
    loginWithGoogle,
    loading: loadingGoogle,
    error: errorGoogle,
    success: successGoogle,
  } = useGoogleLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) return;

    try {
      await login({ email, password });
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <Box sx={loginPageContainer}>
        <Grid container>
          <Grid
            sx={{ ...formContainer, px: { xs: 2, sm: 6, md: 16 } }}
            size={{ sm: 12, md: 7, lg: 6 }}
          >
            <Box sx={{ mx: "auto" }}>
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={85}
                height={75}
              />
            </Box>
            <Typography sx={h1Text} component="h1">
              Log in to your account
            </Typography>
            <Typography sx={pText}>
              Welcome back! Please enter your details.
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Input
                label="Email"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Box sx={formContainerBody}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember for 30 days"
                  sx={{ color: "text.primary" }}
                />
                <Link
                  href="/forgot-password"
                  style={{ textDecoration: "none", color: "primary.main" }}
                >
                  Forgot password
                </Link>
              </Box>
              <Button
                sx={submitBtn}
                variant="contained"
                fullWidth
                size="large"
                type="submit"
                disabled={loading}
              >
                sign in
              </Button>
              {error && (
                <Typography color="error.main" mt={2}>
                  {error}
                </Typography>
              )}
              {success && (
                <Typography color="primary.main" mt={2}>
                  {success}
                </Typography>
              )}
              <Button
                variant="outlined"
                fullWidth
                sx={googleBtn}
                onClick={() => {
                  loginWithGoogle();
                }}
                size="large"
              >
                <img
                  src="https://authjs.dev/img/providers/google.svg"
                  alt="Google logo"
                  height="24"
                  width="24"
                />
                <Box
                  component="span"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "500",
                  }}
                >
                  {loadingGoogle ? "Loading..." : "Sign in with Google"}
                </Box>
              </Button>
            </Box>
            <Typography
              textAlign="center"
              sx={haveAccont}
              color="text.secondary"
              mt={2}
            >
              Don’t have an account?{" "}
              <Link
                href="/register"
                style={{ textDecoration: "none", color: "primary.main" }}
              >
                Sign up
              </Link>
            </Typography>
          </Grid>
          <Grid
            sx={{ ...imageContainer, display: { xs: "none", md: "block" } }}
            size={{ sm: 0, md: 5, lg: 6 }}
          >
            <Box
              sx={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/images/image.png"
                width={500}
                height={500}
                alt="Picture of the author"
                style={{ marginLeft: "15px" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LoginClientPage;
