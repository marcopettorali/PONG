//checkWallCollision() checks every frame if the ball hit on the upper and lower wall
function checkWallCollision(ballHeight, ballWidth){

	//if the ball is going upwards
	if(GAME.BALL.verSpeed < 0){
		//and if the ball will go beyond the wall the next frame
		if(GAME.BALL.verPos-(ballHeight/2)+GAME.BALL.verSpeed<0){
			//put the wall on the inner edge of the background 
			GAME.BALL.verPos = ballHeight/2;
		}

	}else{

		if(GAME.BALL.verPos+(ballHeight/2)+GAME.BALL.verSpeed>PLAYGROUND_HEIGHT){
			GAME.BALL.verPos = PLAYGROUND_HEIGHT-(ballHeight/2);
		}

	}

	//if the ball it's on the inner edge of the background
	if(GAME.BALL.verPos==(ballHeight/2) || GAME.BALL.verPos==PLAYGROUND_HEIGHT-(ballHeight/2)){
		//turn the ball velocity by modify its angle
		GAME.BALL.angle = 360-GAME.BALL.angle;
	}

}

//checkPaddleCollision() checks for a ball-paddle collision every frame
function checkPaddleCollision(ballHeight, ballWidth, player, paddleHeight, paddleWidth,paddlePos){

	var hitSide = checkSideCollision(ballHeight, ballWidth, player, paddleHeight, paddleWidth, paddlePos);

	var hitUp = checkUpLowSideCollision(ballHeight, ballWidth, player, paddleHeight, paddleWidth, paddlePos, 'upper');
	var hitDown = checkUpLowSideCollision(ballHeight, ballWidth, player, paddleHeight, paddleWidth, paddlePos, 'lower');

	//if there's a collision with the player who had just caught a Cannon Ball bonus
	if((hitSide || hitUp || hitDown) && GAME.BONUS_HANDLER.fastBall == player){
		//heavily increase the ball's speed
		GAME.BONUS_HANDLER.fastBall = 'no';
		GAME.BALL.speed *= 5;
	//if there's only a simple collision and no Cannon Ball bonus was taken
	}else if(hitSide || hitUp || hitDown){
		//just increase ball's speed
		GAME.BALL.speed += SPEED_INC;
	}
}

//checkSideCollision() checks if the ball had hit on the vertical side of the paddle
function checkSideCollision(ballHeight, ballWidth, player, paddleHeight, paddleWidth, paddlePos){

	//set the different conditions for the collisions with the different players
	if(player==1){
		//padActiveSide = the right side of player 1, the left side of player 2
		var padActiveSide = PADDLE_RAIL_DISTANCE + paddleWidth;
		//ballActiveSide = the left side of the ball for player 1, the right side of the wall for player 2
		var ballActiveSide = ballWidth/2;
		//horCond = check if the ball is still playable by the player
		var horCond = (GAME.BALL.horPos >= padActiveSide + ballActiveSide);
		//trespassCond = checks if the ball will go beyond the player the next frame
		var trespassCond = (GAME.BALL.horPos + GAME.BALL.horSpeed < padActiveSide + ballActiveSide);
		//speedCond = checks if the ball it's going towards the player
		//this condition is added to allow the trasparence of the paddle to backwards collisions caused by the 'The Wall' bonus
		var speedCond = (GAME.BALL.horSpeed < 0);

	}else if (player==2){
		var padActiveSide = PLAYGROUND_WIDTH - PADDLE_RAIL_DISTANCE - paddleWidth;
		var ballActiveSide = -ballWidth/2;
		var horCond = (GAME.BALL.horPos <= padActiveSide + ballActiveSide);
		var trespassCond = (GAME.BALL.horPos + GAME.BALL.horSpeed > padActiveSide + ballActiveSide);
		var speedCond = (GAME.BALL.horSpeed > 0);
	}

	//verCond = checks if the ball is in the correct vertical position
	var verCond = ((GAME.BALL.verPos + (ballHeight/2)) > (paddlePos-(paddleHeight/2)) && (GAME.BALL.verPos - (ballHeight/2)) < (paddlePos + (paddleHeight/2)));

	if(verCond && horCond && speedCond){	
		//if the ball is going to run through the paddle			
		if(trespassCond){
			//position the ball on the side of the paddle
			GAME.BALL.horPos = padActiveSide + ballActiveSide;
		}

		//if the ball lies on the vertical side of the paddle
		if(GAME.BALL.horPos == padActiveSide + ballActiveSide){
			//make the ball bounce by change its velocity angle
			GAME.BALL.angle = calculateAngle(player, paddlePos, paddleHeight, GAME.BALL.verPos);
			return true;
		}

	}
	return false;
}

