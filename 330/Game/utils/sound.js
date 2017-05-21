// sound.js
"use strict";

// define the .sound module and immediately invoke it in an IIFE
let sound = (function(){
	var bgAudio = document.querySelector("#bgAudio");
	bgAudio.volume=0.25;

	var effectAudio = document.querySelector("#effectAudio");
	effectAudio.volume = 0.3;

	var currentEffect = 0;
	var currentDirection = 1;
	var effectSounds = ['heavy-gunshot-1.mp3','heavy-gunshot-2.mp3','heavy-gunshot-3.mp3','heavy-gunshot-4.mp3'];
	
	function playEffect(){
		effectAudio.src = "./base/sounds/" + effectSounds[currentEffect];
		effectAudio.play();
		currentEffect += currentDirection;
		if (currentEffect == effectSounds.length || currentEffect == -1){
			currentDirection *= -1;
			currentEffect += currentDirection;
		}
	}

	function playBGAudio(){
		bgAudio.play();
	}
		
	// export a public interface to this module
	return {
		playEffect: playEffect,
		playBGAudio: playBGAudio
	};
})();
