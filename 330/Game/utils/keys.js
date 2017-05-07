"use strict";
let KEYBOARD = Object.freeze({
    "KEY_LEFT": 37, 
    "KEY_UP": 38, 
    "KEY_RIGHT": 39, 
    "KEY_DOWN": 40,
    "KEY_SPACE": 32,
    "KEY_SHIFT": 16,
    "KEY_W": 87,
    "KEY_A": 65,
    "KEY_S": 83,
    "KEY_D": 68
});

let keydown = [];
window.addEventListener("keydown",function(e){
    keydown[e.keyCode] = true;
});
    
window.addEventListener("keyup",function(e){
    keydown[e.keyCode] = false;
});
