# Interface themes

Interface themes and color schemes are independent:

- **Interface** (`themes/`): shell layout, navigation, content density, mobile behavior, surfaces, typography, and Blog reader.
- **Colors and mode** (`app/theme.ts`): Material / Selenized, Light / Dark.

`workspace` is the packaged current interface. It deliberately preserves the current UI.
The Interface dropdown in Settings appears when a second theme is registered.

## Contract

A theme implements `UiThemeDefinition` and owns all `UiThemeTokens`:

| Group | What it controls |
| --- | --- |
| `shell` | top bar / sidebar variant, drawer width, content width and padding |
| `navigation` | grouped vs flat links, selected style, icons and link dimensions |
| `density` | compact / comfortable navigation and reader spacing |
| `blog` | 3-column docs or centered reading, nav/TOC widths and sticky offsets |
| `mobile` | left drawer / bottom sheet, settings presentation and MoC behavior |
| `surfaces` | flat / outlined / elevated panels, borders and radii |
| `typography` | global family, article heading/body/code sizes and line height |

The shared components consume these tokens:

- `components/AppShell.tsx`: shell, navigation, density, mobile presentation, surfaces.
- `components/BlogDocsLayout.tsx`: reader layout, mobile MoC, surface treatment, article CSS variables.
- `components/BlogMdx.tsx`: reads inherited CSS variables to style MDX without moving filesystem/MDX processing to the client.
- `app/theme.ts`: maps UI typography/shape to MUI, independently from the chosen color palette.

Mini-app immersive routes intentionally retain their separate chrome and viewport behavior.

## Add another interface theme

1. Add the new ID to `UiThemeId` in `types.ts`.
2. Create `themes/<id>.ts` implementing `UiThemeDefinition`. Start by cloning `workspace.ts` and adjust the token groups.
3. Register it in `registry.ts`.
4. Select it in Settings → Appearance → Interface. Selection persists using `ui-theme` in localStorage.

Theme variants are real component branches, not unused labels. For instance:

- `shell.variant = "sidebar-only"` removes the desktop top bar while retaining mobile navigation.
- `navigation.style = "flat"` removes the Work group heading.
- `navigation.selectedStyle = "outlined"` replaces the filled selected state.
- `blog.variant = "reading-centered"` hides desktop docs sidebars and centers the reader.
- `mobile.navigation = "bottom-sheet"` changes the hamburger menu presentation.
- `mobile.settings = "bottom-sheet"` changes Settings presentation on mobile.
- `mobile.toc = "inline"` shows a non-collapsible mobile MoC.

Keep static-export compatibility. Never read the filesystem from the client theme layer.
Do not insert theme-specific conditionals by theme ID across pages; consume tokens/variants.
For a truly novel structure, add a well-defined variant and its renderer rather than overloading a color scheme.
