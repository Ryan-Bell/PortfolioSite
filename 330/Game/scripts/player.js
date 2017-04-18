 function createPlayer(x,y){
 let player = {
    x: x,
    y: y,
    direction: 0
};
player.idle = sprite({
    filename : "./base/graphics/entity/player/player-basic-idle.png",      
    width : 53,
    height : 73,
    direction_count : 8,
    frame_count : 22,
    animation_speed : 0.15,
    shift : [0, -0.5]
});
player.running = sprite({
    filename : "./base/graphics/entity/player/player-basic-run.png",
    width : 48,
    height : 71,
    frame_count : 22,
    direction_count : 8,
    shift : [0, -0.484375],
    //distance_per_frame : 0.35,
    animation_speed : 0.60
});
player.animation = player.idle;

player.update = function(context){
    //erase old player before updating position
    this.animation.clear({context: context, x: this.x, y: this.y});
    
    //TODO: fix the nested key atrosity
    if(keydown[KEYBOARD.KEY_UP]){
        this.y--;
        this.direction = 0;
        this.animation = this.running;
    }
    else if(keydown[KEYBOARD.KEY_DOWN]){
        this.y++;
        this.direction = 4;
        this.animation = this.running;
    }
    else {
        this.animation = this.idle; 
    }
    this.animation.update();
};
player.render = function(context){
    this.animation.render({context: context, row: this.direction, x: this.x, y: this.y});
};
return player;
 }