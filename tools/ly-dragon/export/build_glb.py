#!/usr/bin/env python3
"""Only format conversion: OpenSCAD STL parts -> material-labeled GLB.

All vertex positions are created in cad/*.scad. This script never reads a
geometry JSON or creates mesh primitives. OpenSCAD is the CAD source of truth.
"""
from __future__ import annotations

import argparse
import shutil
import subprocess
import tempfile
from pathlib import Path

import trimesh
from trimesh.visual.material import PBRMaterial

SOURCE = Path(__file__).resolve().parent.parent / "cad" / "main.scad"
PARTS = [
    ("body", "Body", "#477b93", .42, .14),
    ("belly", "Belly", "#eadfbd", .65, .05),
    ("scales", "BodyDetail", "#79abc2", .48, .10),
    ("head", "Body", "#477b93", .42, .14),
    ("face_details", "Black", "#172736", .56, .02),
    ("horns", "Horn", "#e7d6b9", .55, .02),
    ("whiskers", "Horn", "#e7d6b9", .55, .02),
    ("mane", "Mane", "#76a7d3", .54, .08),
    ("tail", "Mane", "#76a7d3", .54, .08),
    ("legs", "BodyDetail", "#79abc2", .48, .10),
]


def main():
    parser = argparse.ArgumentParser(description="V3 OpenSCAD CAD -> GLB")
    parser.add_argument("--out", type=Path, required=True)
    parser.add_argument("--openscad", default=shutil.which("openscad") or "openscad")
    parser.add_argument("--keep-stl", type=Path, default=None)
    args = parser.parse_args()
    if not SOURCE.is_file():
        raise FileNotFoundError(SOURCE)
    args.out.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory(prefix="ly-dragon-cad-") as tmp:
        scene = trimesh.Scene()
        for part, material_name, color, roughness, metallic in PARTS:
            stl = Path(tmp) / f"{part}.stl"
            result = subprocess.run(
                [args.openscad, "-o", str(stl), "-D", f'part="{part}"', str(SOURCE)],
                capture_output=True, text=True, check=False
            )
            if result.returncode:
                raise RuntimeError(f"OpenSCAD failed for {part}:\n{result.stdout}\n{result.stderr}")
            mesh = trimesh.load(stl, force="mesh", process=True)
            # Correct STL face normals without editing any CAD vertex positions.
            if not mesh.is_winding_consistent:
                mesh.fix_normals()
            if mesh.is_empty or not mesh.is_watertight or not mesh.is_winding_consistent:
                raise ValueError(f"Empty or nonwatertight CAD part: {part}")
            material = PBRMaterial(
                name=material_name,
                baseColorFactor=trimesh.visual.color.hex_to_rgba(color),
                roughnessFactor=roughness,
                metallicFactor=metallic
            )
            mesh.visual = trimesh.visual.TextureVisuals(material=material)
            scene.add_geometry(mesh, node_name=f"CAD.{part}", geom_name=f"CAD.{part}")
            if args.keep_stl:
                args.keep_stl.mkdir(parents=True, exist_ok=True)
                shutil.copy2(stl, args.keep_stl / stl.name)
            print(f"CAD.{part}: {len(mesh.faces)} triangles")

        glb = scene.export(file_type="glb")
        if not glb.startswith(b"glTF"):
            raise ValueError("Invalid GLB header")
        args.out.write_bytes(glb)
        print(f"V3 OpenSCAD: {len(scene.geometry)} parts, "
              f"{sum(len(m.faces) for m in scene.geometry.values())} triangles, "
              f"{len(glb)} bytes -> {args.out}")


if __name__ == "__main__":
    main()
