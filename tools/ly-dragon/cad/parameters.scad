// Ly Dragon V3. OpenSCAD is the only editable CAD geometry source.
// Coordinates are traced from the 1448x1086 orthographic reference.
// Image Y points down; CAD Y points up. One pixel is 0.012 model units.
px = 0.012;
origin_px = [700,700];
section_sides = 12;
body_steps_per_segment = 7;
part = is_undef(part) ? "all" : part;
$fn = 12;

// [image x, image y, silhouette half-width in pixels], tail to neck.
body_blueprint = [
 [106,522,28], [177,632,34], [292,716,46], [438,689,57],
 [566,545,73], [643,468,78], [760,515,71], [850,676,63],
 [955,762,78], [1080,679,67], [1117,535,51], [1138,430,39]
];
tail_flame_blueprint = [
 [[108,516],[72,431],[54,329],[42,181],[94,91]],
 [[113,513],[115,417],[147,298],[207,182],[296,100]],
 [[108,517],[67,438],[36,339],[20,226]],
 [[106,510],[144,401],[221,305],[297,245]]
];
head_flame_blueprint = [
 [[1118,291],[1064,221],[988,153],[888,116]],
 [[1165,268],[1130,203],[1095,142],[1045,92]],
 [[1211,245],[1242,193],[1287,129],[1330,105]]
];
