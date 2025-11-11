'use client';

import { createTheme } from '@mui/material/styles';

// Solarized Theme (now Selenized by Ed Heltzel)
const getSolarizedTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode: mode,
    primary: {
      main: mode === 'dark' ? '#4695f7' : '#006dce', // Selenized Blue
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: mode === 'dark' ? '#fa5750' : '#cc1729', // Selenized Red
      contrastText: '#FFFFFF',
    },
    background: {
      default: mode === 'dark' ? '#103c48' : '#fbf3db', // Selenized background
      paper: mode === 'dark' ? '#184956' : '#ece3cc', // Selenized black / base01
    },
    text: {
      primary: mode === 'dark' ? '#adbcbc' : '#53676d', // Selenized foreground / base05
      secondary: mode === 'dark' ? '#72898f' : '#3a4d53', // Selenized white / base07
    },
  },
  typography: {
    fontFamily: '"JetBrains Mono"',
  },
});

// Default Material Design Theme
const getMaterialTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode: mode,
    primary: {
      main: mode === 'dark' ? '#90CAF9' : '#1976D2', // Light blue for dark, blue for light
    },
    secondary: {
      main: mode === 'dark' ? '#CE93D8' : '#9C27B0', // Light purple for dark, purple for light
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
  typography: {
    fontFamily: '"JetBrains Mono"', // Default Material Design font
  },
});

const themes = {
  solarized: getSolarizedTheme,
  material: getMaterialTheme,
};

export default themes;
