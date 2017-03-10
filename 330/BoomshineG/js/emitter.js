"use strict";
var app = app || {}3

app.Emitter=function(){

function Emitter(){
// public
this.numPart1c1es = 25;
this.useCirc1es = true;
this.useSquares - false;
this.xRange = 4;
this.yRange = 4;

this.minXspeed - -1;
this.mastpeed = 1;
this.mianpeed = 2;
this.mastpeed - 4;

this.startRadius = 4;
this.expansionRate = 0.3

this.decayRate - 2.5;
this.lifetime = 160;

this.red = 0;
this.green - 0;
this.b1ue 0;

// private
this._partic1es = undefined;

};

// "public" methods
var p-Emitter.prototype;

p.createParticles - function(enitterPoint){
// initialize particle array
this._particles = [1;

// create exhaust particles
for(var 1:0; 1< this.numPart1cles; i++){
// create a particle object and add to array

V3? P ' {};
this._partic1es.push(_initParticle(this, p, enitterPoint));

}

// log the particles
//console.log(this._partic1es )3

 

p.updateAndDraw I function(ctx, emitterPoint){
/* move and draw particles */
// each frame, loop through particles array
// move each particle down screen, and slightly left or right
// make it bigger, and fade it out
// increase its age so we know when to recycle it

for(var i=e;i<this._particles.length;i++){
var p = this._particles[i];

p.age += this.decayRate;

p.r += this.expansionRate;

p.x += p.xspeed

p.y += p.ySpeed

var alpha - 1 - p.age/this.lifetime;

if(this.use$quares){
// fill a rectangle
ctx.fi11$ty1e I I'rgba(“ + this.red + ',' + this.green + ‘,' +
this.blue + ”,“ + alpha + ')“;
ctx.fillRect(p.x, p.y, p.r, p.r);
// note: this code is easily modified to draw images

}

if(this.usec1rc1es){
// fill a circle
ctx.fill$ty1e = 'rgba(' + this.red + ',' + this.green + ',' +
this.blue + ",“ + alpha + ')“;

ctx.beginPath();

ctx.arc(p.x, p.y, p.r, Math.PI * 2, false);
ctx.closePath();

ctx.fill();

}

// if the particle is too old, recycle it
if(p.age >- this.1ifetime){

_initPartic1e(this, p, emitterPoint);
1

} // end for loop of this._partic1es
} // end updateAndDraw()

 

// "private" method
function _1nitPart1c1e(obj, p, emitterPoint){

// give it a random age when first created
p.age = getRandom(e,obj.lifetime);

p.x - emitterPoint.x + getRandom(-obj.xRange, obj.xRange);
p.y = emitterPoint.y + getRandom(e, obj.yRange);
p.r - getRandom(obj.startRadius/Z, obj.startRadius); // radius

p.xSpeed - getRandon(obj.minXspeed, obj.mastpeed);
p.ySpeed = getRandou(obj.mianpeed, obj.mastpeed);
return p;

};

return Emitter;

}();