//checkUpLowSide() checks if there's a ball-paddle collision with the upper or lower side of the paddle
//the players' parameters are almost the same of the checkSideCollision() but rotated by 90°
function checkUpLowSideCollision(ballHeight, ballWidth, player, paddleHeight, paddleWidth, paddlePos, type){

	if(player==1){
		var padLeftRail = PADDLE_RAIL_DISTANCE;
		var angle = 45;
		var speedCond = (GAME.BALL.horSpeed < 0);
	}else if (player==2){
		var padLeftRail = PLAYGROUND_WIDTH - PADDLE_RAIL_DISTANCE - paddleWidth;
		var angle = 135;
		var speedCond = (GAME.BALL.horSpeed > 0);
	}

	var padRightRail = padLeftRail + paddleWidth;

	if(type=='upper'){

		var ballActiveSide = + (ballHeight/2);
		var padActiveSide = paddlePos - (paddleHeight/2);
		var angleSign = 1;

		var trespassCond = (GAME.BALL.verPos + ballActiveSide + GAME.BALL.verSpeed > padActiveSide && GAME.BALL.verSpeed > 0 && GAME.BALL.verPos < paddlePos);

	}else if (type=='lower'){

		var ballActiveSide = - (ballHeight/2);
		var padActiveSide = paddlePos + (paddleHeight/2);
		var angleSign = -1;

		var trespassCond = (GAME.BALL.verPos + ballActiveSide + GAME.BALL.verSpeed < padActiveSide && GAME.BALL.verSpeed < 0 && GAME.BALL.verPos > paddlePos);

	}

	if(GAME.BALL.horPos + (ballWidth/2) > padLeftRail && GAME.BALL.horPos - (ballWidth/2) < padRightRail && speedCond){
		if(trespassCond){
			GAME.BALL.verPos =  padActiveSide - ballActiveSide;
		}

		if(GAME.BALL.verPos ==  padActiveSide - ballActiveSide){

			GAME.BALL.angle = angleSign * angle;
			return true;

		}

	}
	return false;
}

//checkPointCollision() checks if the ball has reached the extreme inner sides of the playground
function checkPointCollision(ballHeight, ballWidth){

	//if the ball will go beyond the margins of the playground the next frame, position it to the edge
	if(GAME.BALL.horPos - (ballWidth/2) + GAME.BALL.horSpeed < 0){
		GAME.BALL.horPos = (ballWidth/2);
	}

	if(GAME.BALL.horPos + (ballWidth/2) + GAME.BALL.horSpeed > PLAYGROUND_WIDTH){
		GAME.BALL.horPos = PLAYGROUND_WIDTH - (ballWidth/2);
	}

	//if the ball is on the edges of the playground
	if(GAME.BALL.horPos == PLAYGROUND_WIDTH - (ballWidth/2) || GAME.BALL.horPos == (ballWidth/2)){
		if(GAME.BALL.horPos == PLAYGROUND_WIDTH - (ballWidth/2)){
			//if The Wall event is active for this player
			if(GAME.BONUS_HANDLER.buildAWall == 2){
				//terminate the The Wall effect and make the ball bounce
				document.getElementById('wall2').style.visibility = 'hidden';
				GAME.BONUS_HANDLER.buildAWall = 'no';
				GAME.BALL.angle = 180-GAME.BALL.angle;
				return;
			}
			//otherwise give the opponent a point
			GAME.player1Points ++;
			GAME.nextPlayer = 1;
		}
	
		if(GAME.BALL.horPos == (ballWidth/2)){
			if(GAME.BONUS_HANDLER.buildAWall == 1){
				document.getElementById('wall1').style.visibility = 'hidden';
				GAME.BONUS_HANDLER.buildAWall = 'no';
				GAME.BALL.angle = 180-GAME.BALL.angle;
				return;
			}
			GAME.player2Points ++;
			GAME.nextPlayer = 2;	
			
		}

		document.getElementById('player1Points').firstChild.nodeValue = GAME.player1Points;
		document.getElementById('player2Points').firstChild.nodeValue = GAME.player2Points;
		//prepare for another round
		GAME.reset();
	}

}

