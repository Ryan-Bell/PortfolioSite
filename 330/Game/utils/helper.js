function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMouse(e){
	var mouse = {} // make an object
	mouse.x = e.pageX - e.target.offsetLeft;
	mouse.y = e.pageY - e.target.offsetTop;
	return mouse;
}

function rectangleContainsPoint(rect, point){
	if(rect.width <= 0 || rect.height <= 0){
		return false;
	}
	return (point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height);
}
function calculateDeltaTime(){
	var now,fps;
	now = performance.now();
	fps = 1000 / (now - this.lastTime);
	fps = clamp(fps, 12, 60);
	this.lastTime = now;
	return 1/fps;
};
function clamp(val, min, max){
	return Math.max(min, Math.min(max, val));
}

function closest (num, arr) {
	var curr = arr[0];
	var diff = Math.abs (num - curr);
	for (var val = 0; val < arr.length; val++) {
		var newdiff = Math.abs (num - arr[val]);
		if (newdiff < diff) {
			diff = newdiff;
			curr = arr[val];
		}
	}
	return curr;
}

//expects 2d
function setMag(vector, mag){
	let currentMag = Math.sqrt(vector.x * vector.x + vector.y * vector.y);	
	return {
		x: vector.x / (currentMag) * mag,
		y: vector.y / (currentMag) * mag
	};
};
