//the Game objects contain the elements to make the game work correctly
function Game(){

	//elements of the game
	this.PAD1 = new Paddle();
	this.PAD2 = new Paddle();
	this.BALL = new Ball();
	this.BONUS = new bonusObject();
	this.BONUS_HANDLER = new bonusHandler();

	//players' handlers
	this.player1 = 'CPU';
	this.player2 = 'CPU';
	this.player1Points = 0;
	this.player2Points = 0;
	this.nextPlayer = 1;

	//utility variables
	this.intervalId;
	this.frameCounter = 0;
	this.pressedKey = [];
	this.pauseStatus = 'toPause';
	this.pauseBlock = false;
	this.dirBonus = -1;

	//Game status can only be one of the following strings:'mainMenu', 'playerSelection', 'inGamePlay', 'inGameWait', 'endGame'.
	this.gameStatus = 'mainMenu';
	
}

//start() let the game begin. It's called at the beginning and when one player makes point after a keypress
Game.prototype.start = function(player){

	//clear the screen
	drawItems();
	clearBonus();

	if(document.getElementById('winMsg') != null){

		cleanPrint('winMsg');
		cleanPrint('msg');
	
	}

	//decide which player the ball will go towards
	if(player == 1){
		GAME.BALL.angle = 135;
	}else if(player == 2){
		GAME.BALL.angle = 45;
	}

	//let the match begin
	GAME.intervalId = setInterval('Sketcher()', CLOCK);

	//the pause button block is enabled
	GAME.pauseBlock = false;

}

//pause() pauses/resumes the game. It's called after the spacebar is pressed in the middle of the game (not after a player makes a point)
Game.prototype.pause = function(){

	//if (pause is enabled){...}
	if(GAME.pauseBlock == false){
		//if the action to do after the spacebar press it's to pause the game
		if(GAME.pauseStatus == 'toPause'){
			//if the game hasn't already stopped
			if(GAME.intervalId!=null){
				//stops the game and displays the writing 'PAUSE'. Then it prepares to resume the game
				clearInterval(GAME.intervalId);
				printOnPlayground('PAUSE', 'pauseString');
				GAME.pauseStatus = 'toResume';
			}
		//if the action to do after the spacebar press it's to resume the game
		}else{
			//clean the Pause writing, then lets the game resume
			cleanPrint('pauseString');
			GAME.intervalId = setInterval('Sketcher()', CLOCK);
			GAME.pauseStatus = 'toPause';
		}	
	}
}

//reset() prepares the elements of the game for another round. It's called after a player makes point
Game.prototype.reset = function(){

	//stop the ball and the game
	GAME.BALL.speed = 0;
	clearInterval(GAME.intervalId);

	//check victory conditions
	if(GAME.player1Points == 10 || GAME.player2Points == 10){

		//print a victory message
		if(GAME.player1Points == 10){
			printOnPlayground('Player 1 wins!', 'winMsg');
		}

		if(GAME.player2Points == 10){
			printOnPlayground('Player 2 wins!', 'winMsg');
		}

		//clean everything
		clearBonus();
		GAME.pauseBlock = true;
		
		//check if the match was played by a human against the CPU
		var victoryVsCPU = false;
		var matchVsCPUOrHUMAN = 'HUMAN';

		if((GAME.player1 == 'HUMAN' && GAME.player2 == 'CPU' && GAME.player1Points == 10) || (GAME.player2 == 'HUMAN' && GAME.player1 == 'CPU' && GAME.player2Points == 10)){
			
			//give the user some points for the leaderboard and display'em
			var points = Math.abs(GAME.player1Points - GAME.player2Points);
			ajaxRequest('points', points);
			printOnPlayground('you\'ve earned ' + points + ' points', 'msg');
			victoryVsCPU = true;
			matchVsCPUOrHUMAN = 'CPU';
		}else if((GAME.player1 == 'HUMAN' && GAME.player2 == 'CPU')||(GAME.player2 == 'HUMAN' && GAME.player1 == 'CPU')){
			matchVsCPUOrHUMAN = 'CPU';
		}

		//update match played stats for the user
		ajaxRequest('matchPlayed', victoryVsCPU, matchVsCPUOrHUMAN);
		GAME.gameStatus = 'endGame';
		return;
	}

	//update played time stats for the user
	ajaxRequest('playTime', (GAME.frameCounter/100));

	//block every bonus effect for the next round
	if(typeof(GAME.BONUS_HANDLER.modifyPaddleSizeTimeout)!='undefined'){
		clearTimeout(GAME.BONUS_HANDLER.modifyPaddleSizeTimeout);
	}

	document.getElementById('wall1').style.visibility='hidden';
	document.getElementById('wall2').style.visibility='hidden';

	GAME.BONUS_HANDLER = new bonusHandler();
	
	GAME.gameStatus = 'inGameWait';
	GAME.frameCounter = 0;

	//if two cpus are playing against, then automatically begin the next round after a second
	if(GAME.player1 == 'CPU' && GAME.player2 == 'CPU'){
		setTimeout(GAME.keyDown,1000, 30);
		setTimeout(GAME.keyUp,1001, 30);
	}
}