//checkBonusCollision() checks if a player caught a bonus
function checkBonusCollision(player, paddleHeight, paddleWidth, paddlePos){
	//if the bonus is not displayed on the screen don't take care of this collision
	if(GAME.BONUS.onScreen == false){
		return;
	}

	if(player == 1){
		//horCond = check if the bonus is included in the vertical sides of the paddle
		var horCond = (PADDLE_RAIL_DISTANCE + paddleWidth >= (GAME.BONUS.horPos - (GAME.BONUS.width/2)) && (PADDLE_RAIL_DISTANCE <= GAME.BONUS.horPos + (GAME.BONUS.width/2)));
		//trespassCond = check if the bonus was missed by this player
		var trespassCond = (PADDLE_RAIL_DISTANCE > (GAME.BONUS.horPos + (GAME.BONUS.width/2)));

	}else if(player == 2){
		var horCond = (PLAYGROUND_WIDTH - PADDLE_RAIL_DISTANCE - paddleWidth <= (GAME.BONUS.horPos + (GAME.BONUS.width/2)) && (PLAYGROUND_WIDTH - PADDLE_RAIL_DISTANCE >= GAME.BONUS.horPos - (GAME.BONUS.width/2)));
		var trespassCond = (PLAYGROUND_WIDTH - PADDLE_RAIL_DISTANCE < (GAME.BONUS.horPos - (GAME.BONUS.width/2)));
	}
	//verCond = check if the bonus is included in the vertical sides of the paddle
	var verCond = ((GAME.BONUS.verPos - (GAME.BONUS.height/2)) <= paddlePos+(paddleHeight/2) && (GAME.BONUS.verPos + (GAME.BONUS.height/2)) >= paddlePos-(paddleHeight/2));
	//if the bonus was taken
	if(verCond && horCond){
		//active the equivalent effect and clear it from the screen
		switch(GAME.BONUS.type){
			case 'increasePaddleSize':
				modifyPaddleSize(player, 'increase');
				break;
			case 'decreasePaddleSize':
				modifyPaddleSize(player, 'decrease');
				break;
			case 'fastBall':
				fastBall(player);
				break;
			case 'buildAWall':
				buildAWall(player);
				break;
		}
		clearBonus();
		GAME.dirBonus = -GAME.dirBonus;
		//check if the bonus was taken by a human against the CPU
		var thisPlayer = (player == 1)? GAME.player1 : GAME.player2;
		var otherPlayer = (player == 1)? GAME.player2 : GAME.player1;
		if(thisPlayer == 'HUMAN' && otherPlayer == 'CPU'){
			ajaxRequest('bonus');
		}
		
	}else if(trespassCond){
		//otherwise, if the player missed the bonus just clear it from the screen
		GAME.dirBonus = -GAME.dirBonus;
		clearBonus();
	}
}

//calculateAngle() returns the angle of the ball after a paddle hit according to the relative position between ball and paddle
function calculateAngle(paddle, padPos, padHeight, ballPos){
	var x = padPos - ballPos;
	if(paddle==1){
		return ((90 * x)/padHeight);
	}
	if(paddle==2){
		return (((-90 * x)/padHeight)+180);
	}
}