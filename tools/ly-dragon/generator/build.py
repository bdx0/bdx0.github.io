#!/usr/bin/env python3
"""Parametric Lý-dynasty dragon GLB generator.

JSON is the source of truth. Major parts stay as separate named meshes so we can
refine head, horns, whiskers, mane, legs and pearl independently later.
"""
from __future__ import annotations

import argparse
import json
import math
from pathlib import Path
from typing import Iterable

import numpy as np
import trimesh
from scipy.interpolate import CubicSpline
from trimesh.visual.material import PBRMaterial


def hex_rgba(value: str, alpha: int = 255) -> list[int]:
    value = value.lstrip("#")
    if len(value) != 6:
        raise ValueError(f"Expected #RRGGBB, got {value!r}")
    return [int(value[i:i + 2], 16) for i in (0, 2, 4)] + [alpha]


def pbr(
    name: str,
    color: str,
    roughness: float,
    metalness: float,
    emissive: str | None = None,
) -> PBRMaterial:
    kwargs = dict(
        name=name,
        baseColorFactor=hex_rgba(color),
        roughnessFactor=roughness,
        metallicFactor=metalness,
    )
    if emissive:
        kwargs["emissiveFactor"] = [c / 255.0 for c in hex_rgba(emissive)[:3]]
    return PBRMaterial(**kwargs)


def smooth_curve(points: Iterable[Iterable[float]], samples: int = 80) -> np.ndarray:
    p = np.asarray(list(points), dtype=float)
    if len(p) < 2:
        raise ValueError("Curve needs at least two control points")
    if len(p) == 2:
        u = np.linspace(0.0, 1.0, samples)
        return p[0][None, :] * (1 - u[:, None]) + p[1][None, :] * u[:, None]

    distances = np.linalg.norm(np.diff(p, axis=0), axis=1)
    u = np.r_[0.0, np.cumsum(distances)]
    u /= u[-1]
    spline = CubicSpline(u, p, axis=0, bc_type="natural")
    return spline(np.linspace(0.0, 1.0, samples))


def frame_from_tangent(
    tangent: np.ndarray,
    previous_normal: np.ndarray | None = None,
) -> tuple[np.ndarray, np.ndarray]:
    tangent = tangent / max(np.linalg.norm(tangent), 1e-9)

    if previous_normal is None:
        candidate = np.array([0.0, 1.0, 0.0])
        if abs(np.dot(candidate, tangent)) > 0.88:
            candidate = np.array([0.0, 0.0, 1.0])
        normal = candidate - np.dot(candidate, tangent) * tangent
    else:
        normal = previous_normal - np.dot(previous_normal, tangent) * tangent
        if np.linalg.norm(normal) < 1e-6:
            normal = np.cross(np.array([1.0, 0.0, 0.0]), tangent)

    normal /= max(np.linalg.norm(normal), 1e-9)
    binormal = np.cross(tangent, normal)
    binormal /= max(np.linalg.norm(binormal), 1e-9)
    return normal, binormal


def tube_mesh(
    points: np.ndarray,
    radii: np.ndarray | float,
    radial_segments: int = 12,
    name: str = "Tube",
) -> trimesh.Trimesh:
    points = np.asarray(points, dtype=float)
    count = len(points)

    if np.isscalar(radii):
        radii = np.full(count, float(radii))
    else:
        radii = np.asarray(radii, dtype=float)

    if len(radii) != count:
        raise ValueError("radii length must match points")

    tangents = np.gradient(points, axis=0)
    vertices: list[np.ndarray] = []
    normals: list[np.ndarray] = []
    previous_normal = None

    for center, tangent, radius in zip(points, tangents, radii):
        normal, binormal = frame_from_tangent(tangent, previous_normal)
        previous_normal = normal

        for j in range(radial_segments):
            angle = 2 * math.pi * j / radial_segments
            direction = math.cos(angle) * normal + math.sin(angle) * binormal
            vertices.append(center + direction * radius)
            normals.append(direction)

    faces = []
    for i in range(count - 1):
        for j in range(radial_segments):
            a = i * radial_segments + j
            b = i * radial_segments + (j + 1) % radial_segments
            c = (i + 1) * radial_segments + (j + 1) % radial_segments
            d = (i + 1) * radial_segments + j
            faces.extend([[a, b, d], [b, c, d]])

    mesh = trimesh.Trimesh(
        vertices=np.asarray(vertices),
        faces=np.asarray(faces),
        vertex_normals=np.asarray(normals),
        process=False,
    )
    mesh.metadata["name"] = name
    return mesh


def ellipsoid(scale: Iterable[float], center: Iterable[float], name: str) -> trimesh.Trimesh:
    mesh = trimesh.creation.icosphere(subdivisions=3, radius=1.0)
    mesh.apply_scale(np.asarray(scale, dtype=float))
    mesh.apply_translation(np.asarray(center, dtype=float))
    mesh.metadata["name"] = name
    return mesh


