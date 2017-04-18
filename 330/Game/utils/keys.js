"use strict";
let KEYBOARD = Object.freeze({
    "KEY_LEFT": 37, 
    "KEY_UP": 38, 
    "KEY_RIGHT": 39, 
    "KEY_DOWN": 40,
    "KEY_SPACE": 32,
    "KEY_SHIFT": 16
});

let keydown = [];
window.addEventListener("keydown",function(e){
    keydown[e.keyCode] = true;
});
    
window.addEventListener("keyup",function(e){
    keydown[e.keyCode] = false;
});
