"use client";
import React from "react";
import { Box, Button, Alert, CircularProgress } from "@mui/material";
import { useFormik } from "formik";

import FildeAuthPassword from "@/components/field-auth/field-password";
import AuthFormCaption from "@/components/auth-form-caption";
import validationSchema from "./ChangePasswordSchema";

const ChangePasswordClientPage: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(null); // Clear any previous status messages

      try {
        console.log("Submitted values:", values);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Success message
        setStatus({ success: "Your password has been successfully changed." });
        formik.resetForm();
      } catch (error) {
        // Error message
        setStatus({ error: "An error occurred. Please try again." });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ mt: 5 }}>
      <AuthFormCaption
        caption="Change Password"
        image={{
          src: "/images/imgAuth/verification.png",
          alt: "reset-password-icons",
        }}
      />

      <Box component="form" onSubmit={formik.handleSubmit}
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: "600px",
          width: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        {formik.status?.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formik.status.error}
          </Alert>
        )}

        {formik.status?.success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {formik.status.success}
          </Alert>
        )}

        <FildeAuthPassword
          name="currentPassword"
          label="Current Password"
          required
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.currentPassword && !!formik.errors.currentPassword
          }
          helperText={
            formik.touched.currentPassword && formik.errors.currentPassword
          }
        />

        <FildeAuthPassword
          name="newPassword"
          label="New Password"
          required
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.newPassword && !!formik.errors.newPassword}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
        />

        <FildeAuthPassword
          name="confirmNewPassword"
          label="New Password Confirmation"
          required
          value={formik.values.confirmNewPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmNewPassword &&
            !!formik.errors.confirmNewPassword
          }
          helperText={
            formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword
          }
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {formik.isSubmitting ? (
            <CircularProgress size={24} />
          ) : (
            "Change Password"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePasswordClientPage;