def align_z_to_vector(
    mesh: trimesh.Trimesh,
    start: np.ndarray,
    end: np.ndarray,
) -> trimesh.Trimesh:
    start = np.asarray(start, dtype=float)
    end = np.asarray(end, dtype=float)
    direction = end - start
    length = np.linalg.norm(direction)

    if length < 1e-8:
        return mesh

    unit = direction / length
    transform = trimesh.geometry.align_vectors([0, 0, 1], unit)
    mesh.apply_transform(transform)
    mesh.apply_translation((start + end) * 0.5)
    return mesh


def cylinder_between(start, end, radius, name="Cylinder", sections=10) -> trimesh.Trimesh:
    start = np.asarray(start, dtype=float)
    end = np.asarray(end, dtype=float)
    length = np.linalg.norm(end - start)
    mesh = trimesh.creation.cylinder(radius=radius, height=length, sections=sections)
    mesh.metadata["name"] = name
    return align_z_to_vector(mesh, start, end)


def cone_between(start, end, radius, name="Cone", sections=10) -> trimesh.Trimesh:
    start = np.asarray(start, dtype=float)
    end = np.asarray(end, dtype=float)
    length = np.linalg.norm(end - start)
    mesh = trimesh.creation.cone(radius=radius, height=length, sections=sections)
    mesh.metadata["name"] = name
    return align_z_to_vector(mesh, start, end)


def radius_profile(spec: dict, t: np.ndarray) -> np.ndarray:
    p = spec["silhouette"]["radius_profile"]
    anchors_t = np.array([
        0.0,
        0.16,
        0.48,
        spec["silhouette"].get("chest_peak_position", 0.82),
        0.93,
        1.0,
    ])
    anchors_r = np.array([
        p["tail_start"],
        p["tail_mid"],
        p["body_mid"],
        p["chest_peak"],
        p["neck"],
        p["head_base"],
    ])
    return np.interp(t, anchors_t, anchors_r)


def tangent_at(curve: np.ndarray, index: int) -> np.ndarray:
    i0 = max(index - 1, 0)
    i1 = min(index + 1, len(curve) - 1)
    vector = curve[i1] - curve[i0]
    return vector / max(np.linalg.norm(vector), 1e-9)


def body_frame(
    curve: np.ndarray,
    t: float,
) -> tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray]:
    index = int(np.clip(round(t * (len(curve) - 1)), 0, len(curve) - 1))
    point = curve[index]
    tangent = tangent_at(curve, index)
    normal, binormal = frame_from_tangent(tangent)
    return point, tangent, normal, binormal


def head_transform(curve: np.ndarray, attach_t: float) -> np.ndarray:
    point, tangent, normal, binormal = body_frame(curve, attach_t)

    # Head-local axes:
    # +X = body tangent, +Y = body normal, +Z = body binormal.
    transform = np.eye(4)
    transform[:3, 0] = tangent
    transform[:3, 1] = normal
    transform[:3, 2] = binormal
    transform[:3, 3] = point
    return transform


def transform_local(mesh: trimesh.Trimesh, transform: np.ndarray) -> trimesh.Trimesh:
    mesh.apply_transform(transform)
    return mesh


def materialize(mesh: trimesh.Trimesh, material: PBRMaterial) -> trimesh.Trimesh:
    mesh.visual = trimesh.visual.TextureVisuals(material=material)
    return mesh


