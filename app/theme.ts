'use client';

import { createTheme } from '@mui/material/styles';

import type { UiThemeDefinition } from '@/themes/types';

export type ColorSchemeId = 'solarized' | 'material';
export type ColorMode = 'light' | 'dark';

const withUiTheme = (uiTheme: UiThemeDefinition) => ({
  site: uiTheme.tokens,
  typography: {
    fontFamily: uiTheme.typography.fontFamily,
  },
});

// Selenized palette, kept under the historical "solarized" id for compatibility.
const getSolarizedTheme = (
  mode: ColorMode,
  uiTheme: UiThemeDefinition,
) =>
  createTheme({
    ...withUiTheme(uiTheme),
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#4695f7' : '#006dce',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: mode === 'dark' ? '#fa5750' : '#cc1729',
        contrastText: '#FFFFFF',
      },
      background: {
        default: mode === 'dark' ? '#103c48' : '#fbf3db',
        paper: mode === 'dark' ? '#184956' : '#ece3cc',
      },
      text: {
        primary: mode === 'dark' ? '#adbcbc' : '#53676d',
        secondary: mode === 'dark' ? '#72898f' : '#3a4d53',
      },
    },
  });

const getMaterialTheme = (
  mode: ColorMode,
  uiTheme: UiThemeDefinition,
) =>
  createTheme({
    ...withUiTheme(uiTheme),
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#90CAF9' : '#1976D2',
      },
      secondary: {
        main: mode === 'dark' ? '#CE93D8' : '#9C27B0',
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#FFFFFF',
        paper: mode === 'dark' ? '#1E1E1E' : '#F5F5F5',
      },
      text: {
        primary: mode === 'dark' ? '#FFFFFF' : '#000000',
        secondary: mode === 'dark' ? '#B0B0B0' : '#555555',
      },
    },
  });

const colorSchemes = {
  solarized: getSolarizedTheme,
  material: getMaterialTheme,
};

export default colorSchemes;
