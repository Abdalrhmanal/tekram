import { createTheme, ThemeOptions } from "@mui/material/styles";

// توسيع الواجهة لدعم ألوان الظل المخصصة
declare module "@mui/material/styles" {
  interface Palette {
    blueShadow: Palette["primary"];
    greenShadow: Palette["primary"];
    redShadow: Palette["primary"];
    yellowShadow: Palette["primary"];
    purpleShadow: Palette["primary"];
    darkBlueShadow: Palette["primary"];
  }
  interface PaletteOptions {
    blueShadow?: PaletteOptions["primary"];
    greenShadow?: PaletteOptions["primary"];
    redShadow?: PaletteOptions["primary"];
    yellowShadow?: PaletteOptions["primary"];
    purpleShadow?: PaletteOptions["primary"];
    darkBlueShadow?: PaletteOptions["primary"];
  }
}

const getTheme = (
  color: "blue" | "green" | "red" | "yellow" | "purple" | "darkBlue",
  mode: "light" | "dark"
) => {
  const colors = {
    blue: {
      main: "#2196f3",
      light: "#bbdefb",
      dark: "#1976d2",
      contrastText: "#ffffff",
    },
    green: {
      main: "#4caf50",
      light: "#c8e6c9",
      dark: "#388e3c",
      contrastText: "#ffffff",
    },
    red: {
      main: "#f44336",
      light: "#ffcdd2",
      dark: "#d32f2f",
      contrastText: "#ffffff",
    },
    yellow: {
      main: "#ffeb3b",
      light: "#fff9c4",
      dark: "#fbc02d",
      contrastText: "#212121",
    },
    purple: {
      main: "#673ab7",
      light: "#d1c4e9",
      dark: "#512da8",
      contrastText: "#ffffff",
    },
    darkBlue: {
      main: "#1565c0",
      light: "#90caf9",
      dark: "#0d47a1",
      contrastText: "#ffffff",
    },
  };

  const backgroundByColor: Record<
    keyof typeof colors,
    { light: string; dark: string }
  > = {
    blue: { light: "#e3f2fd", dark: "#0a1929" },
    green: { light: "#e8f5e9", dark: "#1b3c2e" },
    red: { light: "#ffebee", dark: "#3b1f1f" },
    yellow: { light: "#fffde7", dark: "#3b3700" },
    purple: { light: "#ede7f6", dark: "#2d1a47" },
    darkBlue: { light: "#e3f2fd", dark: "#0d1b2a" },
  };

  const baseTheme: ThemeOptions = {
    palette: {
      mode,
      primary: colors[color],
      error: {
        main: "#e53935",
        light: "#ffcdd2",
        dark: "#b71c1c",
        contrastText: "#ffffff",
      },
      success: {
        main: "#43a047",
        light: "#c8e6c9",
        dark: "#2e7d32",
        contrastText: "#ffffff",
      },
      grey: {
        100: "#f5f5f5",
        200: "#eeeeee",
        300: "#e0e0e0",
        400: "#bdbdbd",
        500: "#9e9e9e",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121",
      },
      text: {
        primary: mode === "light" ? "#212121" : "#ffffff",
        secondary: mode === "light" ? "#616161" : "#bdbdbd",
      },
      background: {
        default: backgroundByColor[color][mode],
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
      blueShadow: colors.blue,
      greenShadow: colors.green,
      redShadow: colors.red,
      yellowShadow: colors.yellow,
      purpleShadow: colors.purple,
      darkBlueShadow: colors.darkBlue,
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
      h1: { fontSize: "2.5rem", fontWeight: 700 },
      h2: { fontSize: "2rem", fontWeight: 600 },
      h3: { fontSize: "1.75rem", fontWeight: 600 },
      body1: { fontSize: "1rem", fontWeight: 400 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: "bold",
            padding: "10px 20px",
          },
        },
      },
    },
  };

  return createTheme(baseTheme);
};

export default getTheme;
