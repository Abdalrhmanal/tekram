"use client";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal as ModalComponent } from "@mui/material";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
  open: (name: string) => void;
  close: () => void;
  openName: string;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [openName, setOpenName] = useState<string>("");

  const open = setOpenName;

  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
};

const DynamicModal: React.FC<{
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}> = ({ open, onClose, children }) => (
  <ModalComponent open={open} onClose={onClose}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 2,
        borderRadius: 2,
        minWidth: 500,
        maxWidth: 1000,
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <Box>{children}</Box>
    </Box>
  </ModalComponent>
);

interface OpenProps {
  children: React.ReactElement<{ onClick?: () => void }>;
  opens: string;
}

const Open: React.FC<OpenProps> = ({ children, opens }) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Open must be used within a ModalProvider");

  const { open } = context;

  return React.cloneElement(children, {
    onClick: () => open(opens),
  });
};

interface WindowProps {
  name: string;
  children: React.ReactElement<{ onClose?: () => void }>;
}

const Window: React.FC<WindowProps> = ({ name, children }) => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Window must be used within a ModalProvider");

  const { openName, close } = context;

  if (name !== openName) return null;

  return (
    <>
      <DynamicModal onClose={close} open={Boolean(openName)}>
        {React.cloneElement(children, {
          onClose: close,
        })}
      </DynamicModal>
    </>
  );
};

const Modal = {
  Provider: ModalProvider,
  Open,
  Window,
};

export default Modal;
