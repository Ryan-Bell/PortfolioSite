'use strict';

function Enemy(ctx){
	this.health = 10;
	this.direction = 0;
	this.frame = getRandomInt(0, 8);
	this.x = getRandomInt(20, 50 * 64 - 20);
	this.y = getRandomInt(20, 50 * 64 - 20);
	this.xoff = 0;
	this.yoff = 0;
	this.context = ctx;
	this.tick = 0;
	this.animation_sheet = 1;
	this.dead = false;
}

(function(){
	let e = Enemy.prototype;
	e.as = function(x, y){
		if(this.dead) return this;
		this.xoff = x;
		this.yoff = y;
		return this;
	};
	e.update = function(dt, player){
		content['worm-attack-0' + this.animation_sheet].clear({context: this.context, x: this.x - this.xoff, y: this.y - this.yoff});
		if(this.dead) return this;

		//update frame
		if(++this.tick > content['worm-attack-0' + this.animation_sheet].animation_speed){
			this.tick = 0;
			if(++this.frame >= content['worm-attack-0' + this.animation_sheet].frame_count){
				this.frame = 0;
			}
		}

		//update direction
		let adjx = this.x - this.xoff;
		let adjy = this.y - this.yoff;
		let diffx = player.x - adjx;
		let diffy = player.y - adjy;
		let vector = {
			x: diffx,
			y: diffy
		};
		vector = setMag(vector, 1);
		let arr = [1, Math.sqrt(3)/2, Math.sqrt(2)/2, 0.5, 0, -0.5, -Math.sqrt(2)/2, -Math.sqrt(3)/2, -1];
		vector.x = closest(vector.x, arr);
		vector.y = closest(vector.y, arr);

		if(player.x > adjx){
			//pick from 01
			this.direction = 7 - arr.indexOf(vector.y);
			this.direction = clamp(this.direction, 0,7);
			this.animation_sheet = 1;

		} else {
			//pick from 02
			this.direction = arr.indexOf(vector.y);
			this.direction = clamp(this.direction, 0,7);
			this.animation_sheet = 2;

		}

		return this;
	};
	e.checkHit = function(point){
		if(this.dead) return this;
		let adjx = this.x - this.xoff;
		let adjy = this.y - this.yoff;
		if(rectangleContainsPoint({x: adjx, y: adjy, width: 248, height: 196}, point)){
			this.health -= 1;
		}
		if(this.health <= 0) this.dead = true;
		return this;
	};
	e.render = function(){
		if(this.dead) return this;
		content['worm-attack-0' + this.animation_sheet].render({context: this.context, row: this.direction, x: this.x - this.xoff, y: this.y - this.yoff, frame: this.frame});
		return this;
	};
})();
