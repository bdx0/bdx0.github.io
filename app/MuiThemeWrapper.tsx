"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "next-themes"; // Import useTheme
import React from "react"; // Import React
import themes from "./theme"; // Import the themes object

export function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme: nextThemeNameAndMode } = useTheme(); // Get the current theme name and mode from next-themes

  const muiTheme = React.useMemo(() => {
    const [themeName, mode] = nextThemeNameAndMode
      ? nextThemeNameAndMode.split("-")
      : ["solarized", "dark"];
    const getThemeFunction = themes[themeName as keyof typeof themes];
    return getThemeFunction
      ? getThemeFunction(mode as "light" | "dark")
      : themes.solarized("dark");
  }, [nextThemeNameAndMode]);

  React.useEffect(() => {
    document.body.style.backgroundColor = muiTheme.palette.background.default;
  }, [muiTheme]);

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={muiTheme} key={nextThemeNameAndMode}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
