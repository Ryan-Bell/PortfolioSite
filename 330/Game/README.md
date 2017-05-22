# Requirements  

## 1. Media Requirements: (20%)  
### Sound (required on game only):
- [x] A background sound that loops  
- [x] Effect sounds  
- [x] Keep your sound file sizes as small as possible. Primarily use MP3's; WAV's are OK for short sound effects  
- [x] DO NOT use the sounds that were given to you in class  
### Images:  
- [x] Consistent theme or style  
- [x] Optimized bitmap Graphics (JPEG or PNG) must be used, NOT BMP, TIFF, and so on  
- [x] DO NOT use the graphics that were given to you in class  
### Text/Fonts:  
- [x] Text must be displayed in theme appropriate embedded Web Fonts - Times New Roman need not apply!  
- [x] Size the text so that it is easy to read  
### Canvas Drawing/Animation:
- [x] Most or all of the game/experience will be drawn into an HTML5 <canvas> element utilizing the Canvas 2D drawing API.  
- [x] Must draw an image on the canvas (HTML5 Canvas Image Tutorial)  
- [x] Must draw an image animation on the canvas using a Sprite Sheet  
- [ ] Must draw a particle system to the canvas  
- [x] Animations must be smoothed using dt ("delta time")  
- [x] Must cancel animations with window.cancelAnimationFrame()  
- [x] The project should have visually engaging graphics and effects.  
- [ ] Use a variety of <canvas> capabilities including the ability to draw paths, bitmaps, gradients, shadows, the globalCompositeOperation property, and so on.  

## 2. Interaction Requirements (20%)  
### Control (game)  
- [x] The player should be able to control at least one sprite on the screen using mouse and/or keyboard.  
- [x] Controls should be easy to use, responsive and intuitive.  
- [x] Game must have keyboard controls. Map controls to both WASD and arrow keys if appropriate. DO NOT map to PC-only keys like PageUp or the Home key.  
- [x] Use a "key daemon" array to capture multiple key inputs simultaneously. For example, shift+space may jump higher than a normal jump (space) or shift + an arrow may run faster than just a normal arrow key.  

## 3. Usability Requirements (20%)  
- [x] Experience must pause/unpause with window.onblur and window.onfocus  
- [x] Teaching: The player should have no trouble figuring out how to play the game/experience. You should probably provide instructions.  
- [x] Feedback: The player should intuitively know what "state" the game/experience is in, and if their actions hindered or helped their progress in the game. A score should be visible to the player.  
- [x] Difficulty: Be nice to your players. The game should be easy at first, then it gets harder. The player shouldn't die in 2 seconds like Flappy Birds.  
- [x] Mouse and onscreen UI buttons preferred over interface keyboard shortcuts. The easiest way to do this is an absolute positioned <button> tag over the canvas element. Alternatively, you can create "canvas buttons" by drawing a rounded rectangle "button" into the canvas.  
### Game only Requirement - Screens  
At a bare minimum there should be three screens (i.e. states):  
- [x] Title/Intro/Instructions screen or screens  
- [x] Main game screen  
- [x] Game over/Play Again? screen  
- [x] Important! Put your name somewhere in the project so that it is visible to the user. A game will have your name either on a title screen or game over screen.  

## 4. Experience/Game Design Requirements (20%)  
### Meeting your plan:  
- [x] It's expected that your game/experience will change from the proposal, but overall you need to create an approximation of what you planned.  
### Game Specific Requirements - an "approachable" game:  
- [x] Playable by at least one person, has rules, has a win/lose condition?  
- [ ] Do player choices matter?  
- [ ] Does your game have depth ?  
- [ ] As the player learns how to play the game can they improve?  
- [ ] Is the game/experience fun and/or engaging and something people (besides you and your friends) would want to play?  
- [ ] Do your sprites behave in interesting ways that go beyond what we did in class?  

## 5. Coding Requirements (20%)  
- [x] Libraries that completely encapsulate the canvas drawing API such as Three.js, Babylon.js, Processing.js, D3.js, and EaselJS are NOT ALLOWED. *  
- [x] Any and all JavaScript Game Engines (Phaser, Lime.js, Impact.js, Quintus.js, etc...) are NOT ALLOWED. *  
- [x] JS libraries may only be used with prior approval - if you feel you need one, just ask in advance!  
JS Code:  
- [x] Must preload images (See JS Image Slideshow Demo)  
- [x] Must use object literals  
- [x] Must use the module pattern  
- [x] Must use least 2 new Function constructors (like Bullet, Enemy, ...) that were created by you.  
