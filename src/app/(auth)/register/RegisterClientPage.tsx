"use client";
import {
  formContainer, imageContainer, h1Text, pText, registerPageContainer, submitBtn, haveAccont,
} from "@/app/(auth)/register/RegisterClientPage.style";
import {
  Box, Button, Grid, Typography, Alert, Modal, TextField, CircularProgress, MenuItem
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRegister } from "../hooks/register";
import Link from "next/link";
import PersonLod from "@/components/lodeing-poupup/person-lod";
import VerifyMail from "./verify-mail/verify-mail";

const RegisterClientPage: React.FC = () => {
  const { register, loading, error, success } = useRegister();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+|00)[0-9]{10,}$/;
    return phoneRegex.test(phone) && phone.replace(/\+|00/, '').length >= 10;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const validateField = (fieldName: string, value: string) => {
    let error = "";

    switch (fieldName) {
      case "name":
        if (!value) error = "Name is required";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!validateEmail(value)) error = "Invalid email format";
        break;
      case "phone":
        if (!value) error = "Phone number is required";
        else if (!validatePhone(value)) error = "Phone must start with + or 00 and have at least 12 digits";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      case "gender":
        if (!value) error = "Gender is required";
        break;
      default:
        break;
    }

    setFormErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    return !error;
  };

  const validateForm = () => {
    const results = [
      validateField("name", formData.name),
      validateField("email", formData.email),
      validateField("phone", formData.phone),
      validateField("password", formData.password),
      validateField("gender", formData.gender),
    ];
    return results.every(Boolean);
  };

  const handleNext = async () => {
    if (!validateForm()) return;

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        password: formData.password,
        gender: formData.gender as "male" | "female",
      });
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setOpenModal(true);
    }
  }, [success]);

  const isFormValid = Object.values(formErrors).every(error => !error) &&
    Object.values(formData).every(value => value);

  return (
    <Box sx={registerPageContainer}>
      <Grid container spacing={{ sm: 0, md: 5, lg: 6 }}>
        <Grid sx={{ ...imageContainer, display: { xs: "none", md: "block" } }} size={6}>
          <Image
            src="/images/image.png"
            width={500}
            height={500}
            alt="Register Image"
            priority
          />
        </Grid>

        <Grid sx={{ ...formContainer, px: { xs: 2, sm: 6, md: 16 } }} size={6}>
          <Box sx={{ mx: "auto" }}>
            <Image src="/images/logo.png" alt="Logo" width={50} height={50} priority />
          </Box>
          <Typography sx={h1Text} component="h1">Sign up a new account</Typography>
          <Typography sx={pText}>Join us and make success with our family!</Typography>

          {showSuccessMessage && (
            <Alert severity="success" sx={{ my: 2 }}>
              Registration successful! Please check your email to continue the account setup.
            </Alert>
          )}

          <Box component="form" noValidate sx={{ mt: 2 }}>
            <TextField
              fullWidth margin="normal" size="small"
              label="Full Name" name="name" id="name"
              value={formData.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth margin="normal" size="small"
              label="Email" name="email" id="email" type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              placeholder="admin.Tekram@Tekram.com"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth margin="normal" size="small"
              label="Phone Number" name="phone" id="phone" type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
              placeholder="+352... or 00352..."
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth margin="normal" size="small"
              label="Password" name="password" id="password" type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth select margin="normal" size="small"
              label="Gender" name="gender" id="gender"
              value={formData.gender}
              onChange={handleChange}
              error={!!formErrors.gender}
              helperText={formErrors.gender}
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>

            {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

            <Button
              sx={submitBtn}
              variant="contained"
              fullWidth
              size="large"
              disabled={!isFormValid || loading || showSuccessMessage}
              onClick={handleNext}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  Loading...
                </>
              ) : "Register"}
            </Button>
          </Box>

          <Typography textAlign="center" sx={haveAccont} color="text.secondary" mt={2}>
            Already have an account?{" "}
            <Link href="/login" style={{ textDecoration: "none", color: "primary.main" }}>
              Sign in
            </Link>
          </Typography>
        </Grid>
      </Grid>

      <Modal open={openModal} onClose={() => setOpenModal(false)} disableEscapeKeyDown>
        <Box sx={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2,
          textAlign: "center", minWidth: 300, maxWidth: "90%",
        }}>
          <VerifyMail open={openModal} onClose={() => setOpenModal(false)} />
          <Button onClick={() => setOpenModal(false)} variant="contained" sx={{ mt: 2 }}>OK</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default RegisterClientPage;
