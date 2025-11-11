'use client';

import { createTheme } from '@mui/material/styles';

// Solarized Theme
const getSolarizedTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode: mode,
    primary: {
      main: '#268BD2', // Solarized Blue
    },
    secondary: {
      main: '#CB4B16', // Solarized Orange
    },
    background: {
      default: mode === 'dark' ? '#002B36' : '#FDF6E3', // Solarized Base03 for dark, Base3 for light
      paper: mode === 'dark' ? '#073642' : '#EEE8D5', // Solarized Base02 for dark, Base2 for light
    },
    text: {
      primary: mode === 'dark' ? '#839496' : '#586E75', // Solarized Base0 for dark, Base1 for light
      secondary: mode === 'dark' ? '#586E75' : '#839496', // Solarized Base1 for dark, Base0 for light
    },
  },
  typography: {
    fontFamily: 'var(--font-jetbrains-mono), monospace',
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
    fontFamily: 'Roboto, sans-serif', // Default Material Design font
  },
});

const themes = {
  solarized: getSolarizedTheme,
  material: getMaterialTheme,
};

export default themes;
