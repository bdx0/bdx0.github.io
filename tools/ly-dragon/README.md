# Rồng thời Lý — JSON → GLB

The **canonical page** is `/apps/ly-dragon`. Its Next.js wrapper is
`app/apps/ly-dragon/page.tsx`, which embeds `public/embedded/ly-dragon/index.html`.

## Model versions

- `spec/ly-dragon.spec.v2.1.json`: current editable source of truth (slimmer, more curved silhouette, flame-leaf crest).
- `spec/ly-dragon.spec.v2.json`: frozen original v2 reference.
- `public/embedded/ly-dragon/models/rong-thoi-ly-v2.glb`: frozen comparison asset.
- `rong-thoi-ly-v2.1.glb`: generated during the GitHub Pages build at `out/embedded/ly-dragon/models/`. Do not manually edit `out/`.

Only `.github/workflows/gh-pages.yaml` generates the production v2.1 GLB,
validates it and publishes it with the static site. The obsolete second
generator/commit workflow was removed to avoid duplicate work and races.

## Build v2.1 locally

From the repository root:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r tools/ly-dragon/requirements.txt
python tools/ly-dragon/generator/build.py \
  --spec tools/ly-dragon/spec/ly-dragon.spec.v2.1.json \
  --out public/embedded/ly-dragon/models/rong-thoi-ly-v2.1.glb
npm run dev
```

The generated local v2.1 binary is a disposable build artifact. In production,
GitHub Actions regenerates from JSON, so a spec change directly changes the
published 3D mesh. The web page has an explicit v2 ↔ v2.1 comparison control.
The older `/lab/ly-dragon/` route remains only as a redirect to `/apps/ly-dragon`.

For future revisions: update the JSON and generator, then update the current
versioned loader URL and Pages output together. Keep the preceding version only
when intentionally used as a comparison baseline.
