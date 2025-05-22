import { Box, Typography } from "@mui/material";

export default function TitleSection({
  title,
  type,
  icon,
  children,
}: {
  title: string;
  type: "primary" | "danger" | "normal" | "secondary";
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  const color = {
    primary: "primary.main",
    secondary: "primary.contrastText",
    normal: "text.primary",
    danger: "error.main",
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        gap: "64px",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          gap: "5px",
          color: color[type],
        }}
      >
        {icon}
        <Typography
          sx={{
            fontSize: "24px",
            fontFamily: "karla",
          }}
          variant="h4"
        >
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}