def build(spec: dict) -> trimesh.Scene:
    preset = spec["materials"]["presets"][spec["materials"]["active_preset"]]
    roughness = preset["roughness"]
    metalness = preset["metalness"]

    materials = {
        "body": pbr("Body", preset["body"], roughness, metalness),
        "body2": pbr("BodyDetail", preset["body2"], roughness + 0.02, metalness),
        "belly": pbr("Belly", preset["belly"], min(1, roughness + 0.12), max(0, metalness - 0.05)),
        "horn": pbr("Horn", preset["horn"], 0.55, 0.02),
        "mane": pbr("Mane", preset["mane"], 0.48, 0.08),
        "eye": pbr("Eye", preset["eye"], 0.20, 0.05, preset["eye"]),
        "black": pbr("Black", preset["black"], 0.55, 0.0),
        "claw": pbr("Claw", preset["claw"], 0.50, 0.02),
        "pearl": pbr("Pearl", preset["pearl"], 0.14, 0.04, preset["pearl"]),
    }

    scene = trimesh.Scene()

    control_points = np.asarray(spec["silhouette"]["curve_points"], dtype=float)
    body_samples = int(spec["body"].get("tube_segments", 220)) + 1
    curve = smooth_curve(control_points, body_samples)
    ts = np.linspace(0.0, 1.0, body_samples)
    radii = radius_profile(spec, ts)

    body = tube_mesh(
        curve,
        radii,
        int(spec["body"].get("radial_segments", 16)),
        "Body",
    )
    scene.add_geometry(materialize(body, materials["body"]), node_name="Body")

    # A subtle belly tube under the main body.
    belly_curve = []
    belly_radii = []
    for i, _ in enumerate(ts[10:-10:3]):
        index = 10 + i * 3
        point, _, normal, _ = body_frame(curve, index / (len(curve) - 1))
        belly_curve.append(point - normal * radii[index] * 0.73)
        belly_radii.append(max(0.035, radii[index] * 0.26))

    belly = tube_mesh(
        np.asarray(belly_curve),
        np.asarray(belly_radii),
        10,
        "Belly",
    )
    scene.add_geometry(materialize(belly, materials["belly"]), node_name="Belly")

    # Head root transform.
    head_transform_matrix = head_transform(curve, spec["head"]["attach_t"])

    head_parts = [
        ("cranium", "body2", "Head.Cranium"),
        ("snout", "body", "Head.Snout"),
        ("nose_tip", "body2", "Head.Nose"),
        ("jaw", "belly", "Head.Jaw"),
    ]

    for key, material_key, display_name in head_parts:
        part = spec["head"][key]
        mesh = ellipsoid(part["scale"], part["offset"], display_name)
        transform_local(mesh, head_transform_matrix)
        scene.add_geometry(
            materialize(mesh, materials[material_key]),
            node_name=display_name,
        )

    # Eyes, pupils, nostrils.
    for side in ("left", "right"):
        eye_position = spec["head"]["eyes"][f"offset_{side}"]
        eye = ellipsoid(
            [spec["head"]["eyes"]["size"]] * 3,
            eye_position,
            f"Eye.{side}",
        )
        transform_local(eye, head_transform_matrix)
        scene.add_geometry(materialize(eye, materials["eye"]), node_name=f"Eye.{side}")

        pupil_position = np.asarray(eye_position, dtype=float) + np.array([0.055, 0.0, 0.0])
        pupil = ellipsoid(
            [spec["head"]["eyes"]["pupil_size"]] * 3,
            pupil_position,
            f"Pupil.{side}",
        )
        transform_local(pupil, head_transform_matrix)
        scene.add_geometry(materialize(pupil, materials["black"]), node_name=f"Pupil.{side}")

        nostril_position = spec["head"]["nostrils"][f"offset_{side}"]
        nostril = ellipsoid(
            [spec["head"]["nostrils"]["size"]] * 3,
            nostril_position,
            f"Nostril.{side}",
        )
        transform_local(nostril, head_transform_matrix)
        scene.add_geometry(
            materialize(nostril, materials["black"]),
            node_name=f"Nostril.{side}",
        )

    # Horns and whiskers: tapered curve tubes in head-local space.
    for side in ("left", "right"):
        horn_points = smooth_curve(spec["horns"][f"{side}_curve_points"], 48)
        horn_radii = np.linspace(
            spec["horns"]["radius_base"],
            spec["horns"]["radius_tip"],
            len(horn_points),
        )
        horn = tube_mesh(horn_points, horn_radii, 8, f"Horn.{side}")
        transform_local(horn, head_transform_matrix)
        scene.add_geometry(
            materialize(horn, materials["horn"]),
            node_name=f"Horn.{side}",
        )

        for index, control_points in enumerate(spec["whiskers"][f"{side}_sets"]):
            sample_count = 56 if len(control_points) > 4 else 30
            whisker_points = smooth_curve(control_points, sample_count)
            whisker_radii = np.linspace(
                spec["whiskers"]["radius_base"],
                spec["whiskers"]["radius_tip"],
                len(whisker_points),
            )
            whisker = tube_mesh(
                whisker_points,
                whisker_radii,
                6,
                f"Whisker.{side}.{index}",
            )
            transform_local(whisker, head_transform_matrix)
            scene.add_geometry(
                materialize(whisker, materials["horn"]),
                node_name=f"Whisker.{side}.{index}",
            )

    # Head mane.
    head_mane_count = int(spec["mane"]["head_count"])
    for i in range(head_mane_count):
        x = -0.10 - i * 0.11
        z = (i - (head_mane_count - 1) / 2) * 0.08
        start = np.array([x, 0.30, z])
        end = np.array([x - 0.12, 0.76 + 0.025 * i, z])

        leaf = cone_between(
            start,
            end,
            0.11 + 0.012 * i,
            f"HeadMane.{i}",
            6,
        )
        transform_local(leaf, head_transform_matrix)
        scene.add_geometry(
            materialize(leaf, materials["mane"]),
            node_name=f"HeadMane.{i}",
        )

    # Spine mane follows body normals.
    start_t = spec["mane"]["spine_start_t"]
    end_t = spec["mane"]["spine_end_t"]
    step_t = spec["mane"]["spine_step_t"]
    t = start_t
    index = 0

    while t <= end_t + 1e-9:
        point, _, normal, _ = body_frame(curve, t)
        radius = float(radius_profile(spec, np.array([t]))[0])
        height = np.interp(
            t,
            [start_t, (start_t + end_t) / 2, end_t],
            [
                spec["mane"]["height_min"],
                spec["mane"]["height_max"],
                spec["mane"]["height_min"],
            ],
        )

        start = point + normal * (radius * 0.88)
        end = start + normal * height
        leaf = cone_between(
            start,
            end,
            max(0.045, height * 0.22),
            f"SpineMane.{index}",
            6,
        )
        scene.add_geometry(
            materialize(leaf, materials["mane"]),
            node_name=f"SpineMane.{index}",
        )
        t += step_t
        index += 1

    # Four legs and claws.
    leg_spec = spec["legs"]
    leg_names = (
        "front_left",
        "front_right",
        "back_left",
        "back_right",
    )

    for leg_name in leg_names:
        leg = leg_spec[leg_name]
        point, tangent, normal, side_vector = body_frame(curve, leg["attach_t"])
        side = float(leg["side"])
        body_radius = float(radius_profile(spec, np.array([leg["attach_t"]]))[0])

        hip = point + side_vector * side * body_radius * 0.78
        knee = hip + side_vector * side * 0.40 - normal * 0.38
        ankle = knee + tangent * float(leg["forward_shift"]) - normal * 0.42

        upper = cylinder_between(
            hip,
            knee,
            leg_spec["upper_radius"],
            f"Leg.{leg_name}.upper",
        )
        lower = cylinder_between(
            knee,
            ankle,
            leg_spec["lower_radius"],
            f"Leg.{leg_name}.lower",
        )

        scene.add_geometry(
            materialize(upper, materials["body2"]),
            node_name=f"Leg.{leg_name}.upper",
        )
        scene.add_geometry(
            materialize(lower, materials["body"]),
            node_name=f"Leg.{leg_name}.lower",
        )

        for claw_index in range(int(leg_spec["claw_count"])):
            spread = (
                claw_index - (leg_spec["claw_count"] - 1) / 2
            ) * 0.16
            direction = (
                tangent * 0.68
                + side_vector * side * spread
                - normal * 0.25
            )
            direction /= max(np.linalg.norm(direction), 1e-9)
            tip = ankle + direction * leg_spec["claw_length"]

            claw = cone_between(
                ankle,
                tip,
                leg_spec["claw_radius"],
                f"Claw.{leg_name}.{claw_index}",
                7,
            )
            scene.add_geometry(
                materialize(claw, materials["claw"]),
                node_name=f"Claw.{leg_name}.{claw_index}",
            )

    # Teeth.
    teeth = spec["head"]["teeth"]
    for side_sign, side_name in [(-1, "left"), (1, "right")]:
        for i in range(teeth["count_per_side"]):
            base = np.array([
                teeth["start_x"] + i * teeth["spacing"],
                -0.30,
                side_sign * teeth["z"],
            ])
            tip = base + np.array([0.0, -teeth["length"], 0.0])

            tooth = cone_between(
                base,
                tip,
                teeth["radius"],
                f"Tooth.{side_name}.{i}",
                7,
            )
            transform_local(tooth, head_transform_matrix)
            scene.add_geometry(
                materialize(tooth, materials["horn"]),
                node_name=f"Tooth.{side_name}.{i}",
            )

    pearl = trimesh.creation.icosphere(
        subdivisions=3,
        radius=spec["pearl"]["radius"],
    )
    pearl.apply_translation(np.asarray(spec["pearl"]["position"], dtype=float))
    pearl.metadata["name"] = "Pearl"
    scene.add_geometry(
        materialize(pearl, materials["pearl"]),
        node_name="Pearl",
    )

    return scene


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--spec", type=Path, required=True)
    parser.add_argument("--out", type=Path, default=None)
    args = parser.parse_args()

    spec = json.loads(args.spec.read_text(encoding="utf-8"))
    output = args.out or Path(spec["export"]["filename"])
    output.parent.mkdir(parents=True, exist_ok=True)

    scene = build(spec)
    glb = scene.export(file_type="glb")
    output.write_bytes(glb)

    triangles = sum(len(mesh.faces) for mesh in scene.geometry.values())
    print(
        f"Wrote {output} "
        f"({len(glb) / 1024:.1f} KiB, "
        f"{len(scene.geometry)} meshes, "
        f"{triangles:,} triangles)"
    )


if __name__ == "__main__":
    main()
