"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useVerifyMail } from "../../hooks/verify-mail";

interface VerifyMailProps {
  open: boolean;
  onClose: () => void;
}

const VerifyMail: React.FC<VerifyMailProps> = ({ open, onClose }) => {
  const [code, setCode] = useState("");
  const router = useRouter();

  const { verifyCode, loading, error, success } = useVerifyMail();

  const handleVerify = async () => {
    if (!code.trim()) return;
    await verifyCode(code.trim());
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  return (
    <Modal open={open} disableEscapeKeyDown>
      <Box
        dir="rtl"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
          minWidth: 300,
          maxWidth: "90%",
        }}
      >
        <Typography variant="h6" mb={2}>
          تحقق من بريدك الإلكتروني
        </Typography>

        <TextField
          label="رمز التحقق"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          fullWidth
          size="small"
          margin="normal"
        />

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

        <Button
          onClick={handleVerify}
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading || !code}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "تحقق"}
        </Button>
      </Box>
    </Modal>
  );
};

export default VerifyMail;
