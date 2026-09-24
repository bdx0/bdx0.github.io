"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DEFAULT_UI_THEME,
  getUiTheme,
  uiThemes,
} from "./registry";
import type { UiThemeDefinition, UiThemeId } from "./types";

const STORAGE_KEY = "ui-theme";

type UiThemeContextValue = {
  uiThemeId: UiThemeId;
  uiTheme: UiThemeDefinition;
  setUiThemeId: (id: UiThemeId) => void;
};

const UiThemeContext = createContext<UiThemeContextValue | null>(null);

export function UiThemeProvider({ children }: { children: React.ReactNode }) {
  const [uiThemeId, setUiThemeIdState] =
    useState<UiThemeId>(DEFAULT_UI_THEME);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && saved in uiThemes) {
      setUiThemeIdState(saved as UiThemeId);
    }
  }, []);

  const setUiThemeId = useCallback((id: UiThemeId) => {
    setUiThemeIdState(id);
    window.localStorage.setItem(STORAGE_KEY, id);
  }, []);

  const value = useMemo(
    () => ({
      uiThemeId,
      uiTheme: getUiTheme(uiThemeId),
      setUiThemeId,
    }),
    [uiThemeId, setUiThemeId],
  );

  return (
    <UiThemeContext.Provider value={value}>
      {children}
    </UiThemeContext.Provider>
  );
}

export function useUiTheme() {
  const context = useContext(UiThemeContext);

  if (!context) {
    throw new Error("useUiTheme must be used within UiThemeProvider");
  }

  return context;
}
