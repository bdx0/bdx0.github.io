"use client";

import themes from "@/app/theme";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [style, setStyle] = useState("material");
  const [mode, setMode] = useState("light");

  const availableStyles = Object.keys(themes);

  useEffect(() => {
    if (theme) {
      const [style, mode] = theme.split("-");
      setStyle(style);
      setMode(mode);
    }
  }, [theme]);

  const handleStyleChange = (event: any) => {
    const newStyle = event.target.value;
    setStyle(newStyle);
    setTheme(`${newStyle}-${mode}`);
  };

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: string | null
  ) => {
    if (newMode !== null) {
      setMode(newMode);
      setTheme(`${style}-${newMode}`);
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Select Theme
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="style-select-label">Style</InputLabel>
        <Select
          labelId="style-select-label"
          id="style-select"
          value={style}
          label="Style"
          onChange={handleStyleChange}
        >
          {availableStyles.map((styleName) => (
            <MenuItem key={styleName} value={styleName}>
              {styleName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleModeChange}
        aria-label="theme mode"
        fullWidth
      >
        <ToggleButton value="light" aria-label="light mode">
          Light
        </ToggleButton>
        <ToggleButton value="dark" aria-label="dark mode">
          Dark
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}