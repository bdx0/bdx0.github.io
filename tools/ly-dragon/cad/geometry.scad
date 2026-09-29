include <parameters.scad>;
function add(a,b)=[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
function sub(a,b)=[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
function mul(a,t)=[a[0]*t,a[1]*t,a[2]*t];
function norm(a)=sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);
function unit(a)=let(l=max(norm(a),0.000001)) [a[0]/l,a[1]/l,a[2]/l];
function image_point(p,z=0)=[(p[0]-origin_px[0])*px,(origin_px[1]-p[1])*px,z];
function catmull(a,b,c,d,t)=[for(j=[0:len(b)-1])
 0.5*((2*b[j])+(-a[j]+c[j])*t+(2*a[j]-5*b[j]+4*c[j]-d[j])*t*t+(-a[j]+3*b[j]-3*c[j]+d[j])*t*t*t)
];
function curve_p(i)=let(n=len(body_blueprint),step=body_steps_per_segment,
 k=min(n-2,floor(i/step)),t=i/step-k,
 a=body_blueprint[max(k-1,0)],b=body_blueprint[k],
 c=body_blueprint[k+1],d=body_blueprint[min(k+2,n-1)])
 catmull(a,b,c,d,t);
function total_steps()=(len(body_blueprint)-1)*body_steps_per_segment;
function world_center(i)=image_point(curve_p(i));
function body_radius(i)=max(0.07,curve_p(i)[2]*px);
function tangent(i)=unit(sub(world_center(min(i+1,total_steps())),world_center(max(i-1,0))));
function normal(i)=let(t=tangent(i)) [-t[1],t[0],0];
function body_zradius(i)=body_radius(i)*0.77;
function ring_point(i,j)=let(a=360*j/section_sides,c=world_center(i),n=normal(i),r=body_radius(i))
 [c[0]+n[0]*r*cos(a),c[1]+n[1]*r*cos(a),r*0.77*sin(a)];
module ellipsoid_at(p,r,angle=0,fn=16){
 translate(image_point(p)) rotate([0,0,angle]) scale(r) sphere(r=1,$fn=fn);
}
module ellipsoid_world(p,r,fn=14){translate(p) scale(r) sphere(r=1,$fn=fn);}
module tapered_path(points,widths,depth=0.65,fn=10){
 for(i=[0:len(points)-2]) hull(){
  translate(image_point(points[i])) scale([widths[i],widths[i],widths[i]*depth]) sphere(1,$fn=fn);
  translate(image_point(points[i+1])) scale([widths[i+1],widths[i+1],widths[i+1]*depth]) sphere(1,$fn=fn);
 }
}
module arc_claw(points,r=0.07){
 tapered_path(points,[r,r*0.8,r*0.45,0.013],0.70,10);
}
module flame_path(points,radius_px=24,depth=0.42){
 tapered_path(points,[radius_px*0.43*px,radius_px*px,radius_px*0.75*px,radius_px*0.40*px,0.012],depth,12);
}
