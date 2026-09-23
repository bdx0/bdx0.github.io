"use client";

import {
  ArticleOutlined,
  DescriptionOutlined,
  FolderOutlined,
  HomeOutlined,
  ScienceOutlined,
  Menu as MenuIcon,
  SettingsOutlined,
  WorkOutline,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import Logo from "./Logo";
import ThemeSelector from "./ThemeSelector";

const drawerWidth = 248;

const workItems = [
  { href: "/projects", label: "Projects", icon: FolderOutlined },
  { href: "/blog", label: "Blog", icon: ArticleOutlined },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/" || pathname === "/me";
  }

  if (href === "/blog") {
    return (
      pathname === "/writing" ||
      pathname.startsWith("/writing/") ||
      pathname === "/blog" ||
      pathname.startsWith("/blog/") ||
      pathname.startsWith("/tags/")
    );
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsAnchor, setSettingsAnchor] = useState<HTMLElement | null>(null);
  const isBlogRoute =
    pathname === "/writing" ||
    pathname.startsWith("/writing/") ||
    pathname === "/blog" ||
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/tags/");

  const nav = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          height: 64,
          px: 2.25,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link href="/" aria-label="BDX0 home">
          <Logo color1="currentColor" color2="currentColor" height="26px" />
        </Link>
      </Box>

      <Divider />

      <List sx={{ px: 1.25, py: 1.5 }}>
        <ListItemButton
          component={Link}
          href="/"
          selected={isActive(pathname, "/")}
          onClick={() => setMobileOpen(false)}
          sx={{
            borderRadius: 2,
            minHeight: 44,
            "&.Mui-selected": { bgcolor: "action.selected" },
          }}
        >
          <ListItemIcon sx={{ minWidth: 38 }}>
            <HomeOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: isActive(pathname, "/") ? 700 : 500,
            }}
          />
        </ListItemButton>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            pt: 2.5,
            pb: 0.75,
            color: "text.disabled",
          }}
        >
          <WorkOutline sx={{ fontSize: 16 }} />
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            Work
          </Typography>
        </Box>

        {workItems.map(({ href, label, icon: Icon }) => {
          const selected = isActive(pathname, href);

          return (
            <ListItemButton
              key={href}
              component={Link}
              href={href}
              selected={selected}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                minHeight: 42,
                pl: 2.25,
                "&.Mui-selected": { bgcolor: "action.selected" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 34 }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: selected ? 700 : 500,
                }}
              />
            </ListItemButton>
          );
        })}

        <ListItemButton
          component={Link}
          href="/lab"
          selected={isActive(pathname, "/lab")}
          onClick={() => setMobileOpen(false)}
          sx={{
            borderRadius: 2,
            mt: 1.5,
            minHeight: 42,
            "&.Mui-selected": { bgcolor: "action.selected" },
          }}
        >
          <ListItemIcon sx={{ minWidth: 38 }}>
            <ScienceOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Lab"
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: isActive(pathname, "/lab") ? 700 : 500,
            }}
          />
        </ListItemButton>
      </List>

      <Box sx={{ mt: "auto", p: 1.25 }}>
        <Divider sx={{ mb: 1 }} />

        <ListItemButton
          component={Link}
          href="/resume"
          selected={isActive(pathname, "/resume")}
          onClick={() => setMobileOpen(false)}
          sx={{
            borderRadius: 2,
            minHeight: 42,
            mb: 0.5,
            "&.Mui-selected": { bgcolor: "action.selected" },
          }}
        >
          <ListItemIcon sx={{ minWidth: 38 }}>
            <DescriptionOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Resume"
            primaryTypographyProps={{
              fontSize: 14,
              fontWeight: isActive(pathname, "/resume") ? 700 : 500,
            }}
          />
        </ListItemButton>

        <ListItemButton
          onClick={(event) => setSettingsAnchor(event.currentTarget)}
          sx={{ borderRadius: 2, minHeight: 42 }}
        >
          <ListItemIcon sx={{ minWidth: 38 }}>
            <SettingsOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Appearance"
            primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
          />
        </ListItemButton>

        <Typography
          variant="caption"
          color="text.disabled"
          sx={{ display: "block", px: 2, pt: 1.5 }}
        >
          bdx0.github.io
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          display: { md: "none" },
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Toolbar sx={{ minHeight: "56px !important", gap: 1 }}>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, flexGrow: 1 }}>
            {isBlogRoute ? "Blog" : "BDX0"}
          </Typography>
          <Tooltip title="Appearance">
            <IconButton
              onClick={(event) => setSettingsAnchor(event.currentTarget)}
              aria-label="Appearance settings"
            >
              <SettingsOutlined />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box component="nav" aria-label="Primary navigation">
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: 1,
              borderColor: "divider",
              bgcolor: "background.paper",
            },
          }}
          open
        >
          {nav}
        </Drawer>

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: "background.paper",
            },
          }}
        >
          {nav}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          ml: { md: `${drawerWidth}px` },
          pt: { xs: "56px", md: 0 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: isBlogRoute ? 1520 : 1120,
            mx: "auto",
            px: { xs: 2, sm: 3, lg: 4 },
            py: { xs: 2.5, md: 4 },
          }}
        >
          {children}
        </Box>
      </Box>

      <Popover
        open={Boolean(settingsAnchor)}
        anchorEl={settingsAnchor}
        onClose={() => setSettingsAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ p: 2, width: 280 }}>
          <ThemeSelector />
        </Box>
      </Popover>
    </Box>
  );
}
