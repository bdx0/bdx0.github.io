# AGENTS.md

## Purpose

This repository is the source for the personal GitHub Pages site at `https://bdx0.github.io/`. These instructions are the default operating rules for coding agents working in this repository.

Keep changes small, preserve static-export compatibility, and prefer simplifying the existing architecture over adding another framework, rendering pipeline, or UI system.

## Project snapshot

- Framework: Next.js 16.0.8
- Router: App Router
- React: 19.2
- Language: TypeScript with `strict: true`
- Deployment: GitHub Pages user site
- Output mode: static export (`output: "export"`)
- Export directory: `out/`
- Package manager: npm
- Lockfile: `package-lock.json` is authoritative
- Main UI system: Material UI 7 + Emotion
- Theme switching: UI-theme registry + `next-themes` color schemes
- Blog content authority: Notion `notion-cms → Content`; local Markdown under `content/blog/` is legacy/migration material only and must not receive new canonical posts.
- Project/route content: Markdown and MDX where still applicable
- CI runtime: Node.js 20

Because this is the special `bdx0.github.io` user-site repository, production is served from the domain root. Do not add a `basePath` for `/bdx0.github.io`.

## Repository map

- `app/layout.tsx` — root HTML shell, metadata, fonts, and mounting point for providers + `AppShell`.
- `components/AppShell.tsx` — primary SPA/workspace shell: responsive navigation, persistent desktop sidebar, top bar, route framing, settings, and immersive mini-app handling.
- `app/providers.tsx` — color-scheme provider, UI-theme provider, and MUI bridge.
- `app/MuiThemeWrapper.tsx` — combines the selected UI theme + color scheme into MUI and installs `AppRouterCacheProvider`.
- `app/theme.ts` — Material and Selenized color-scheme definitions only.
- `themes/workspace.ts` — the full Workspace interface definition: shell, navigation, density, Blog, mobile behavior, surfaces, and typography.
- `themes/types.ts` — shared UI-theme token types and MUI theme augmentation.
- `themes/` — UI-theme registry, tokens, persistence, and per-theme definitions. `workspace` is the packaged current interface.
- `app/page.tsx` — About/Home page.
- `app/blog/page.tsx` — canonical blog index.
- `app/blog/[slug]/page.tsx` — statically generated canonical blog post route.
- `app/projects/page.tsx` — project index.
- `app/projects/[slug]/page.tsx` — statically generated project route.
- `app/tags/[tag]/page.tsx` — statically generated tag pages.
- `app/me/page.mdx` — route-level MDX compiled by `@next/mdx`.
- `app/resume/page.tsx` — resume page with its own Unified/Remark/Rehype pipeline.
- `components/` — MUI-based shared UI.
- `mdx-components.tsx` — canonical MDX element-to-MUI component mapping.
- `lib/markdown.ts` — filesystem content discovery/front matter parsing and build-time resume fetch.
- `content/blog/` — legacy blog material during CMS migration; do not add or edit canonical blog body here unless the user explicitly requests an export/snapshot.
- `content/projects/` — project content.
- `public/embedded/ly-dragon/index.html` — canonical standalone dragon viewer, embedded from `app/apps/ly-dragon/page.tsx`.
- `tools/ly-dragon/spec/ly-dragon.spec.v2.1.json` and `generator/build.py` — editable model and procedural GLB generator. The Pages workflow builds the current GLB into `out/embedded/ly-dragon/models/`.
- `public/lab/ly-dragon/index.html` — redirect only; do not edit it as the active viewer.
- `.github/workflows/gh-pages.yaml` — GitHub Pages build/deploy workflow.
- `Dockerfile`, `docker-compose.yml`, `justfile` — optional development tooling; GitHub Pages remains the production target.

## Commands

Use npm unless explicitly changing the package manager.

```bash
npm install
npm run dev
npm run lint
npm run build
```

For a clean dependency verification, prefer:

```bash
npm ci
npm run lint
npm run build
```

A successful `npm run build` is the main correctness check because the production site is generated entirely at build time.

## Static export is a hard constraint

The site must remain compatible with `output: "export"`.

