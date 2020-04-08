//the Ball objects contain all the parameter to make the ball move and bounce correcty
function Ball(){

	this.speed = 4;
	this.verPos = PLAYGROUND_HEIGHT/2;
	this.horPos = PLAYGROUND_WIDTH/2;
	this.angle = -135;
	this.verSpeed = -this.speed * Math.sin(this.angle * Math.PI/180);
	this.horSpeed = this.speed * Math.cos(this.angle * Math.PI/180);
}

//moveBall() simply moves the ball in function of its speed and angle
function moveBall(ballHeight, ballWidth){

	GAME.BALL.verSpeed = -GAME.BALL.speed * Math.sin(GAME.BALL.angle * Math.PI/180);
	GAME.BALL.horSpeed = GAME.BALL.speed * Math.cos(GAME.BALL.angle * Math.PI/180);

	GAME.BALL.verPos += GAME.BALL.verSpeed;
	GAME.BALL.horPos += GAME.BALL.horSpeed;

	ball.style.top = GAME.BALL.verPos + 'px';
	ball.style.left = GAME.BALL.horPos + 'px';

}

