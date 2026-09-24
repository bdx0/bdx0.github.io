import { workspaceTheme } from "./workspace";
import type { UiThemeDefinition, UiThemeId } from "./types";

export const DEFAULT_UI_THEME: UiThemeId = "workspace";

export const uiThemes: Record<UiThemeId, UiThemeDefinition> = {
  workspace: workspaceTheme,
};

export function getUiTheme(id: string | undefined): UiThemeDefinition {
  if (id && id in uiThemes) {
    return uiThemes[id as UiThemeId];
  }

  return uiThemes[DEFAULT_UI_THEME];
}