- Prefer Server Components and build-time filesystem access.
- Dynamic routes must be fully enumerable with `generateStaticParams()`.
- Do not add request-time databases, server-only route handlers, middleware/proxy requirements, sessions, or other persistent-server dependencies unless the hosting architecture is explicitly being changed.
- Do not rely on runtime filesystem reads in the browser.
- Treat `out/` as generated output; never hand-edit it.
- For Next.js 16 dynamic routes, new or edited code should use the async route-prop convention, e.g. `params: Promise<{ slug: string }>`, and await it.
- Do not add a project-site `basePath`; this repository is deployed as the root GitHub Pages user site.

## There are three MD/MDX rendering paths

Do not assume all Markdown is processed the same way.

### 1. Route-level MDX

`app/me/page.mdx` is compiled through `@next/mdx`, configured in `next.config.js`.

Relevant pieces include:

- `@next/mdx`
- `@mdx-js/loader`
- `@mdx-js/react`
- `mdx-components.tsx`

Do not remove the Next MDX integration while route-level `.mdx` files remain under `app/`.

### 2. Blog and project content

**Target architecture:** Notion `notion-cms → Content` is the single source of truth for Blog content. This repository is a presentation layer. Do not create a second editable blog copy in `content/blog/` unless the user explicitly requests an export/snapshot.

The current implementation still discovers legacy `content/blog/` files through `lib/markdown.ts` while the reader is being migrated. Treat that path as transitional, not canonical.

Project content in `content/projects/` continues to be discovered by `lib/markdown.ts`, parsed with `gray-matter`, and rendered with `next-mdx-remote/rsc`.

Blog front matter currently follows this shape:

```yaml
---
title: Post title
description: Short description
publish_date: 2026-09-23
tags:
  - Tag
---
```

Project files at minimum use:

```yaml
---
title: Project title
description: Short description
---
```

Rules:

- Do not add new canonical blog posts to Git. Create/edit them in Notion `Content`.
- Do not duplicate Blog/Knowledge body into Notes or another store unless explicitly requested.
- Any generated cache/export must be rebuildable from Notion and must not be hand-edited as a source.
- For remaining legacy filesystem content, the filename without `.md` or `.mdx` becomes the route slug.
- Do not silently rename content files because that changes public URLs.
- Preserve `publish_date` and `tags` behavior used by the homepage and tag routes.
- `content/projects/page.mdx` is intentionally excluded by `getAllContent("projects")`.

### 3. Resume content

`/resume` is different from the other content routes.

`lib/markdown.ts#getResumeContent()` fetches:

```text
https://bdx0.github.io/cv/resume.md
```

during generation, and `app/resume/page.tsx` processes it through a custom Unified pipeline:

```text
remark-parse
→ remark-mdx
→ remark-gfm
→ remark-rehype
→ rehype-raw
→ rehype-attr
→ rehype-react
```

This means the production build currently depends on that remote resume URL being available. Preserve this behavior unless the resume architecture is intentionally changed.

The HAST logging plugin and related console logging in the resume page are debugging artifacts, not architectural requirements.

## UI and theming

Material UI is the primary UI system.

The theme system has two independent layers:

```text
UI theme (themes/registry.ts)
  → shell + navigation + density + mobile + surfaces + typography + reader tokens

Color scheme (next-themes → app/theme.ts)
  → Material or Selenized + light/dark

Both
  → app/MuiThemeWrapper.tsx
  → MUI ThemeProvider
```

The current interface is the `workspace` UI theme. Preserve this separation when adding themes.

- New interface themes belong under `themes/` and must be registered in `themes/registry.ts`.
- Do not put shared shell/blog layout or behavior constants back into components when they belong in UI-theme tokens. Treat variant labels as real rendering branches, not documentation-only settings.
- Color-only changes belong in `app/theme.ts`; layout/structure changes belong in a UI theme.
- Settings → Appearance exposes Interface when multiple UI themes are registered; Colors and Mode remain independent.
- Keep `"use client"` limited to components that actually need state, effects, browser APIs, or theme hooks.
- Prefer MUI primitives for UI that already lives in the MUI design system.
- Do not introduce another component framework for simple UI changes.
- `@mui/material-nextjs` and Emotion are part of the MUI/App Router integration; do not remove them merely because application code does not directly import every Emotion package.
- Shared Markdown styling belongs in `mdx-components.tsx` or the blog-specific MDX component map rather than being reimplemented in every content route. Blog reader variables are set in the themed client layout and inherited by server-rendered MDX.

## Tailwind status

Tailwind 4, PostCSS, and the typography plugin are declared/configured, and some JSX contains Tailwind utility class names.

However, the current repository tree has no `app/globals.css` and no visible global Tailwind stylesheet import. Therefore:

