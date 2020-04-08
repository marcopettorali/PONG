//Sketcher() it's the graphic core of the game: draws all the elements of the game every frame, checks for collision and handles paddles' movements
function Sketcher(){

	var paddle1Width = parseInt(paddle1.style.width);
	var paddle2Width = parseInt(paddle2.style.width);

	var paddle1Height = parseInt(paddle1.style.height);
	var paddle2Height = parseInt(paddle2.style.height);

	var paddle1Pos = parseInt(paddle1.style.top);
	var paddle2Pos = parseInt(paddle2.style.top);

	var ballHeight = parseInt(ball.style.height);
	var ballWidth = parseInt(ball.style.width);

	handleAI(paddle1Pos, paddle2Pos, paddle1Height, paddle2Height);

	movePaddle(paddle1Pos, paddle1Height, 1);
	movePaddle(paddle2Pos, paddle2Height, 2);

	moveBall(ballHeight, ballWidth);

	spawnBonus();
	moveBonus();

	checkWallCollision(ballHeight, ballWidth);

	checkPaddleCollision(ballHeight, ballWidth, 1, paddle1Height, paddle1Width, paddle1Pos);
	checkPaddleCollision(ballHeight, ballWidth, 2, paddle2Height, paddle2Width, paddle2Pos);

	checkPointCollision(ballHeight, ballWidth);

	checkBonusCollision(1, paddle1Height, paddle1Width, paddle1Pos);
	checkBonusCollision(2, paddle2Height, paddle2Width, paddle2Pos);

	GAME.frameCounter++;

}