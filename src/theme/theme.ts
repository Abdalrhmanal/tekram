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

// دالة إنشاء الثيم حسب اللون والوضع
const getTheme = (
  color: "blue" | "green" | "red" | "yellow" | "purple" | "darkBlue",
  mode: "light" | "dark"
) => {
  // الألوان الأساسية حسب اللون المختار
  const colors = {
    blue: {
      main: "#2196f8",
      light: "#ddecff",
      dark: "#1565c0",
      contrastText: "#fdfdfd",
    },
    green: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "#fdfdfd",
    },
    red: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#fdfdfd",
    },
    yellow: {
      main: "#ffeb3b",
      light: "#fff176",
      dark: "#fbc02d",
      contrastText: "#212121",
    },
    purple: {
      main: "#673ab7",
      light: "#9575cd",
      dark: "#4527a0",
      contrastText: "#fdfdfd",
    },
    darkBlue: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#115293",
      contrastText: "#fdfdfd",
    },
  };

  // ألوان الخلفية حسب اللون والوضع
  const backgroundByColor: Record<
    keyof typeof colors,
    { light: string; dark: string }
  > = {
    blue: {
      light: "#DDECFF",
      dark: "#102A43",
    },
    green: {
      light: "#E6F4EA",
      dark: "#1B3C2E",
    },
    red: {
      light: "#FFE8E8",
      dark: "#3B1F1F",
    },
    yellow: {
      light: "#FFFDE7",
      dark: "#3B3700",
    },
    purple: {
      light: "#EDE7F6",
      dark: "#2D1A47",
    },
    darkBlue: {
      light: "#E3F2FD",
      dark: "#0D1B2A",
    },
  };

  const baseTheme: ThemeOptions = {
    palette: {
      mode,
      primary: colors[color],
      error: {
        main: "#f54646",
        light: "#fddada",
        dark: "#9a0007",
        contrastText: "#fdfdfd",
      },
      success: {
        main: "#34c759",
        light: "#c9ffd6",
        dark: "#2E7D32",
      },
      grey: {
        100: "#eeeeee",
        200: "#d5d7da",
        300: "#a0a0a0",
        400: "#717680",
      },
      text: {
        primary: mode === "light" ? "#212121" : "#fdfdfd",
        secondary: mode === "light" ? "#757575" : "#BDBDBD",
      },
      background: {
        default: backgroundByColor[color][mode],
        paper: mode === "light" ? "#fdfdfd" : "#424242",
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
