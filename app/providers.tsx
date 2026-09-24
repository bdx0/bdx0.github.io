"use client";

import { ThemeProvider } from "next-themes";

import colorSchemes from "./theme";
import { MuiThemeWrapper } from "./MuiThemeWrapper";
import { UiThemeProvider } from "@/themes/UiThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const colorThemeNames = Object.keys(colorSchemes).flatMap((schemeName) =>
    ["light", "dark"].map((mode) => `${schemeName}-${mode}`),
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="material-light"
      enableSystem={false}
      storageKey="color-theme"
      themes={colorThemeNames}
    >
      <UiThemeProvider>
        <MuiThemeWrapper>{children}</MuiThemeWrapper>
      </UiThemeProvider>
    </ThemeProvider>
  );
}
