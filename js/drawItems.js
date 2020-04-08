//drawItems() draws the paddles, ball and point box's parameters on the screen when a new round has to begin
function drawItems(){

	//ELEMENTS OF THE GAME

	GAME.PAD1 = new Paddle();
	GAME.PAD2 = new Paddle();
	GAME.BALL = new Ball();

	paddle1 = document.getElementById('pad1');
	paddle2 = document.getElementById('pad2');
	ball = document.getElementById('ball');
	divpoints = document.getElementById('divPoints');
	
	paddle1.style.height = PADDLE_HEIGHT + 'px';
	paddle1.style.width = PADDLE_WIDTH + 'px';
	paddle1.style.marginTop = -(PADDLE_HEIGHT/2) + 'px';
	paddle1.style.left = PADDLE_RAIL_DISTANCE + 'px';

	paddle2.style.height = PADDLE_HEIGHT + 'px';
	paddle2.style.width = PADDLE_WIDTH + 'px';
	paddle2.style.marginTop = -(PADDLE_HEIGHT/2) + 'px';
	paddle2.style.left = (PLAYGROUND_WIDTH - PADDLE_RAIL_DISTANCE) + 'px';
	paddle2.style.marginLeft = -(2 * PADDLE_WIDTH) + 'px';

	ball.style.height = BALL_HEIGHT + 'px';
	ball.style.width = BALL_WIDTH + 'px';
	ball.style.marginTop = -(BALL_HEIGHT/2) + 'px';
	ball.style.marginLeft = -(PADDLE_WIDTH + (BALL_WIDTH/2)) + 'px';

	divpoints.style.visibility = 'visible';

	//DRAW THE GAME.BALL AND PADDLE'S POSITION

	paddle1.style.top = GAME.PAD1.pos + 'px';
	paddle2.style.top = GAME.PAD2.pos + 'px';
	ball.style.top = GAME.BALL.verPos + 'px';
	ball.style.left = GAME.BALL.horPos + 'px';

}

//drawPlayground() draws only the playground according to the theme the user chose
function drawPlayground(){
	playground = document.getElementById('playground');

	playground.style.height = PLAYGROUND_HEIGHT + 'px';
	playground.style.width = PLAYGROUND_WIDTH + 'px';

	//check on the database what's the chosen theme
	ajaxRequest('getTheme');

}

//drawBackground() draws the theme of the playground
function drawBackground(theme){
	playground.style.backgroundImage = 'url(./../css/images/themes/' + theme + '.png)';
}