/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
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
