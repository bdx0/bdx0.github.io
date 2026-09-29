# Ly Dragon 3D Blueprint — side view

Reference drawing: **lý_dynasty_blue_and_white_dragon.png** (1448 × 1086 px),
provided in this project. The original raster is an artistic reference; its
reproduction is not required to compile CAD. Keep it alongside this blueprint
when doing visual review; do not treat the old v2 mesh as the reference.

The editable, dimensioned trace is in ../tools/ly-dragon/cad/parameters.scad:

- body_blueprint: ordered XY centerline, tail to neck, and half-width at each station;
- tail_flame_blueprint and head_flame_blueprint: large flame control paths;
- head.scad, legs.scad: independent anatomy landmarks and volume construction;
- px=0.012: fixed image-pixel-to-CAD mapping.

OpenSCAD CAD units are arbitrary display/model units; this is **not** an
archaeological measurement of a physical artifact. The original illustration
has no front/top/back orthographic photographs; those views and real-world
dimensions must be artistically designed and explicitly labeled inferred.
Do not present inferred views as measured primary-source data.

Run tools/ly-dragon/export/preview_blueprint.py after exporting GLB to obtain the actual
orthographic **XY** projection; the generated preview is the audit image,
not a separately editable geometry source. V3 is a blockout: detailed
head, realistic scales, anatomy, and sculptural flame folds remain to refine.
