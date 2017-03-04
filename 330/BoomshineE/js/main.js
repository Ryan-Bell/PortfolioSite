// main.js
// Dependencies: 
// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

/*
 .main is an object literal that is a property of the app global
 This object literal has its own properties and methods (functions)
 
 */
app.main = {
	//  properties
    WIDTH : 640, 
    HEIGHT: 480,
    canvas: undefined,
    ctx: undefined,
   	lastTime: 0, // used by calculateDeltaTime() 
    debug: true,
		paused: false,
		animationID: 0,

		gameState: undefined,
		roundScore: 0,
		totalScore: 0,

		bgAudio: undefined,
		effectAudio: undefined,
		currentEffect: 0,
		currentDirection: 1,
		effectSouds: ['1.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3', '6.mp3', '7.mp3', '8.mp3'],

		CIRCLE_STATE: {
			NORMAL: 0,
			EXPLODING: 1,
			MAX_SIZE: 2,
			IMPLODING: 3,
			DONE: 4
		},
		CIRCLE: Object.freeze({
			NUM_CIRCLES_START: 5,
			NUM_CIRCLES_END: 20,
			START_RADIUS: 8,
			MAX_RADIUS: 45,
			MIN_RADIUS: 2,
			MAX_LIFETIME: 2.5,
			MAX_SPEED: 80,
			EXPLOSION_SPEED: 60,
			IMPLOSION_SPEED: 84
		}),
		GAME_STATE: Object.freeze({
			BEGIN: 0,
			DEFAULT: 1,
			EXPLODING: 2,
			ROUND_OVER: 3,
			REPEAT_LEVEL: 4,
			END: 5
		}),
		circles: [],
		colors: ['#fd5b78', '#ff6037', '#ff9966', '#ffff66', '#66ff66', '#50bfe6', '#ff6eff', '#ee34d2'],

    // methods
	init : function() {
		console.log("app.main.init() called");
		// initialize properties
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		
		this.numCircles = this.CIRCLE.NUM_CIRCLES_START;
		this.circles = this.makeCircles(this.numCircles);
		this.canvas.onmousedown = this.doMousedown.bind(this);
	
		this.bgAudio = document.querySelector('#bgAudio');
		this.bgAudio.volume = 0.25;
		this.effectAudio = document.querySelector('#effectAudio');
		this.effectAudio.volume = 0.3;

		this.gameState = this.GAME_STATE.BEGIN;
		this.reset();
		// start the game loop
		this.update();
	},
	reset: function(){
		this.numCircles += 5;
		this.roundScore = 0;
		this.circles = this.makeCircles(this.numCircles);
	},
	
	update: function(){
		// 1) LOOP
		// schedule a call to update()
	 	this.animationID = requestAnimationFrame(this.update.bind(this));
	 	
	 	// 2) PAUSED?
	 	// if so, bail out of loop
		if(this.paused){
			this.drawPauseScreen(this.ctx);
			return;
		}
	 	
	 	// 3) HOW MUCH TIME HAS GONE BY?
	 	var dt = this.calculateDeltaTime();
	 	 
	 	// 4) UPDATE
	 	// move circles
		this.moveCircles(dt);

		//CHECK FOR COLLISIONS
		this.checkForCollisions();		
	
	 	
		// 5) DRAW	
		// i) draw background
		this.ctx.fillStyle = "black"; 
		this.ctx.fillRect(0,0,this.WIDTH,this.HEIGHT); 
	
		// ii) draw circles
		this.ctx.globalAlpha = 0.9;
		this.drawCircles(this.ctx);	
	
		// iii) draw HUD
		this.ctx.globalAlpha = 1.0;
		this.drawHUD(this.ctx);
		
		
		// iv) draw debug info
		if (this.debug){
			// draw dt in bottom right corner
			this.fillText(this.ctx, "dt: " + dt.toFixed(3), this.WIDTH - 150, this.HEIGHT - 10, "18pt courier", "white");
		}
		
	},
	
	fillText: function(ctx,string, x, y, css, color) {
		ctx.save();
		// https://developer.mozilla.org/en-US/docs/Web/CSS/font
		ctx.font = css;
		ctx.fillStyle = color;
		ctx.fillText(string, x, y);
		ctx.restore();
	},
	
	calculateDeltaTime: function(){
		var now,fps;
		now = performance.now(); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
		return 1/fps;
	},
	makeCircles: function(num){
		var circleMove = function(dt){
			this.x += this.xSpeed * this.speed * dt;
			this.y += this.ySpeed * this.speed * dt;
		};
		var circleDraw = function(ctx){
			ctx.save();
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
			ctx.closePath();
			ctx.fillStyle = this.fillStyle;
			ctx.fill();
			ctx.restore();
		};

		var array = [];
		for(var i =0; i < num; i++){
			var c = {};
			c.x = getRandom(this.CIRCLE.START_RADIUS * 2, this.WIDTH - this.CIRCLE.START_RADIUS * 2);
			c.y = getRandom(this.CIRCLE.START_RADIUS * 2, this.HEIGHT - this.CIRCLE.START_RADIUS * 2);

			//add a radius property
			c.radius = this.CIRCLE.START_RADIUS;

			var randomVector = getRandomUnitVector();
			c.xSpeed = randomVector.x;
			c.ySpeed = randomVector.y;

			//make more properties
			c.speed = this.CIRCLE.MAX_SPEED;
			c.fillStyle = this.colors[i % this.colors.length]
			c.state = this.CIRCLE_STATE.NORMAL;
			c.lifetime = 0;
			c.draw = circleDraw;
			c.move = circleMove;

			Object.seal(c);
			array.push(c);
		}
		return array;
	},
	drawCircles: function(ctx){
		if(this.gameState == this.GAME_STATE.ROUND_OVER) this.ctx.globalAlpha = 0.25;
		for(var i = 0; i< this.circles.length; i++){
			var c = this.circles[i];
			if(c.state == this.CIRCLE_STATE.DONE) continue;
			c.draw(ctx);
		}
	},
	moveCircles: function(dt){
		for(var i = 0; i < this.circles.length; i++){
			var c = this.circles[i];
			if(c.state === this.CIRCLE_STATE.DONE) continue;
			if(c.state === this.CIRCLE_STATE.EXPLODING){
				c.radius += this.CIRCLE.EXPLOSION_SPEED * dt;
				if(c.radius >= this.CIRCLE.MAX_RADIUS){
					c.state = this.CIRCLE_STATE.MAX_SIZE;
				}
				continue;
			}

			if(c.state === this.CIRCLE_STATE.MAX_SIZE){
				c.lifetime += dt;
				if(c.lifetime >= this.CIRCLE.MAX_LIFETIME){
					c.state = this.CIRCLE_STATE.IMPLODING;
				}
				continue;
			}

			if(c.state === this.CIRCLE_STATE.IMPLODING){
				c.radius -= this.CIRCLE.IMPLOSION_SPEED * dt;
				if(c.radius <= this.CIRCLE.MIN_RADIUS){
					c.state = this.CIRCLE_STATE.DONE;
					continue;
				}
			}

			c.move(dt);

			if(this.circleHitLeftRight(c)){
			 	c.xSpeed *= -1;
				c.move(dt);
			}
			if(this.circleHitTopBottom(c)){
			 	c.ySpeed *= -1;
				c.move(dt);
			}
		}
	},
	circleHitLeftRight: function(c){
		if (c.x < c.radius || c.x > this.WIDTH - c.radius){
			return true;
		}
	},
	circleHitTopBottom: function(c){
		if(c.y < c.radius || c.y > this.HEIGHT - c.radius){
			return true;
		}
	},
	drawPauseScreen: function(ctx){
		ctx.save();
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,this.WIDTH, this.HEIGHT);
		ctx.textAlign = "center";
		ctx.textBaseline = 'middle';
		this.fillText(this.ctx, '...PAUSED...', this.WIDTH/2, this.HEIGHT/2, '40pt courier', 'white');
		ctx.restore();
	},
	doMousedown: function(e){
		this.bgAudio.play();
		if(this.paused){
			this.paused = false;
			this.update();
			return;
		}
		if(this.gameState === this.GAME_STATE.EXPLODING) return;
		if(this.gameState == this.GAME_STATE.ROUND_OVER){
			this.gameState = this.GAME_STATE.DEFAULT;
			this.reset();
			return;
		}
		var mouse = getMouse(e);
		this.checkCircleClicked(mouse);
	},
	checkCircleClicked: function(mouse){
		for(var i = this.circles.length - 1; i>=0; i--){
			var c = this.circles[i];
			if( pointInsideCircle(mouse.x, mouse.y, c)){
				this.playEffect();
				c.xSpeed = c.ySpeed = 0;
				c.state = this.CIRCLE_STATE.EXPLODING;
				this.gameState = this.GAME_STATE.EXPLODING;
				this.roundScore++;
				break;
			}
		}
	},
	checkForCollisions: function(){
		if(this.gameState == this.GAME_STATE.EXPLODING){
			for(var i =0; i < this.circles.length; i++){
				var c1 = this.circles[i];
				if(c1.state === this.CIRCLE_STATE.NORMAL) continue;
				if(c1.state === this.CIRCLE_STATE.DONE) continue;
				for(var j=0;j<this.circles.length; j++){
					var c2 = this.circles[j];
					if(c1===c2) continue;
					if(c2.state != this.CIRCLE_STATE.NORMAL) continue;
					if(c2.state === this.CIRCLE_STATE.DONE) continue;

					if(circlesIntersect(c1, c2)){
						this.playEffect();
						c2.state = this.CIRCLE_STATE.EXPLODING;
						c2.xSpeed = c2.ySpeed = 0;
						this.roundScore++;
					}
				}
			}

			var isOver = true;
			for(var i =0;i<this.circles.length; i++){
				var c = this.circles[i];
				if(c.state != this.CIRCLE_STATE.NORMAL && c.state != this.CIRCLE_STATE.DONE){
					isOver = false;
					break;
				}
			}

			if(isOver){
				this.stopBGAudio();
				this.gameState = this.GAME_STATE.ROUND_OVER;
				this.totalScore += this.roundScore;
			}
		}
	},
	drawHUD: function(ctx){
		ctx.save();
		ctx.globalAlpha = 1.0;
		this.fillText(this.ctx, 'This Round: ' + this.roundScore + ' of ' + this.numCircles, 20,20,'14pt courier','#ddd');
		this.fillText(this.ctx, 'Total Score: ' + this.totalScore, this.WIDTH - 200, 20, '14pt courier', '#ddd');	

		if(this.gameState == this.GAME_STATE.BEGIN){
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			this.fillText(this.ctx, 'To begin, click a circle', this.WIDTH/2, this.HEIGHT/2, '30pt courier', 'white');
		} 
		if(this.gameState == this.GAME_STATE.ROUND_OVER){
			ctx.save();
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			this.fillText(this.ctx, 'Round Over', this.WIDTH/2, this.HEIGHT/2 - 40, '30pt courier', 'red');
			this.fillText(this.ctx, 'Click to Continue', this.WIDTH/2, this.HEIGHT/2, '30pt courier', 'red');
			this.fillText(this.ctx, 'Next round there are ' + (+this.numCircles + 5) + ' circles', this.WIDTH/2, this.HEIGHT/2 + 40, '15pt courier', 'red');
		}
		ctx.restore();
	},
	pauseGame: function(){
		this.stopBGAudio();
		this.paused = true;
		cancelAnimationFrame(this.animationID);
		this.update();
	},
	resumeGame: function(){
		cancelAnimationFrame(this.animationID);
		this.paused = false;
		this.bgAudio.play();
		this.update();	
	},
	stopBGAudio: function(){
		this.bgAudio.pause();
		this.bgAudio.currentTime = 0;	
	},
	playEffect: function(){
		this.effectAudio.src = 'media/' + this.effectSouds[this.currentEffect];
		this.effectAudio.play();

		this.currentEffect += this.currentDirection;
		if(this.currentEffect == this.effectSouds.length || this.currentEffect == -1){
			this.currentDirection *= -1;
			this.currentEffect += this.currentDirection;
		}
	}
}; // end app.main
