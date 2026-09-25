export type UiThemeId = "workspace";

/**
 * Interface themes own structure and interaction patterns; palette and
 * light/dark mode remain independent in app/theme.ts.
 */
export type UiThemeTokens = {
  shell: {
    variant: "topbar-drawer" | "sidebar-only";
    topBarHeight: number;
    drawerWidth: number;
    contentMaxWidth: number;
    blogMaxWidth: number;
    paddingX: { xs: number; sm: number; lg: number };
    paddingY: { xs: number; md: number };
  };
  navigation: {
    style: "grouped" | "flat";
    selectedStyle: "filled" | "outlined";
    showIcons: boolean;
    itemHeight: number;
    itemFontSize: number;
    iconWidth: number;
    sectionGap: number;
    sectionFontSize: number;
  };
  density: {
    mode: "comfortable" | "compact";
    mobilePanelPaddingX: number;
    mobilePanelPaddingY: number;
    tocItemPaddingY: number;
    articleBlockSpacing: number;
  };
  blog: {
    variant: "docs-three-column" | "reading-centered";
    articleMaxWidth: number;
    navWidthLg: number;
    navWidthXl: number;
    tocWidthLg: number;
    tocWidthXl: number;
    gapLg: number;
    gapXl: number;
    stickyTop: number;
    stickyBottomGap: number;
  };
  mobile: {
    navigation: "left-drawer" | "bottom-sheet";
    settings: "dialog" | "bottom-sheet";
    toc: "collapsible" | "inline";
    tocDefaultOpen: boolean;
  };
  surfaces: {
    style: "flat" | "outlined" | "elevated";
    showBorders: boolean;
    baseRadius: number;
    radius: number;
    navRadius: number;
    compactRadius: number;
  };
  typography: {
    fontFamily: string;
    blogBodySize: number;
    blogBodyLineHeight: number;
    blogHeading2: { xs: number; md: number };
    blogHeading3: { xs: number; md: number };
    blogCodeSize: number;
  };
};

export type UiThemeDefinition = {
  id: UiThemeId;
  label: string;
  description: string;
  tokens: UiThemeTokens;
};

declare module "@mui/material/styles" {
  interface Theme {
    site: UiThemeTokens;
  }

  interface ThemeOptions {
    site?: UiThemeTokens;
  }
}
