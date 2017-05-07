function sprite(options){ 
    let o = {
        filename: options.filename,
        width : options.width,
        height: options.height,
        directionCount: options.directionCount,
        frame_count : options.frame_count,
        animation_speed : options.animation_speed,
        shift : options.shift,
        frame : 0,
        tick : 0,
        img : undefined,
        load : function(){
            o.img = loadImage(o.filename);
        },
        //TODO: this needs to be time based and the animation speed may be off
        update : function(){
            if(++o.tick > o.animation_speed){
                o.tick = 0;
                if(++o.frame >= o.frame_count)
                    o.frame = 0;
            }
        },
        clear : function(ops){
            ops.x = ops.x || 0;
            ops.y = ops.y || 0;
            ops.context.clearRect(ops.x, ops.y, o.width, o.height);
        },
        render : function(ops){
            ops.x = ops.x || 0;
            ops.y = ops.y || 0;
            ops.row = ops.row || 0;
            ops.context.drawImage(
                o.img,
                o.frame * o.width,
                ops.row * o.height,
                o.width,
                o.height,
                ops.x,
                ops.y,
                o.width,
                o.height
            );
        }
    };
    return o;
}
