"use client";

import colorSchemes from "@/app/theme";
import { useUiTheme } from "@/themes/UiThemeProvider";
import { uiThemes } from "@/themes/registry";
import type { UiThemeId } from "@/themes/types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const { uiThemeId, uiTheme, setUiThemeId } = useUiTheme();
  const [scheme, setScheme] = useState("material");
  const [mode, setMode] = useState("light");

  useEffect(() => {
    if (!theme) return;

    const [nextScheme, nextMode] = theme.split("-");
    setScheme(nextScheme || "material");
    setMode(nextMode === "dark" ? "dark" : "light");
  }, [theme]);

  const handleSchemeChange = (event: SelectChangeEvent<string>) => {
    const nextScheme = event.target.value;
    setScheme(nextScheme);
    setTheme(`${nextScheme}-${mode}`);
  };

  const handleModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    nextMode: string | null,
  ) => {
    if (!nextMode) return;

    setMode(nextMode);
    setTheme(`${scheme}-${nextMode}`);
  };

  return (
    <Stack spacing={2}>
      <div>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Appearance
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Interface themes control layout and component styling. Colors and mode
          can be changed independently.
        </Typography>
      </div>

      <FormControl fullWidth size="small">
        <InputLabel id="ui-theme-select-label">Interface</InputLabel>
        <Select
          labelId="ui-theme-select-label"
          id="ui-theme-select"
          value={uiThemeId}
          label="Interface"
          onChange={(event) => setUiThemeId(event.target.value as UiThemeId)}
        >
          {Object.values(uiThemes).map((definition) => (
            <MenuItem key={definition.id} value={definition.id}>
              {definition.label}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75 }}>
          {uiTheme.description}
        </Typography>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel id="color-scheme-select-label">Colors</InputLabel>
        <Select
          labelId="color-scheme-select-label"
          id="color-scheme-select"
          value={scheme}
          label="Colors"
          onChange={handleSchemeChange}
        >
          {Object.keys(colorSchemes).map((schemeName) => (
            <MenuItem key={schemeName} value={schemeName}>
              {schemeName === "solarized" ? "Selenized" : "Material"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleModeChange}
        aria-label="color mode"
        fullWidth
        size="small"
      >
        <ToggleButton value="light" aria-label="light mode">
          Light
        </ToggleButton>
        <ToggleButton value="dark" aria-label="dark mode">
          Dark
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
