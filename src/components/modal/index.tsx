"use client";
import { CustomButton as Button } from "@/components/ui/button";
import { StopCircleOutlined } from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type: "delete" | "stop" | "add" | "edit";
  confirmButtonText?: string;
  cancelButtonText?: string;
  children?: React.ReactNode;
}

const typeColors = {
  delete: "error.main",
  stop: "error.main",
  add: "primary.main",
  edit: "primary.dark",
  default: "grey.300",
};

const typeBackgrounds = {
  delete: "error.light",
  stop: "error.light",
  add: "blueShadow.main",
  edit: "#blueShadow.light",
  default: "#F5F5F5",
};

const typeIcons = (type: "delete" | "stop" | "add" | "edit") => {
  const style = {
    color: typeColors[type],
    bgcolor: typeBackgrounds[type],
    fontSize: 24,
    p: 0.5,
    borderRadius: "8px",
  };

  return {
    delete: <DeleteOutlineIcon sx={{ ...style }} />,
    stop: <StopCircleOutlined sx={{ ...style }} />,
    add: <AddCircleOutlineIcon sx={{ ...style }} />,
    edit: <AddCircleOutlineIcon sx={{ ...style }} />,
  }[type];
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  type,
  confirmButtonText = type === "delete" ? "delete" : "save",
  cancelButtonText = "Cancel",
  children,
}) => {
  const getIconByType = () => {
    return typeIcons(type);
  };

  const getConfirmButtonColor = () => {
    return typeColors[type];
  };

  // اختيار اللون بناءً على النوع
  const buttonColor = typeColors[type] || typeColors.default;
  const backgroundColor = typeBackgrounds[type] || typeBackgrounds.default;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          boxShadow: 5,
          bgcolor: "background.paper",
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          {getIconByType()}
          <Typography
            sx={{
              fontSize: "22px",
              fontFamily: "karla",
              color: "text.primary",
            }}
            variant="h6"
            component="span"
          >
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography
          sx={{
            padding: 1.5,
            borderRadius: 1.5,
            mb: 2,
            bgcolor: backgroundColor,
            fontSize: "16px",
            fontFamily: "karla",
            color: "#414141",
          }}
        >
          {message}
        </Typography>
      </DialogContent>

      {/* اضافة عماصر عند الحاجة */}
      {children}

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color={getConfirmButtonColor()}
        >
          {cancelButtonText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={getConfirmButtonColor()}
          sx={{
            padding: "2px 5px",
            fontSize: "14px",
            textTransform: "capitalize",
            borderRadius: "8px",
            border: `1px solid ${getConfirmButtonColor()}`,
            bgcolor: getConfirmButtonColor(),
          }}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
