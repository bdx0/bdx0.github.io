"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { MuiThemeWrapper } from "./MuiThemeWrapper"; // Import MuiThemeWrapper
import themes from "./theme"; // Import themes

export function Providers({ children }: { children: React.ReactNode }) {
  const themeNames = Object.keys(themes).flatMap(themeName => ['light', 'dark'].map(mode => `${themeName}-${mode}`));

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme" themes={themeNames}>
      <MuiThemeWrapper>
        {children}
      </MuiThemeWrapper>
    </ThemeProvider>
  );
}
