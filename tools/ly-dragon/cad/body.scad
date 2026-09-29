include <geometry.scad>;
module body(){
 n=total_steps();s=section_sides;
 verts=concat([for(i=[0:n],j=[0:s-1]) ring_point(i,j)],[world_center(0),world_center(n)]);
 facets=concat(
  [for(i=[0:n-1],j=[0:s-1]) each [
    [i*s+j,(i+1)*s+j,(i+1)*s+(j+1)%s],
    [i*s+j,(i+1)*s+(j+1)%s,i*s+(j+1)%s]
  ]],
  [for(j=[0:s-1]) [(n+1)*s,j,(j+1)%s]],
  [for(j=[0:s-1]) [(n+1)*s+1,n*s+(j+1)%s,n*s+j]]
 );
 polyhedron(points=verts,faces=facets,convexity=10);
}
module belly(){
 for(i=[10:5:total_steps()-4]){
  p=world_center(i);n=normal(i);r=body_radius(i);
  a=atan2(tangent(i)[1],tangent(i)[0]);
  translate([p[0]-n[0]*r*0.36,p[1]-n[1]*r*0.36,r*0.65])
   rotate([0,0,a]) scale([r*0.24,r*0.50,r*0.105]) sphere(1,$fn=14);
 }
}
module scales(){
 for(i=[8:3:total_steps()-6]){
  p=world_center(i);n=normal(i);r=body_radius(i);
  a=atan2(tangent(i)[1],tangent(i)[0]);
  for(row=[-2:2]){
   off=row*0.27;
   z=body_zradius(i)*sqrt(max(0.04,1-off*off));
   translate([p[0]+n[0]*r*off,p[1]+n[1]*r*off,z+0.018])
    rotate([0,0,a+6*(row%2)])
    scale([r*0.205,r*0.155,0.033]) sphere(1,$fn=10);
  }
 }
}
