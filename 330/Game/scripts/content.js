let content = {};

content['grass2'] = sprite({
	filename : "./base/graphics/terrain/grass/grass2.png",
	width : 64,
	height : 64,
	direction_count : 1,
	frame_count : 20,
	animation_speed : 0.0
});

content['dirt2'] = sprite({
	filename : "./base/graphics/terrain/dirt/dirt2.png",
	width : 64,
	height : 64,
	direction_count : 1,
	frame_count : 30,
	animation_speed : 0.0
});

content['dirt-inner-corner'] = sprite({
	filename : "./base/graphics/terrain/dirt/dirt-inner-corner.png",
	width : 32,
	height : 32,
	direction_count : 4,
	frame_count : 8,
	animation_speed : 0.0
});

content['dirt-outer-corner'] = sprite({
	filename : "./base/graphics/terrain/dirt/dirt-outer-corner.png",
	width : 32,
	height : 32,
	direction_count : 4,
	frame_count : 8,
	animation_speed : 0.0
});

content['dirt-side'] = sprite({
	filename : "./base/graphics/terrain/dirt/dirt-side.png",
	width : 32,
	height : 32,
	direction_count : 4,
	frame_count : 8,
	animation_speed : 0.0
});

content['player-basic-idle'] = sprite({
	filename : "./base/graphics/entity/player/player-basic-idle.png",
	width : 53,
	height : 73,
	direction_count : 8,
	frame_count : 22,
	animation_speed : 0.15,
	shift : [0, -0.5]
});

content['player-basic-run'] = sprite({
	filename : "./base/graphics/entity/player/player-basic-run.png",
	width : 48,
	height : 71,
	frame_count : 22,
	direction_count : 8,
	shift : [0, -0.484375],
	//distance_per_frame : 0.35,
	animation_speed : 0.60
});

content['big-explosion'] = sprite({
		filename : './base/graphics/entity/big-explosion/big-explosion.png',
	width : 48,
	height : 71,
	frame_count : 22,
	direction_count : 1,
	animation_speed : 0.60
});

content['worm-attack-01'] = sprite({
	filename : "./base/graphics/entity/worm/worm-attack-01.png",
	width : 248,
	height : 196,
	frame_count : 8,
	direction_count : 8,
	animation_speed : 0.60
});

content['worm-attack-02'] = sprite({
	filename : "./base/graphics/entity/worm/worm-attack-01.png",
	width : 248,
	height : 196,
	frame_count : 8,
	direction_count : 8,
	animation_speed : 0.60
});

content['worm-die'] = sprite({
	filename : "./base/graphics/entity/worm/worm-die.png",
	width : 198,
	height : 171,
	frame_count : 6,
	direction_count : 4,
	animation_speed : 0.60
});

content['worm-folded'] = sprite({
	filename : "./base/graphics/entity/worm/worm-folded.png",
	width : 143,
	height : 104,
	frame_count : 5,
	direction_count : 1,
	animation_speed : 0.60
});

content.loadAll = function(){
	Object.keys(content).forEach((key)=>{
		if(key == 'loadAll') return;
		content[key].load();
	});
}

function loadImage(path){
	var img = new Image();
	img.src = path;
	return img;
}