//HANDLING PADDLE'S MOVEMENT (KEYDOWN AND KEYUP)

//IMPORTANT KEYS: 
//utility keys:
//				  32 - SPACEBAR
//				  13 - ENTER
//wasd controller:
//				  87 - W
//				  83 - S
//				  65 - A
//				  68 - D
//arrows controller:
//				  38 - ARROW UP
//				  40 - ARROW DOWN
//				  37 - ARROW LEFT
//				  39 - ARROW RIGHT			

//keyDown() handles every keypress
Game.prototype.keyDown = function(e){
	//if the key isn't already pressed (keydown event is called once and then repeated every 50 ms)
	if(GAME.pressedKey[e.keyCode]!=true){

		//notify that the key is now pressed
		GAME.pressedKey[e.keyCode] = true;

		//if we are in the player selection period of the game the keys' effects are:
		if(GAME.gameStatus == 'playerSelection'){
			switch(e.keyCode){
				case 13: //enter
					clearBeforeBegin();
					break;
				case 65: //A
					selectController('wasdController','left');
					break;
				case 68: //D
					selectController('wasdController','right');
					break;
		
				case 37: //<-
					selectController('arrowsController','left');
					break;
		
				case 39: //->
					selectController('arrowsController','right');
					break;
			}
	
		//if we are in the game the keys' effects are:
		}else if(GAME.gameStatus == 'inGamePlay'){
			switch(e.keyCode){
				case 32: //spacebar
					GAME.pause();
					break;
				case 83: //S
					GAME.PAD1.mov = 'down';
					break;
		
				case 87: //W
					GAME.PAD1.mov = 'up';
					break;
		
				case 40: //arrow down
					GAME.PAD2.mov = 'down';
					break;
		
				case 38: //arrow up
					GAME.PAD2.mov = 'up';
					break;
			}

		//if we are in the main menu the keys' effects are:
		}else if(GAME.gameStatus == 'mainMenu'){

				playerSelection();

		//if the game is stopped the keys' effects are:
		}else if(GAME.gameStatus == 'inGameWait'){

				GAME.gameStatus = 'inGamePlay';
				GAME.start(GAME.nextPlayer);

		//if we are at the end of game the keys' effects are:
		}else if(GAME.gameStatus == 'endGame'){

				cleanPrint('winMsg');
				cleanPrint('msg');
				gameSetup();

		}

	}
}


//keyUp() is useful to know if a key is already pressed or not
Game.prototype.keyUp = function(e){
	
	//if we are in the game
	if(GAME.gameStatus == 'inGamePlay'){

		//this part of the code checks if a movement key is pressed when the other is released. Then it moves to that direction
		//arrows controller
		if(e.keyCode == 40 || e.keyCode == 38){
	
			GAME.PAD2.mov = 'stop';
	
			switch(e.keyCode){
				case 40:
					if(GAME.pressedKey[38]==true){
						GAME.PAD2.mov = 'up';
					}
					break;
	
				case 38:
					if(GAME.pressedKey[40]==true){
						GAME.PAD2.mov = 'down';
					}
					break;
			}
		}
		
		//wasd controller
		if(e.keyCode == 83 || e.keyCode == 87){
	
			GAME.PAD1.mov = 'stop';
	
			switch(e.keyCode){
				case 83:
					if(GAME.pressedKey[87]==true){
						GAME.PAD1.mov = 'up';
					}
					break;
	
				case 87:
					if(GAME.pressedKey[83]==true){
						GAME.PAD1.mov = 'down';
					}
					break;
			}
			
		}
	}

	//notify that the key isn't pressed anymore
	GAME.pressedKey[e.keyCode] = false;
}