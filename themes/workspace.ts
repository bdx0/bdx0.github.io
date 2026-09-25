import type { UiThemeDefinition } from "./types";

/**
 * Preserves the current BDX0 interface while defining the full contract for
 * future themes. A new theme may change layout/behavior, not merely colors.
 */
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
    navigation: {
      style: "grouped",
      selectedStyle: "filled",
      showIcons: true,
      itemHeight: 42,
      itemFontSize: 14,
      iconWidth: 38,
      sectionGap: 2.5,
      sectionFontSize: 12,
    },
    density: {
      mode: "comfortable",
      mobilePanelPaddingX: 1.75,
      mobilePanelPaddingY: 1.25,
      tocItemPaddingY: 0.6,
      articleBlockSpacing: 1.5,
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
    mobile: {
      navigation: "left-drawer",
      settings: "dialog",
      toc: "collapsible",
      tocDefaultOpen: true,
    },
    surfaces: {
      style: "flat",
      showBorders: true,
      baseRadius: 4,
      radius: 2,
      navRadius: 2,
      compactRadius: 1.5,
    },
    typography: {
      fontFamily: '"JetBrains Mono"',
      blogBodySize: 16,
      blogBodyLineHeight: 1.8,
      blogHeading2: { xs: 23, md: 26 },
      blogHeading3: { xs: 18, md: 20 },
      blogCodeSize: 13.5,
    },
  },
};
