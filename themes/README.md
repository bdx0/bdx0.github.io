# UI themes

The site separates **UI themes** from **color schemes**.

- UI theme: layout, spacing, shell behavior, blog/docs proportions, surface shape.
- Color scheme: palette and light/dark mode.

The current interface is packaged as the `workspace` UI theme.

## Add another UI theme

1. Add a definition in this directory using `UiThemeDefinition`.
2. Add its id to `UiThemeId`.
3. Register it in `registry.ts`.
4. Use theme tokens in shared components instead of hard-coded layout values.

The Appearance control reads the registry automatically, so registered themes become selectable without adding another selector implementation.
