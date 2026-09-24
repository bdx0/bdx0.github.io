export type UiThemeId = "workspace";

export type UiThemeTokens = {
  shell: {
    variant: "topbar-drawer";
    topBarHeight: number;
    drawerWidth: number;
    contentMaxWidth: number;
    blogMaxWidth: number;
    paddingX: { xs: number; sm: number; lg: number };
    paddingY: { xs: number; md: number };
  };
  blog: {
    variant: "docs-three-column";
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
  surfaces: {
    baseRadius: number;
    radius: number;
    navRadius: number;
    compactRadius: number;
  };
};

export type UiThemeDefinition = {
  id: UiThemeId;
  label: string;
  description: string;
  tokens: UiThemeTokens;
  typography: {
    fontFamily: string;
  };
};

declare module "@mui/material/styles" {
  interface Theme {
    site: UiThemeTokens;
  }

  interface ThemeOptions {
    site?: UiThemeTokens;
  }
}
