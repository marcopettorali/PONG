//GAME GLOBAL VARIABLE
var GAME;

//GLOBAL VARIABLES FOR BALL AND PADDLE'S INITIAL PARAMETERS
var PADDLE_HEIGHT = 50;
var PADDLE_WIDTH = 10;

var BALL_HEIGHT = 10;
var BALL_WIDTH = 10;

var PLAYGROUND_HEIGHT = 500;
var PLAYGROUND_WIDTH = 1000;

var PADDLE_RAIL_DISTANCE = 100;

var CLOCK = 10;

var SPEED_INC = 1;

//GLOBAL VARIABLES FOR DISPLAYING THE OBJECTS
var divpoints;
var paddle1;
var paddle2;
var ball;
var playground;

//gameSetup() prepares the playground for a new game
function gameSetup(){

	//clear the elements of the previous game and build the new playground with the game selection menu
	clearGameElements();

	GAME = new Game();

	drawPlayground();

	printOnPlayground('PONG', 'initLogo','BIT',70);
	printOnPlayground('PRESS A KEY', 'initMsg');

	addEventListener('keydown', GAME.keyDown.bind(this), false);
	addEventListener('keyup', GAME.keyUp.bind(this), false);

	GAME.gameStatus = 'mainMenu';

}

//playerSelection() allows the players to choose their controllers
function playerSelection(){

	//display the menu for choosing the sides
	cleanPrint('initLogo');
	cleanPrint('initMsg');

	printOnPlayground('SELECT YOUR SIDE','selectMsg');
	document.getElementById('selectMsg').style.top = 10 + '%';

	addController('wasdController');
	addController('arrowsController');

	var buttonStart = document.createElement('div');
	buttonStart.setAttribute('id', 'buttonStart');
	var text = new Text('PRESS ENTER');
	buttonStart.appendChild(text);
	document.getElementById('playground').appendChild(buttonStart);	

	selectController('','' , true);

	GAME.gameStatus = 'playerSelection';
	
}

//clearBeforeBegin() clear every element of the menu and draw the game elements, then lets the game begin
function clearBeforeBegin(){

		document.getElementById('playground').removeChild(document.getElementById('selectMsg'));
		document.getElementById('playground').removeChild(document.getElementById('wasdController'));
		document.getElementById('playground').removeChild(document.getElementById('arrowsController'));
		document.getElementById('playground').removeChild(document.getElementById('buttonStart'));

		drawGameElement('wall1', 'wall');
		drawGameElement('pad1', 'paddle');
		drawGameElement('ball', 'ball');
		drawGameElement('pad2', 'paddle');
		drawGameElement('wall2', 'wall');

		drawItems();

		document.getElementById('player1Points').firstChild.nodeValue = 0;
		document.getElementById('player2Points').firstChild.nodeValue = 0;

		GAME.gameStatus = 'inGamePlay';

		GAME.nextPlayer = 1;
		
		GAME.reset();

}

//clearGameElements() clears the element of the prevous game
function clearGameElements(){

	document.getElementById('playground').removeChild(document.getElementById('wall1'));
	document.getElementById('playground').removeChild(document.getElementById('pad1'));
	document.getElementById('playground').removeChild(document.getElementById('ball'));
	document.getElementById('playground').removeChild(document.getElementById('pad2'));
	document.getElementById('playground').removeChild(document.getElementById('wall2'));

	document.getElementById('divPoints').style.visibility = 'hidden';
}

//drawGameElement() draws the game elements
function drawGameElement(id, cl){

	var object = document.createElement('div');
	object.setAttribute('id', id);
	object.setAttribute('class', cl);
	document.getElementById('playground').appendChild(object);

}

//addController() add a controller on the screen
function addController(type){

	var controller = document.createElement('div');
	controller.setAttribute('id', type);

	var controllerImg = document.createElement('img');
	controllerImg.setAttribute('src', './../css/images/' + type + '.png');
	controllerImg.setAttribute('class', 'controller');
	controllerImg.setAttribute('alt', type);

	controller.appendChild(controllerImg);
	document.getElementById('playground').appendChild(controller);

}

//selectController() let the players decide their controller on the playground
function selectController(controller, direction){

	//initialize the position of the controllers
	if (arguments[2] == true) {
        selectController.cntWasd = 50;
		selectController.cntArrows = 50;
		return;
    }

    //handle the controllers' movements on the screen 
    //notice that wasd controller can only be in the left part of the screen and arrows controller can only be in the right part of the screen
	var ctrl = document.getElementById(controller);

	if(controller == 'wasdController'){
		if(direction=='left' && selectController.cntWasd > 25){
			selectController.cntWasd -=25;
		}else if(direction=='right' && selectController.cntWasd < 50){
			selectController.cntWasd +=25;
		}
		ctrl.style.left = selectController.cntWasd + '%';
	}else{
		if(direction=='left' && selectController.cntArrows > 50){
			selectController.cntArrows -=25;
		}else if(direction=='right' && selectController.cntArrows < 75){
			selectController.cntArrows +=25;
		}
		ctrl.style.left = selectController.cntArrows + '%';
	}

	//check which player is human and which one is controlled by the CPU
	if(selectController.cntWasd == 25){
		GAME.player1 = 'HUMAN';
	}else{
		GAME.player1 = 'CPU';
	}

	if(selectController.cntArrows == 75){
		GAME.player2 = 'HUMAN';
	}else{
		GAME.player2 = 'CPU';
	}

}