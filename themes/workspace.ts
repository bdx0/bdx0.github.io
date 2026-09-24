import type { UiThemeDefinition } from "./types";

export const workspaceTheme: UiThemeDefinition = {
  id: "workspace",
  label: "Workspace",
  description:
    "Current BDX0 interface: compact app shell with a GitBook-style three-column blog reader.",
  tokens: {
    shell: {
      variant: "topbar-drawer",
      topBarHeight: 56,
      drawerWidth: 248,
      contentMaxWidth: 1120,
      blogMaxWidth: 1520,
      paddingX: { xs: 2, sm: 3, lg: 4 },
      paddingY: { xs: 2.5, md: 4 },
    },
    blog: {
      variant: "docs-three-column",
      articleMaxWidth: 760,
      navWidthLg: 200,
      navWidthXl: 230,
      tocWidthLg: 180,
      tocWidthXl: 210,
      gapLg: 3,
      gapXl: 5,
      stickyTop: 92,
      stickyBottomGap: 24,
    },
    surfaces: {
      baseRadius: 4,
      radius: 2,
      navRadius: 2,
      compactRadius: 1.5,
    },
  },
  typography: {
    fontFamily: '"JetBrains Mono"',
  },
};
