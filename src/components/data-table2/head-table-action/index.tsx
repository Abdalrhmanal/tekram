"use client";
import { useRouter } from "next/navigation";
import { Button, Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PrintIcon from "@mui/icons-material/Print";
import LinkIcon from "@mui/icons-material/Link";
import MapIcon from "@mui/icons-material/Map";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CloseIcon from "@mui/icons-material/Close";

interface ActionType {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
  visible?: (selectedCount: number) => boolean;
  color?: "inherit" | "primary" | "secondary" | "error";
}

interface HeardTabelActionsProps {
  selectedRows: { id: string }[];
  onDeselectAll: () => void;
}

const HeardTabelActions: React.FC<HeardTabelActionsProps> = ({ selectedRows, onDeselectAll }) => {
  const router = useRouter();
  const selectedCount = selectedRows.length;

  const actions: ActionType[] = [
    {
      text: "Copy to",
      icon: <ContentCopyIcon fontSize="small" />,
      onClick: () => console.log("Copy Action"),
      visible: (count) => count > 0,
    },
    {
      text: "Print to",
      icon: <PrintIcon fontSize="small" />,
      onClick: () => console.log("Print Action"),
      visible: (count) => count > 0,
    },
    {
      text: "Relationship map",
      icon: <MapIcon fontSize="small" />,
      onClick: () => console.log("Map Action"),
      visible: (count) => count > 1, 
    },
    {
      text: "Generate link",
      icon: <LinkIcon fontSize="small" />,
      onClick: () => console.log("Generate Link Action"),
      visible: (count) => count > 0,
    },
    {
      text: "Duplicate",
      icon: <FileCopyIcon fontSize="small" />,
      onClick: () => console.log("Duplicate Action"),
      visible: (count) => count === 1, 
    },
    {
      text: "Delete",
      icon: <DeleteIcon fontSize="small" />,
      onClick: () => console.log("Delete Action"),
      visible: (count) => count > 0,
      color: "error",
    },
  ];

  return (
    selectedCount > 0 && (
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#F5F5F5",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#1E6153",
            color: "white",
            padding: "4px 12px",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {selectedCount}
        </Box>

        <Button
          variant="text"
          color="inherit"
          onClick={onDeselectAll}
          sx={{ textTransform: "none", fontWeight: "bold", color: "#666" }}
        >
          Deselect all
        </Button>

        {actions
          .filter((action) => action.visible?.(selectedCount)) 
          .map((action, index) => (
            <Tooltip title={action.text} key={index}>
              <IconButton color={action.color || "inherit"} onClick={action.onClick}>
                {action.icon}
              </IconButton>
            </Tooltip>
          ))}

        <IconButton color="inherit" onClick={onDeselectAll}>
          <CloseIcon />
        </IconButton>
      </Box>
    )
  );
};

export default HeardTabelActions;
