include <geometry.scad>;
module one_leg(hip,knee,ankle,foot,mirrored=0){
 translate([0,0,mirrored?-0.25:0.23]){
  tapered_path([hip,knee,ankle,foot],[0.25,0.19,0.12,0.09],0.80,12);
  for(k=[-1:1]){
   p0=[foot[0]+k*12,foot[1]+5];
   p1=[foot[0]+k*17+5,foot[1]+27];
   p2=[foot[0]+k*19+9,foot[1]+52];
   p3=[foot[0]+k*22+15,foot[1]+67];
   arc_claw([p0,p1,p2,p3],0.07);
  }
 }
}
module legs(){
 // Three visible leg anchors and a fourth leg on the far side.
 one_leg([455,680],[439,741],[408,800],[379,827]);
 one_leg([924,728],[1000,787],[1060,799],[1072,826]);
 one_leg([1159,582],[1219,639],[1268,708],[1280,758]);
 one_leg([886,703],[933,760],[965,785],[972,815],1);
}
