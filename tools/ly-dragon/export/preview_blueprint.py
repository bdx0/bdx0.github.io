#!/usr/bin/env python3
"""Generate an orthographic XY silhouette from the actual V3 GLB mesh."""
import argparse
from pathlib import Path
import numpy as np
import trimesh
from PIL import Image, ImageDraw

W,H,PX=1448,1086,.012
COLORS={"tail":"#5881ac","legs":"#7ca1c1","body":"#7295b5",
 "belly":"#eadfbd","head":"#7295b5","mane":"#6798c5",
 "scales":"#95b3d0","horns":"#d7caa8","whiskers":"#d7caa8",
 "face_details":"#263b55"}

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--glb",type=Path,required=True)
    parser.add_argument("--out",type=Path,required=True)
    args=parser.parse_args()
    scene=trimesh.load(args.glb,force="scene")
    image=Image.new("RGB",(W,H),"#f4efe7")
    pen=ImageDraw.Draw(image)
    for part,color in COLORS.items():
        for name,mesh in scene.geometry.items():
            if not name.endswith(part):continue
            vertices=mesh.vertices
            pixels=np.rint(np.stack([vertices[:,0]/PX+700,700-vertices[:,1]/PX],axis=1)).astype(int)
            for face in mesh.faces:
                pen.polygon([tuple(pixels[index]) for index in face],fill=color)
    args.out.parent.mkdir(parents=True,exist_ok=True)
    image.save(args.out)
    print(f"Orthographic CAD projection: {args.out}")

if __name__=="__main__":main()
