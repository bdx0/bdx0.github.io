"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, IconButton, Select, MenuItem } from '@mui/material';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';
import { useTheme } from "next-themes";
import themes from "@/app/theme"; // Import themes

// Define a type for the navigation links for better type-checking
interface NavLink {
  href: string;
  label: string;
}

// Navigation links data
const navLinks: NavLink[] = [
  { href: "/", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" }, // Link to the new resume page
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Get available theme names
  const availableThemeNames = Object.keys(themes);

  if (!mounted) return null;
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Left side: Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              BDX0
            </Link>
          </Typography>
  
          {/* Right side: Menu items and Theme Selector */}
          <div className="flex items-center space-x-4">
            {navLinks.map((link) => (
              <Button key={link.href} component={Link} href={link.href}>
                {link.label}
              </Button>
            ))}
  
            {/* Theme Selector */}
            <Select
              value={theme}
              onChange={(event) => setTheme(event.target.value as string)}
              size="small"
            >
              {availableThemeNames.map((themeName) => (
                ['light', 'dark'].map((mode) => (
                  <MenuItem key={`${themeName}-${mode}`} value={`${themeName}-${mode}`}>
                    {`${themeName} ${mode}`}
                  </MenuItem>
                ))
              ))}
            </Select>
          </div>
        </Toolbar>
      </AppBar>
    );
  }