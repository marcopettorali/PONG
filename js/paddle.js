//the Paddle objects contain all the parameters to make the paddle move and bounce the ball
function Paddle(){
	this.pos = PLAYGROUND_HEIGHT/2;
	this.speed = 10;
	this.mov = 'stop';
	this.keyPressed = 0;

	//AIoffset is a handicap for CPU players that make the paddle be less precise when calculates its movements
	this.AIoffset = 0;
}

//movePaddle() moves the paddle up and down on the playground and prevents the paddle move out of it
function movePaddle(pos, height, player){

	var PAD = (player==1) ? GAME.PAD1 : GAME.PAD2;
	var paddle = (player==1) ? paddle1 : paddle2;

	//notice that 'pos' is meant to be the middle position of the paddle.
	//'pos + height/2' it's the paddle's lower side, while 'pos - height/2' it's the upper one

	if(PAD.mov=='down'){
		if(pos+(height/2)+PAD.speed>PLAYGROUND_HEIGHT){
			PAD.pos = PLAYGROUND_HEIGHT - (height/2);
		}else if(pos+(height/2)<PLAYGROUND_HEIGHT){
			PAD.pos += PAD.speed;
		}
	}else if(PAD.mov=='up'){
		if(pos-(height/2)-PAD.speed<0){
			PAD.pos = (height/2);
		}else if(pos-(height/2)>0){
			PAD.pos -= PAD.speed;
		}
	}

	paddle.style.top = PAD.pos + 'px';

}

//artificialIntelligence() implements a very simple intelligence for moving the paddles by the CPU
function artificialIntelligence(pos, heightPad, player){

	var PAD = (player == 1)? GAME.PAD1: GAME.PAD2;

	//the CPU controlled paddle can only see the ball if it's in its half of the playground
	//this makes the CPU act more naturally, especially when two CPUs are playing together
	var visibilityCond = (player==1)? (GAME.BALL.horPos < (PLAYGROUND_WIDTH/2)):(GAME.BALL.horPos > (PLAYGROUND_WIDTH/2));
	var ballSpeedCond = (player==1)? (GAME.BALL.horSpeed < 0) : (GAME.BALL.horSpeed > 0);

	//the offset is update randomly every second of game after two seconds
	if(GAME.frameCounter%100 == 0 && GAME.frameCounter > 200){
		PAD.AIoffset += Math.floor((Math.random())*30)-15;
	}
	
	//BEHAVIOUR OF CPU CONTROLLED PADDLES:

	//1) if the ball it's on its half and goes towards it, then try to catch the ball;
	//2) if a bonus is on the screen, it's not a malus and there's no ball going to it, then try to catch the bonus;
	//3) if a malus is on the screen, try to avoid it;
	//4) if nothing happens try to reach the middle of the playground.
	if(visibilityCond && ballSpeedCond){
		seek(GAME.BALL.verPos, PAD, pos, heightPad, player, counter);
	}else if(GAME.BONUS.onScreen && GAME.dirBonus*(player-1.5) >0 && GAME.BONUS.type != 'decreasePaddleSize'){
		seek((GAME.BONUS.verPos), PAD, pos, heightPad, player, counter);
	}else if(GAME.BONUS.onScreen && GAME.dirBonus*(player-1.5) >0 && GAME.BONUS.type == 'decreasePaddleSize'){
		seek((GAME.BONUS.verPos +  (PLAYGROUND_HEIGHT/2))%PLAYGROUND_HEIGHT, PAD, pos, heightPad, player, counter);
	}else{
		seek((PLAYGROUND_HEIGHT/2), PAD, pos, heightPad, player, counter);
	}

	//this behaviour and the offset mechanism let the cpu controlled paddle to behave more like a human 
	//than like a precise numerical-controlled element

}

//seek() lets the paddle move towards a direction by comparing its position with the target position
function seek(target, PAD, pos, heightPad, player, counter){

	if(target < pos + heightPad/2 + PAD.AIoffset && target > pos - heightPad/2 - PAD.AIoffset){
			PAD.mov = 'stop';
	}else if(target > pos + heightPad/2 + PAD.AIoffset){
		PAD.mov = 'down';
	}else{
		PAD.mov = 'up';
	}
}

//handleAI() checks if a paddle it's controlled by the CPU or not
function handleAI(paddle1Pos, paddle2Pos, paddle1Height, paddle2Height){

	if(GAME.player1 == 'CPU'){
		artificialIntelligence(paddle1Pos,paddle1Height,1,GAME.frameCounter);
	}
	if(GAME.player2 == 'CPU'){
		artificialIntelligence(paddle2Pos,paddle2Height,2,GAME.frameCounter);
	}
}