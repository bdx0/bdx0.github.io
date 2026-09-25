"use client";

import {
  AppsOutlined,
  ArrowBack,
  ArticleOutlined,
  ContentCopyOutlined,
  ExitToApp,
  FolderOutlined,
  HomeOutlined,
  InfoOutlined,
  Menu as MenuIcon,
  MoreVert,
  OpenInNew,
  Refresh,
  SettingsOutlined,
  WorkOutline,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogContent,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

import Logo from "./Logo";
import SettingsPanel from "./SettingsPanel";


const workItems = [
  { href: "/projects", label: "Projects", icon: FolderOutlined },
  { href: "/blog", label: "Blog", icon: ArticleOutlined },
  { href: "/apps", label: "Apps", icon: AppsOutlined },
];

type MiniAppMeta = {
  name: string;
  version: string;
  category: string;
  publisher: string;
  description: string;
  mark: string;
  standaloneUrl: string;
};

const miniApps: Record<string, MiniAppMeta> = {
  "/apps/knowledge": {
    name: "BDX0 Knowledge",
    version: "0.3.0",
    category: "Knowledge workspace",
    publisher: "BDX0 Apps",
    description: "Không gian đọc, tìm kiếm và khai thác Blog + Knowledge được quản lý bằng Notion.",
    mark: "KN",
    standaloneUrl: "https://notion-cms-mauve.vercel.app/",
  },
  "/apps/dau-thau": {
    name: "Đấu Thầu 360",
    version: "0.3.0",
    category: "Legal workspace",
    publisher: "BDX0 Apps",
    description: "Tra cứu pháp luật, sàng lọc nghiệp vụ, quy trình và trợ lý AI cho công tác đấu thầu.",
    mark: "ĐT",
    standaloneUrl: "https://dau-thau-law-portal.vercel.app/",
  },
  "/apps/yi-jing": {
    name: "Kinh Dịch",
    version: "0.1.0",
    category: "Tool",
    publisher: "BDX0 Apps",
    description: "Gieo quẻ, tra cứu 64 quẻ và xem quẻ biến.",
    mark: "☯",
    standaloneUrl: "https://yi-jing-khaki.vercel.app/",
  },
  "/apps/office": {
    name: "Office Kit",
    version: "0.1.0",
    category: "Utility",
    publisher: "BDX0 Apps",
    description: "Bộ công cụ nhỏ phục vụ xử lý công việc văn phòng.",
    mark: "OK",
    standaloneUrl: "https://bdx0.github.io/apps/office/",
  },
  "/apps/buddha": {
    name: "Phật Thích Ca 3D",
    version: "0.1.0",
    category: "3D",
    publisher: "BDX0 Apps",
    description: "Không gian 3D tương tác với tượng Phật và vòng halo.",
    mark: "佛",
    standaloneUrl: "https://bdx0.github.io/embedded/buddha/",
  },
  "/apps/ly-dragon": {
    name: "Rồng thời Lý 3D",
    version: "0.1.0",
    category: "3D",
    publisher: "BDX0 Apps",
    description: "Mô hình 3D tương tác lấy cảm hứng từ hình tượng rồng thời Lý.",
    mark: "龍",
    standaloneUrl: "https://bdx0.github.io/embedded/ly-dragon/",
  },
};

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
  const desktop = useMediaQuery(muiTheme.breakpoints.up("md"));
  const { shell, surfaces, navigation, density, mobile } = muiTheme.site;
  const drawerWidth = shell.drawerWidth;
  const selectedNavSx = {
    "&.Mui-selected": {
      bgcolor: navigation.selectedStyle === "filled" ? "action.selected" : "transparent",
      border: navigation.selectedStyle === "outlined" ? 1 : undefined,
      borderColor: "divider",
    },
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [appMenuOpen, setAppMenuOpen] = useState(false);
  const [appInfoOpen, setAppInfoOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const normalizedPathname =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const currentMiniApp = miniApps[normalizedPathname] ?? null;
  const miniAppTitle = currentMiniApp?.name ?? null;
  const miniAppUrl = currentMiniApp
    ? `https://bdx0.github.io${normalizedPathname}`
    : "";
  const isMiniAppRoute = currentMiniApp !== null;
  const isImmersiveAppRoute = isMiniAppRoute;

  // The SuperApp viewport stays fixed on every route. Pages and mini apps own
  // scrolling inside their respective content areas; the document never scrolls.
  // Do not lock or position body: it breaks scrolling after iOS back navigation.
  useEffect(() => {
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    const previousOverscroll = html.style.overscrollBehavior;

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";

    return () => {
      html.style.overflow = previousOverflow;
      html.style.overscrollBehavior = previousOverscroll;
    };
  }, []);


  const isBlogRoute =
    pathname === "/writing" ||
    pathname.startsWith("/writing/") ||
    pathname === "/blog" ||
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/tags/");
  const sectionTitle = isBlogRoute
    ? "Blog"
    : pathname.startsWith("/projects")
      ? "Projects"
      : pathname.startsWith("/apps")
        ? "Apps"
        : pathname.startsWith("/resume")
          ? "Resume"
          : pathname === "/" || pathname === "/me"
            ? "Home"
            : "BDX0";

  const nav = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          height: shell.topBarHeight,
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

      <List sx={{ px: 1.25, py: density.mode === "compact" ? 1 : 1.5 }}>
        <ListItemButton
          component={Link}
          href="/"
          selected={isActive(pathname, "/")}
          onClick={() => setMobileOpen(false)}
          sx={{
            borderRadius: surfaces.navRadius,
            minHeight: navigation.itemHeight + 2,
            ...selectedNavSx,
          }}
        >
          {navigation.showIcons && (
            <ListItemIcon sx={{ minWidth: navigation.iconWidth }}>
              <HomeOutlined fontSize="small" />
            </ListItemIcon>
          )}
          <ListItemText
            primary="Home"
            primaryTypographyProps={{
              fontSize: navigation.itemFontSize,
              fontWeight: isActive(pathname, "/") ? 700 : 500,
            }}
          />
        </ListItemButton>

        {navigation.style === "grouped" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              pt: navigation.sectionGap,
              pb: 0.75,
              color: "text.disabled",
            }}
          >
            {navigation.showIcons && <WorkOutline sx={{ fontSize: 16 }} />}
            <Typography
              variant="caption"
              sx={{
                fontSize: navigation.sectionFontSize,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Work
            </Typography>
          </Box>
        )}

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
                minHeight: navigation.itemHeight,
                pl: 2.25,
                ...selectedNavSx,
              }}
            >
              {navigation.showIcons && (
                <ListItemIcon sx={{ minWidth: navigation.iconWidth - 4 }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
              )}
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontSize: navigation.itemFontSize,
                  fontWeight: selected ? 700 : 500,
                }}
              />
            </ListItemButton>
          );
        })}

      </List>

      <Box sx={{ mt: "auto", p: 1.25 }}>
        <Divider sx={{ mb: 1 }} />

        <ListItemButton
          onClick={() => {
            setMobileOpen(false);
            setSettingsOpen(true);
          }}
          sx={{
            borderRadius: surfaces.navRadius,
            minHeight: navigation.itemHeight,
            mb: 0.5,
          }}
        >
          {navigation.showIcons && (
            <ListItemIcon sx={{ minWidth: navigation.iconWidth }}>
              <SettingsOutlined fontSize="small" />
            </ListItemIcon>
          )}
          <ListItemText
            primary="Settings"
            primaryTypographyProps={{
              fontSize: navigation.itemFontSize,
              fontWeight: 500,
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
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        width: "100%",
        maxWidth: "100vw",
        height: "100dvh",
        minHeight: 0,
        overflow: "hidden",
        overscrollBehavior: "none",
        bgcolor: "background.default",
      }}
    >
      {!isMiniAppRoute && (
        <AppBar
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{
            display: { xs: "flex", md: shell.variant === "sidebar-only" ? "none" : "flex" },
            borderBottom: surfaces.showBorders ? 1 : 0,
            borderColor: "divider",
            bgcolor: "background.paper",
            width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
            ml: { xs: 0, md: `${drawerWidth}px` },
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
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, flexGrow: 1 }}>
            {sectionTitle}
          </Typography>
          {isMiniAppRoute && (
            <Tooltip title="App menu">
              <IconButton
                onClick={() => {
                  setAppInfoOpen(false);
                  setAppMenuOpen(true);
                }}
                aria-label="App menu"
              >
                <MoreVert />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
        </AppBar>
      )}

      {isMiniAppRoute && (
        <Tooltip title="App menu">
          <IconButton
            onClick={() => {
              setAppInfoOpen(false);
              setAppMenuOpen(true);
            }}
            aria-label="App menu"
            sx={{
              position: "fixed",
              top: "max(12px, env(safe-area-inset-top))",
              right: 14,
              zIndex: (theme) => theme.zIndex.appBar + 2,
              width: 52,
              height: 44,
              borderRadius: 99,
              border: 1,
              borderColor: "divider",
              bgcolor: "rgba(255,255,255,.88)",
              color: "rgba(0,0,0,.86)",
              boxShadow: "0 4px 18px rgba(0,0,0,.16)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,.96)",
              },
            }}
          >
            <MoreVert />
          </IconButton>
        </Tooltip>
      )}

      {!isMiniAppRoute && (
        <Box component="nav" aria-label="Primary navigation">
          <Drawer
            variant="temporary"
            anchor={mobile.navigation === "bottom-sheet" ? "bottom" : "left"}
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                width: mobile.navigation === "bottom-sheet" ? "100%" : drawerWidth,
                maxHeight: mobile.navigation === "bottom-sheet" ? "85dvh" : undefined,
                borderTopLeftRadius: mobile.navigation === "bottom-sheet" ? 16 : 0,
                borderTopRightRadius: mobile.navigation === "bottom-sheet" ? 16 : 0,
                boxSizing: "border-box",
                bgcolor: "background.paper",
              },
            }}
          >
            {nav}
          </Drawer>

          <Drawer
            variant="permanent"
            open={desktop}
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                borderRight: surfaces.showBorders ? 1 : 0,
                borderColor: "divider",
                bgcolor: "background.paper",
                boxShadow: surfaces.style === "elevated" ? 2 : "none",
              },
            }}
          >
            {nav}
          </Drawer>
        </Box>
      )}

      <Box
        component="main"
        sx={{
          height: "100%",
          minHeight: 0,
          boxSizing: "border-box",
          pt: isImmersiveAppRoute
            ? 0
            : {
                xs: `${shell.topBarHeight}px`,
                md: shell.variant === "sidebar-only" ? 0 : `${shell.topBarHeight}px`,
              },
          ml: isImmersiveAppRoute ? 0 : { xs: 0, md: `${drawerWidth}px` },
          width: isImmersiveAppRoute
            ? "100%"
            : { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: isImmersiveAppRoute
              ? "none"
              : isBlogRoute
                ? shell.blogMaxWidth
                : shell.contentMaxWidth,
            height: "100%",
            minHeight: 0,
            flex: "1 1 auto",
            mx: "auto",
            px: isImmersiveAppRoute ? 0 : shell.paddingX,
            py: isImmersiveAppRoute ? 0 : shell.paddingY,
            overflowX: "hidden",
            overflowY: isImmersiveAppRoute ? "hidden" : "auto",
            overscrollBehaviorY: isImmersiveAppRoute ? "none" : "contain",
            WebkitOverflowScrolling: isImmersiveAppRoute ? undefined : "touch",
          }}
        >
          {children}
        </Box>
      </Box>

      <Drawer
        anchor="bottom"
        open={appMenuOpen && isMiniAppRoute}
        onClose={() => setAppMenuOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            overflowY: appInfoOpen ? "auto" : "hidden",
            maxHeight: appInfoOpen ? "68dvh" : "min(240px, 34dvh)",
            bgcolor: "background.paper",
          },
        }}
      >
        {currentMiniApp && (
          <Box
            sx={{
              width: "100%",
              maxWidth: 680,
              mx: "auto",
              px: { xs: 1.5, sm: 2 },
              pt: 0.9,
              pb: "max(10px, env(safe-area-inset-bottom))",
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 4,
                borderRadius: 99,
                bgcolor: "action.disabledBackground",
                mx: "auto",
                mb: 1.25,
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.1, mb: 1.25 }}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  bgcolor: "action.selected",
                  border: 1,
                  borderColor: "divider",
                  fontWeight: 800,
                  fontSize: 15,
                }}
              >
                {currentMiniApp.mark}
              </Box>
              <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.15 }}>
                  {currentMiniApp.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.2, display: "block" }}>
                  {currentMiniApp.publisher} · v{currentMiniApp.version}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                px: 1,
                py: 0.45,
                mb: 1.25,
                bgcolor: "action.hover",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  flexGrow: 1,
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontFamily: "monospace",
                }}
              >
                {miniAppUrl}
              </Typography>
              <Tooltip title="Copy link">
                <IconButton
                  size="small"
                  onClick={async () => {
                    await navigator.clipboard.writeText(miniAppUrl);
                    setCopied(true);
                  }}
                  aria-label="Copy app link"
                >
                  <ContentCopyOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 0.75,
                mb: appInfoOpen ? 1.1 : 0,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setAppInfoOpen((value) => !value)}
                sx={{
                  minWidth: 0,
                  minHeight: 62,
                  borderRadius: 2,
                  px: 0.5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.35,
                  textTransform: "none",
                  fontSize: 12,
                }}
              >
                <InfoOutlined fontSize="small" />
                Info
              </Button>
              <Button
                variant="outlined"
                onClick={() => window.location.reload()}
                sx={{
                  minWidth: 0,
                  minHeight: 62,
                  borderRadius: 2,
                  px: 0.5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.35,
                  textTransform: "none",
                  fontSize: 12,
                }}
              >
                <Refresh fontSize="small" />
                Reload
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  window.open(currentMiniApp.standaloneUrl, "_blank", "noopener,noreferrer")
                }
                sx={{
                  minWidth: 0,
                  minHeight: 62,
                  borderRadius: 2,
                  px: 0.5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.35,
                  textTransform: "none",
                  fontSize: 12,
                }}
              >
                <OpenInNew fontSize="small" />
                Open
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setAppMenuOpen(false);
                  router.push("/apps");
                }}
                sx={{
                  minWidth: 0,
                  minHeight: 62,
                  borderRadius: 2,
                  px: 0.5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.35,
                  textTransform: "none",
                  fontSize: 12,
                }}
              >
                <ExitToApp fontSize="small" />
                Quit
              </Button>
            </Box>

            <Collapse in={appInfoOpen}>
              <Box
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 1.25,
                  mb: 0,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                  App info
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: "96px 1fr", rowGap: 0.75 }}>
                  <Typography variant="body2" color="text.secondary">Name</Typography>
                  <Typography variant="body2">{currentMiniApp.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Version</Typography>
                  <Typography variant="body2">{currentMiniApp.version}</Typography>
                  <Typography variant="body2" color="text.secondary">Type</Typography>
                  <Typography variant="body2">{currentMiniApp.category}</Typography>
                  <Typography variant="body2" color="text.secondary">Publisher</Typography>
                  <Typography variant="body2">{currentMiniApp.publisher}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1.25, lineHeight: 1.6 }}>
                  {currentMiniApp.description}
                </Typography>
              </Box>
            </Collapse>

          </Box>
        )}
      </Drawer>

      <Snackbar
        open={copied}
        autoHideDuration={1800}
        onClose={() => setCopied(false)}
        message="Đã sao chép đường dẫn ứng dụng"
      />

      {mobile.settings === "dialog" || desktop ? (
        <Dialog
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          fullWidth
          maxWidth="xs"
          aria-label="Settings"
        >
          <DialogContent sx={{ p: { xs: 2, sm: 2.5 } }}>
            <SettingsPanel />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          anchor="bottom"
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          PaperProps={{
            sx: {
              borderTopLeftRadius: surfaces.baseRadius * 4,
              borderTopRightRadius: surfaces.baseRadius * 4,
              maxHeight: "85dvh",
              overflowY: "auto",
            },
          }}
        >
          <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
            <SettingsPanel />
          </Box>
        </Drawer>
      )}
    </Box>
  );
}
