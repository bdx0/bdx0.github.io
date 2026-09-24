"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "next-themes";
import React, { useEffect, useMemo, useState } from "react";

import colorSchemes, { type ColorMode, type ColorSchemeId } from "./theme";
import { useUiTheme } from "@/themes/UiThemeProvider";

export function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme: colorThemeNameAndMode } = useTheme();
  const { uiTheme } = useUiTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const muiTheme = useMemo(() => {
    const [schemeName, mode] = colorThemeNameAndMode
      ? colorThemeNameAndMode.split("-")
      : ["material", "light"];

    const getTheme = colorSchemes[schemeName as ColorSchemeId] ?? colorSchemes.material;

    return getTheme(
      (mode === "dark" ? "dark" : "light") as ColorMode,
      uiTheme,
    );
  }, [colorThemeNameAndMode, uiTheme]);

  useEffect(() => {
    if (mounted) {
      document.body.style.backgroundColor = muiTheme.palette.background.default;
      document.documentElement.dataset.uiTheme = uiTheme.id;
    }
  }, [muiTheme, mounted, uiTheme.id]);

  if (!mounted) {
    return null;
  }

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={muiTheme} key={`${uiTheme.id}-${colorThemeNameAndMode}`}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
