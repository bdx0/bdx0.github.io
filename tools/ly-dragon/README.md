# Ly Dragon CAD V3 — Blueprint → OpenSCAD → GLB

**Canonical page:** /apps/ly-dragon
**Active CAD source of truth:** cad/*.scad, assembled by cad/main.scad.
**Design reference:** ../../ly-dragon-blueprint/README.md and the approved 1448×1086 Lý dragon side-view drawing.

Geometry control points, cross-sections, body widths, head/leg/crest geometry are
editable **only in OpenSCAD**. Do not create a second JSON geometry specification.
The image-side XY coordinates in cad/parameters.scad are traced from the blueprint.
They are mapped to CAD model units by image_point() in cad/geometry.scad.

The current V3 is a **CAD blockout** to compare against the reference, not a
finished sculpt. It has a new silhouette and separate tail flames, head, mane,
segmented belly, near-side scales, four legs, horns and whiskers.

## Build

Requirements: OpenSCAD CLI, Python 3.12+, pip install -r tools/ly-dragon/requirements.txt

From repository root:

    python tools/ly-dragon/export/build_glb.py \
      --out public/embedded/ly-dragon/models/rong-thoi-ly-v3-cad.glb \
      --keep-stl /tmp/ly-dragon-stl

    python tools/ly-dragon/export/preview_blueprint.py \
      --glb public/embedded/ly-dragon/models/rong-thoi-ly-v3-cad.glb \
      --out public/embedded/ly-dragon/v3-cad-orthographic.png

OpenSCAD modules: parameters.scad (reference coordinates, dimensions),
geometry.scad (spline/solid helpers), body.scad, head.scad, mane.scad,
tail.scad, legs.scad. main.scad is the single assembly entry point. STL
is intermediary; export/build_glb.py only packages CAD-generated STL into GLB,
applying named PBR materials. It does NOT generate geometry or read JSON.

GitHub Pages builds the active V3 GLB and XY orthographic preview directly
from these .scad files and publishes both from out/; do not hand-edit out/.

## Historical material

legacy/ contains the frozen v2/v2.1 JSON and old Python procedural generator.
It is not imported or run by the V3 build. The original v2 GLB is retained as
a comparison asset under public/embedded/ly-dragon/models/.
The /lab/ly-dragon URL remains a redirect.

When refining the 3D dragon, revise the reference traces and solid modules in
cad/*.scad, then regenerate GLB + XY preview. Do not judge progress from
parameters alone: inspect the actual orthographic render.
