"use client";

import themes from "@/app/theme"; // Import themes
import { Settings as SettingsIcon } from "@mui/icons-material";
import {
  AppBar,
  Button,
  IconButton,
  Popover,
  Toolbar,
  Typography,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo"; // Import the new Logo component
import ThemeSelector from "./ThemeSelector";

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
  const muiTheme = useMuiTheme(); // Get the MUI theme object
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

  if (!mounted) return null;
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Left side: Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Logo
              color1={muiTheme.palette.text.secondary}
              color2={muiTheme.palette.text.primary}
              height="24px"
            />
          </Link>
        </Typography>

        {/* Right side: Menu items and Theme Selector */}
        <div className="flex items-center space-x-4">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              component={Link}
              href={link.href}
              color="inherit"
            >
              {link.label}
            </Button>
          ))}

          {/* Theme Selector Anchor Popover */}
          <IconButton
            aria-label="theme settings"
            onClick={handleClick}
            color="inherit"
          >
            <SettingsIcon />
          </IconButton>
          <Popover
            id="theme-menu"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <div style={{ padding: '16px' }}>
              <ThemeSelector />
            </div>
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  );
}