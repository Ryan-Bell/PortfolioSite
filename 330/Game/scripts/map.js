function createMap(){
	const mapx = 50;
	const mapy = 50;
	const tilesize = 64;
	const halftile = tilesize / 2;

	let map = {};
	map.content = [];
	map.content[0] = content['grass2'];
	map.content[1] = content['dirt2'];

	map.xOffset = 0;
	map.yOffset = 0;

	map.tiles = [];

	for (var x = 0; x < mapx; x++) {
		map.tiles[x] = map.tiles[x] || [];
		for (var y = 0; y < mapy; y++) {
			map.tiles[x][y] = map.tiles[x][y] || [];
			// All noise functions return values in the range of -1 to 1.
			var value = noise.simplex2(x / 25, y / 25);
			//var value = noise.simplex2(x, y);
			value = Math.abs(value) * (map.content.length - 1);
			value = Math.round(value);

			map.tiles[x][y].value = value;
			map.tiles[x][y].frame = getRandomInt(0, map.content[value].frame_count - 1);
		}
	}

	map.render = function(context, player){
		content['worm-attack-01'].update().render({context: context, x: 50,y: 50, row:0});
		map.render.lastx = map.render.lastx || player.x;
		map.render.lasty = map.render.lasty || player.y;

		if(map.render.lastx == player.x && map.render.lasty == player.y) return;

		let canvWidth = context.canvas.width;
		let canvHeight = context.canvas.height;
		let buffer = tilesize * 3;

		if(player.x < buffer){
			if(map.xOffset - player.speed >= 0){
				map.xOffset -= player.speed;
				player.x += player.speed;
				map.draw(context);
			}
		}

		if(player.x > canvWidth - buffer){
			if(map.xOffset + player.speed + canvWidth <= mapx * tilesize){
				map.xOffset += player.speed;
				player.x -= player.speed;
				map.draw(context);

			}
		}

		if(player.y < buffer){
			if(map.yOffset - player.speed >= 0){
				map.yOffset -= player.speed;
				player.y += player.speed;
				map.draw(context);
			}
		}

		if(player.y > canvHeight - buffer){
			if(map.yOffset + player.speed + canvHeight <= mapy * tilesize){
				map.yOffset += player.speed;
				player.y -= player.speed;
				map.draw(context);

			}
		}

		map.render.lastx = player.x;
		map.render.lasty = player.y;
	};

	map.draw = function(context, frills){
		for (var x = 0; x < mapx; x++) {
			for (var y = 0; y < mapy; y++) {
				let tile = map.tiles[x][y];
				map.content[tile.value].frame = tile.frame;
				map.content[tile.value].render({context: context, x: x * tilesize - map.xOffset, y: y * tilesize - map.yOffset});
			}
		}
		if(!frills) return;
		//second pass for the overlays
		for (var x = 0; x < mapx; x++) {
			for (var y = 0; y < mapy; y++) {
				let tile = map.tiles[x][y];
				let xi = x;
				let yi = y;
				if(tile.value == 0) continue;

				let tilex1 = x * tilesize;
				let tiley1 = y * tilesize;

				//because they are only half the width of a full tile
				let tilex2 = tilex1 + halftile;
				let tiley2 = tiley1 + halftile;

				//place edges
				//This will no work because it will change every frame
				content['dirt-side'].frame = getRandomInt(0, content['dirt-side'].frame_count - 1);

				//bottom
				content['dirt-side'].render({context: context, x: tilex1, y: tiley1 + tilesize, row: 0});
				content['dirt-side'].render({context: context, x: tilex2, y: tiley1 + tilesize, row: 0});

				//top
				content['dirt-side'].render({context: context, x: tilex1, y: tiley1 - halftile, row: 2});
				content['dirt-side'].render({context: context, x: tilex2, y: tiley1 - halftile, row: 2});

				//left
				content['dirt-side'].render({context: context, x: tilex1 - halftile, y: tiley1, row: 1});
				content['dirt-side'].render({context: context, x: tilex1 - halftile, y: tiley2, row: 1});

				//right
				content['dirt-side'].render({context: context, x: tilex1 + tilesize, y: tiley1, row: 3});
				content['dirt-side'].render({context: context, x: tilex1 + tilesize, y: tiley2, row: 3});


				//corners
				//lower left
				content['dirt-outer-corner'].render({context: context, x: tilex1 - halftile, y: tiley1 + tilesize, row: 0});
				//upper left
				content['dirt-outer-corner'].render({context: context, x: tilex1 - halftile, y: tiley1 - halftile, row: 1});
				//upper right
				content['dirt-outer-corner'].render({context: context, x: tilex1 + tilesize, y: tiley1 - halftile, row: 2});
				//lower right
				content['dirt-outer-corner'].render({context: context, x: tilex1 + tilesize, y: tiley1 + tilesize, row: 3});

				let otherTile = {};
				//inner corners
				//check lower left
				try {
					otherTile = map.tiles[xi - 1][yi + 1];
					if(otherTile.value == 1)
						content['dirt-inner-corner'].render({context: context, x: tilex1 - halftile, y: tiley1 + halftile, row: 1});
				} catch(e){}

				//check upper left
				try {
					otherTile = map.tiles[xi - 1][yi - 1];
					if(otherTile.value == 1)
						content['dirt-inner-corner'].render({context: context, x: tilex1 - halftile, y: tiley1, row: 0});
				} catch(e){}


				//check upper right
				try {
					otherTile = map.tiles[xi + 1][yi - 1];
					if(otherTile.value == 1)
						content['dirt-inner-corner'].render({context: context, x: tilex1 + tilesize, y: tiley1, row: 3});
				} catch(e){}

				//check lower right
				try {
					otherTile = map.tiles[xi + 1][yi + 1];
					if(otherTile.value == 1)
						content['dirt-inner-corner'].render({context: context, x: tilex1 + tilesize, y: tiley1 + halftile, row: 2});
				} catch(e){}

			};
		};
	}

	return map;
}
