function createMap(){
	const mapx = 20;
	const mapy = 20;
	const tilesize = 64;

	let map = {};
	map.content = [];
	map.content[0] = content['grass2'];
	map.content[1] = content['dirt2'];

	map.tiles = [];

	for (var x = 0; x < mapx; x++) {
		map.tiles[x] = map.tiles[x] || [];
		for (var y = 0; y < mapy; y++) {
			map.tiles[x][y] = map.tiles[x][y] || [];
			// All noise functions return values in the range of -1 to 1.
			//var value = noise.simplex2(x / 100, y / 100);
			var value = noise.simplex2(x, y);
			value = Math.abs(value) * (map.content.length - 1);
			value = Math.round(value);

			map.tiles[x][y].value = value;
			map.tiles[x][y].frame = getRandomInt(0, map.content[value].frame_count - 1);
		}
	}

	map.render = function(context){
		map.tiles.forEach(function(y, yi){
			y.forEach(function(x, xi){
				let tile = x;
				map.content[tile.value].frame = tile.frame;
				map.content[tile.value].render({context: context, x: xi * tilesize, y: yi * tilesize});
			});
		});
	}

	return map;
}
