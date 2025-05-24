"use client";
import { useRouter } from "next/navigation";
import { Button, Box, IconButton, Tooltip, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PrintIcon from "@mui/icons-material/Print";
import LinkIcon from "@mui/icons-material/Link";
import MapIcon from "@mui/icons-material/Map";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CloseIcon from "@mui/icons-material/Close";
import useDeleteData from "@/hooks/delete-global";

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
  const theme = useTheme();

  const { isLoading, isError, success, deleteData } = useDeleteData({
    dataSourceName: "api/customers",
  });

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
      onClick: async () => {
        const confirmed = window.confirm("هل أنت متأكد من حذف الزبائن المحددين؟");
        if (!confirmed) return;

        await Promise.all(selectedRows.map((row) => deleteData(row.id)));

        if (success) {
          onDeselectAll();
          router.refresh(); // إعادة تحميل الصفحة أو البيانات
        }
      },
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
          width: "60%",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderRadius: "12px",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: `0px 6px 20px ${
            theme.palette.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.4)"} `,
          zIndex: 1300,
        }}
      >
        {/* العداد وزر إلغاء التحديد */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
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
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: theme.palette.text.secondary,
            }}
          >
            Deselect all
          </Button>
        </Box>

        {/* الأكشنات في المنتصف */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          {actions
            .filter((action) => action.visible?.(selectedCount))
            .map((action, index) => (
              <Tooltip title={action.text} key={index}>
                <IconButton color={action.color || "inherit"} onClick={action.onClick} disabled={isLoading}>
                  {action.icon}
                </IconButton>
              </Tooltip>
            ))}
        </Box>

        {/* زر الإغلاق في أقصى اليمين */}
        <Box sx={{ ml: "auto" }}>
          <IconButton color="inherit" onClick={onDeselectAll}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    )
  );
};

export default HeardTabelActions;
