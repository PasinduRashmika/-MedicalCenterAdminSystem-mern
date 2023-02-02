import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { getColorPalette } from "./colors";
import { primaryFont, typeScale } from "./typography";

//mui theme setting
export const themeSettings = (mode) => {
  const colors = getColorPalette(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.green,
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            //for light mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.green,
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.white,
            },
          }),
    },
    typography: {
      fontFamily: primaryFont,
      fontSize: typeScale.default,
      h1: {
        fontFamily: primaryFont,
        fontSize: typeScale.h1,
      },
      h2: {
        fontFamily: primaryFont,
        fontSize: typeScale.h2,
      },
      h3: {
        fontFamily: primaryFont,
        fontSize: typeScale.h3,
      },
      h4: {
        fontFamily: primaryFont,
        fontSize: typeScale.h4,
      },
      h5: {
        fontFamily: primaryFont,
        fontSize: typeScale.h5,
      },
      h6: {
        fontFamily: primaryFont,
        fontSize: typeScale.h6,
      },
    },
  };
};

//context for change the color
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  //storing the mode state
  const [mode, setMode] = useState("dark");

  //function to change the theme
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevState) => (prevState === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  //passing the color theme to the mui theme according to the mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
