include <geometry.scad>;
module mane(){
 // Broad sweeping flame leaves, not the small repeated cones of v2.1.
 for(j=[0:2]) flame_path(head_flame_blueprint[j],j==0?46:36,0.40);
 for(i=[11:5:total_steps()-6]){
  c=world_center(i); n=normal(i); t=tangent(i); r=body_radius(i);
  start=add(c,mul(n,r*0.80));
  height=r*(0.48+0.22*sin(i*11));
  tip=add(start,add(mul(n,height),mul(t,-height*0.55)));
  hull(){
   ellipsoid_world(start,[0.080,0.075,0.09],10);
   ellipsoid_world(add(start,mul(sub(tip,start),0.58)),[0.13,0.11,0.072],10);
  }
  hull(){
   ellipsoid_world(add(start,mul(sub(tip,start),0.58)),[0.13,0.11,0.072],10);
   ellipsoid_world(tip,[0.015,0.015,0.012],8);
  }
 }
}
