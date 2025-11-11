"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, IconButton, Select, MenuItem, Menu } from '@mui/material';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon, Settings as SettingsIcon } from '@mui/icons-material';
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => setMounted(true), []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Get available theme names
  const availableThemeNames = Object.keys(themes);

  if (!mounted) return null;
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Left side: Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <img src="/bdx0-logo.svg" alt="BDX0 Logo" style={{ height: '24px', verticalAlign: 'middle' }} />
            </Link>
          </Typography>
  
          {/* Right side: Menu items and Theme Selector */}
          <div className="flex items-center space-x-4">
            {navLinks.map((link) => (
              <Button key={link.href} component={Link} href={link.href} color="inherit">
                {link.label}
              </Button>
            ))}
  
            {/* Theme Selector Anchor Menu */}
            <IconButton
              aria-label="theme settings"
              aria-controls={open ? 'theme-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>
            <Menu
              id="theme-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'theme-settings-button',
              }}
            >
              {availableThemeNames.map((themeName) => (
                ['light', 'dark'].map((mode) => (
                  <MenuItem 
                    key={`${themeName}-${mode}`} 
                    onClick={() => {
                      setTheme(`${themeName}-${mode}`);
                      handleClose();
                    }}
                    selected={theme === `${themeName}-${mode}`}
                  >
                    {`${themeName} ${mode}`}
                  </MenuItem>
                ))
              ))}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }