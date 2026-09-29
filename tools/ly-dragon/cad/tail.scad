include <geometry.scad>;
module tail(){
 for(j=[0:3]) flame_path(tail_flame_blueprint[j],j==1?62:50,0.48);
 // Separate inner sweeping leaves create an actual tail-flame mass.
 flame_path([[104,512],[154,382],[215,248],[248,148],[265,101]],25,0.38);
 flame_path([[104,513],[81,376],[79,260],[109,152],[123,109]],25,0.38);
}
