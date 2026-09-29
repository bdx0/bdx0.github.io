include <parameters.scad>;
use <body.scad>;
use <head.scad>;
use <mane.scad>;
use <tail.scad>;
use <legs.scad>;

// Canonical CAD assembly. CLI exports each part through -D 'part="body"'.
if(part=="all" || part=="body") body();
if(part=="all" || part=="belly") belly();
if(part=="all" || part=="scales") scales();
if(part=="all" || part=="head") head();
if(part=="all" || part=="face_details") face_details();
if(part=="all" || part=="horns") horns();
if(part=="all" || part=="whiskers") whiskers();
if(part=="all" || part=="mane") mane();
if(part=="all" || part=="tail") tail();
if(part=="all" || part=="legs") legs();
