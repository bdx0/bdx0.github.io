"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import themes from "./theme";

export function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme: nextThemeNameAndMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const muiTheme = React.useMemo(() => {
    const [themeName, mode] = nextThemeNameAndMode
      ? nextThemeNameAndMode.split("-")
      : ["solarized", "dark"];
    const getThemeFunction = themes[themeName as keyof typeof themes];
    return getThemeFunction
      ? getThemeFunction(mode as "light" | "dark")
      : themes.solarized("dark");
  }, [nextThemeNameAndMode]);

  useEffect(() => {
    if (mounted) {
      document.body.style.backgroundColor = muiTheme.palette.background.default;
    }
  }, [muiTheme, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={muiTheme} key={nextThemeNameAndMode}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