- Do not assume Tailwind utility classes are currently producing styles.
- Verify the generated CSS/build before relying on Tailwind for a new feature.
- Prefer the existing MUI styling system until Tailwind's active role is deliberately clarified.
- Do not add a second parallel styling solution merely to fix a small layout issue.

## Dependency discipline

The current dependency list contains overlapping historical experiments. Before adding a package, first check whether the existing stack already solves the problem.

Packages with clear current source usage include:

- Next.js / React
- Material UI / Material icons / Material Next.js integration
- Emotion as the MUI styling runtime
- `next-themes`
- `gray-matter`
- `date-fns`
- `@next/mdx` and its MDX integration
- `next-mdx-remote`
- Unified resume-pipeline packages: `rehype-react`, `rehype-raw`, `rehype-attr`, `remark-mdx`, `remark-gfm`, `remark-rehype`

Known cleanup candidates currently appear in `package.json` but have no matching application-source usage in the repository search:

- `lucide-react`
- `nanoid`
- `prismjs`
- `react-syntax-highlighter`
- `rehype-highlight`
- `rehype-pretty-code`
- `rehype-prism-plus`

Also review duplicate tooling declarations such as `typescript` and `@types/node` appearing in both dependency groups.

Do not remove these automatically during an unrelated task. Dependency cleanup must be a focused change followed by `npm ci`, lint, and a full static build.

## Fonts and assets

The root layout loads JetBrains Mono and Tektur through `next/font/google`.

`public/fonts/` also contains older local font files. Do not assume they are active without finding a source reference.

Do not delete standalone public pages or demos as part of normal blog refactoring. The old dragon Lab URL is a redirect; the canonical 3D viewer is `public/embedded/ly-dragon/index.html`.

## GitHub Pages deployment

Pushes to `main` trigger `.github/workflows/gh-pages.yaml`.

The current workflow:

1. Checks out the repository.
2. Uses Node.js 20.
3. Installs packages with npm.
4. Runs `npm run build`.
5. Uploads `./out`.
6. Deploys the artifact through GitHub Pages Actions.

The latest deployment before this file was added completed successfully.

When changing build/config/content code, check the GitHub Actions result after pushing.

## Docker development

Docker is optional development infrastructure, not the production hosting model.

- `docker-compose.yml` maps host port 4000 to container port 3000.
- `justfile` targets a remote Docker host via `ssh://root@nix01`.
- Do not change or depend on that remote host for ordinary application work unless explicitly requested.
- The Dockerfile currently mixes build and development behavior; treat Docker cleanup as a separate task.

## Coding conventions

- Preserve strict TypeScript.
- Avoid `any` in new or modified code when a practical type is available.
- Use the configured `@/*` import alias for repository-local modules when it improves clarity.
- Prefer semantic HTML even when using MUI components.
- Keep accessibility behavior intact: labels, heading hierarchy, keyboard access, focus states, and adequate contrast.
- Use `next/link` for internal navigation.
- Use `next/image` for new application images when appropriate; existing raw MDX `img` handling is a separate compatibility concern.
- Remove debug `console.log` statements when the task touches the code that introduced them and they are no longer needed.

## Scope discipline

Make the smallest coherent change that solves the requested task.

- Do not migrate away from Next.js as part of unrelated work.
- Do not replace all three content pipelines in a small feature change.
- Do not switch UI frameworks during content or routing work.
- Do not rewrite user-authored Markdown prose unless explicitly requested.
- Do not delete `PLAN.md`, `style.md`, or `style_cyberpunk.md` merely because they are not runtime code; treat them as project/reference documents.
- Never commit secrets, credentials, tokens, or local environment data.

## Verification checklist

For application or dependency changes:

```bash
npm ci
npm run lint
npm run build
```

Also verify, as relevant:

- Home/About page
- `/blog` blog listing
- `/blog/[slug]` blog posts and mobile/desktop MoC
- `/projects` and `/projects/[slug]`
- `/tags/[tag]`
- `/me` route-level MDX
- `/resume` external-content pipeline
- theme selector in both light and dark modes
- standalone public assets remain present
- `out/` is generated successfully

For content-only changes, validate front matter and run a full build when practical.

## Change summaries

When reporting completed work, state:

- what changed,
- which files changed,
- what validation was run,
- whether static export or deployment behavior changed,
- and any remaining cleanup or migration risk.
