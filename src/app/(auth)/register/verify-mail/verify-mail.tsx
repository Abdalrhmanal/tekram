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
    await verifyCode(code);
  };

  useEffect(() => {
    if (success) {
      router.push("/");
    }
  }, [success, router]);

  return (
    <Modal open={open} onClose={onClose} disableEscapeKeyDown>
      <Box
        sx={{
          position: "absolute",
          top: "50%", left: "50%",
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
        <Typography variant="h6" mb={2}>Verify your Email</Typography>

        <TextField
          label="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          fullWidth
          size="small"
          margin="normal"
        />

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        <Button
          onClick={handleVerify}
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading || !code}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Verify"}
        </Button>

        <Button onClick={onClose} fullWidth sx={{ mt: 1 }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default VerifyMail;
