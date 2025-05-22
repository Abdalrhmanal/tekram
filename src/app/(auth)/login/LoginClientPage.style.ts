import { SxProps, Theme } from "@mui/system";

export const loginPageContainer: SxProps<Theme> = {
  // backgroundImage: "linear-gradient(34.75deg, #F5F2F4 11.19%, #E8F2FA 110.59%)",
  minHeight: "91vh",
  flexDirection: "column",
  justifyItems: "center",
  justifyContent: "center",
  display: "flex",
};

export const formContainer: SxProps<Theme> = {
  display: "flex",
  px: 16,
  flexDirection: "column",
  gap: "10px",
  mx: "auto",
  justifyItems: "center",
  justifyContent: "center",
};

export const imageContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "center",
};

export const h1Text: SxProps<Theme> = {
  fontSize: "30px",
  fontWeight: "600",
  lineHeight: "38px",
  textAlign: "center",
  color: "text.primary",
};

export const pText: SxProps<Theme> = {
  fontSize: "1rem",
  fontWeight: "400",
  lineHeight: "24px",
  textAlign: "center",
  color: "text.primary",
};

export const submitBtn: SxProps<Theme> = {
  marginTop: "10px",
  backgroundColor: "primary.main",
  borderRadius: "0.5rem",
  textTransform: "capitalize", // Prevents MUI's default uppercase transformation
};

export const googleBtn: SxProps<Theme> = {
  marginTop: "10px",
  alignItems: "center",
  textTransform: "capitalize",
  display: "flex",
  gap: "8px",
  borderRadius: "0.5rem",
  backgroundColor: "background.paper",
  color: "text.primary",
};

export const haveAccont: SxProps<Theme> = {
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  gap: "8px",
};

export const formContainerBody: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
