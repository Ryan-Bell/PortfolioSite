 function createPlayer(x,y){
 let player = {
    x: x,
    y: y,
    direction: 0,
    speed : 3.5
};
player.idle = content['player-basic-idle'];
player.running = content['player-basic-run'];
player.animation = player.idle;

player.update = function(context){
    //erase old player before updating position
    this.animation.clear({context: context, x: this.x, y: this.y});
    
    
    this.animation = this.idle; 
    if(keydown[KEYBOARD.KEY_UP] || keydown[KEYBOARD.KEY_W]){
        this.y -= this.speed;
        this.direction = 0;
        this.animation = this.running;
    }
    else if(keydown[KEYBOARD.KEY_DOWN] || keydown[KEYBOARD.KEY_S]){
        this.y +=  this.speed;
        this.direction = 4;
        this.animation = this.running;
    }
    //TODO: how to avoid??
    else{
        this.direction = -1;
    }
    if(keydown[KEYBOARD.KEY_LEFT] || keydown[KEYBOARD.KEY_A]){
        this.x -= this.speed;
        let map = {
            '-1' : '6',
            '0' : '7',
            '4' : '5'
        };
        this.direction = map[this.direction];
        
        this.animation = this.running;
    }
    else if(keydown[KEYBOARD.KEY_RIGHT] || keydown[KEYBOARD.KEY_D]){
        this.x += this.speed;

         let map = {
            '-1' : '2',
            '0' : '1',
            '4' : '3'
        };
        this.direction = map[this.direction];
        
        this.animation = this.running;
    }
    if(this.direction < 0) this.direction = 0;
    this.animation.update();
};
player.render = function(context){
    this.animation.render({context: context, row: this.direction, x: this.x, y: this.y});
};
return player;
 }
