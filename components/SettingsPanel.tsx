"use client";

import { Divider, Stack, Typography } from "@mui/material";

import ThemeSelector from "./ThemeSelector";

export default function SettingsPanel() {
  return (
    <Stack spacing={2}>
      <div>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage interface and display preferences.
        </Typography>
      </div>

      <Divider />

      <ThemeSelector />
    </Stack>
  );
}
