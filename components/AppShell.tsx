"use client";

import {
  ArrowBack,
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
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import Logo from "./Logo";
import SettingsPanel from "./SettingsPanel";


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
  const router = useRouter();
  const muiTheme = useMuiTheme();
  const { shell, surfaces } = muiTheme.site;
  const drawerWidth = shell.drawerWidth;
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
            borderRadius: surfaces.navRadius,
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
                borderRadius: surfaces.navRadius,
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
            borderRadius: surfaces.navRadius,
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
            borderRadius: surfaces.navRadius,
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
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Toolbar sx={{ minHeight: `${shell.topBarHeight}px !important`, gap: 1 }}>
          {pathname !== "/" && (
            <Tooltip title="Back">
              <IconButton
                edge="start"
                onClick={() => {
                  if (window.history.length > 1) {
                    router.back();
                  } else {
                    router.push("/");
                  }
                }}
                aria-label="Back"
              >
                <ArrowBack />
              </IconButton>
            </Tooltip>
          )}
          <IconButton
            edge={pathname === "/" ? "start" : false}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, flexGrow: 1 }}>
            {isBlogRoute ? "Blog" : "BDX0"}
          </Typography>
          <Tooltip title="Settings">
            <IconButton
              onClick={(event) => setSettingsAnchor(event.currentTarget)}
              aria-label="Open settings"
            >
              <SettingsOutlined />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box component="nav" aria-label="Primary navigation">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
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
          pt: `${shell.topBarHeight}px`,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: isBlogRoute ? shell.blogMaxWidth : shell.contentMaxWidth,
            mx: "auto",
            px: shell.paddingX,
            py: shell.paddingY,
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
        <Box sx={{ p: 2, width: 320, maxWidth: "calc(100vw - 32px)" }}>
          <SettingsPanel />
        </Box>
      </Popover>
    </Box>
  );
}
