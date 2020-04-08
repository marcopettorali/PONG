//BONUS SPAWN PARAMETERS
var BONUS_SPAWN_RATE = 500; //cents of seconds

//the bonusObject objects contain the parameters to make the bonus icon move and be caught on the screen 
function bonusObject(){

	this.height = 50;
	this.width = 50;

	this.speed = 3;

	//the bonus could be only of one of the following types:
	this.typeArray = ['increasePaddleSize', 'decreasePaddleSize', 'fastBall', 'buildAWall'];
	this.type = this.typeArray[Math.floor(this.typeArray.length * Math.random())];

	this.verPos = Math.floor((1 + PLAYGROUND_HEIGHT - this.height) * Math.random()) + (this.height/2); 
	this.horPos = (PLAYGROUND_WIDTH/2);

	this.onScreen = false;
}

//the bonusHandler objects contain the infos about which bonus is actually on 
function bonusHandler(){
	this.modifyPaddleSizeTimeout;
	this.buildAWall = 'no';
	this.fastBall = 'no';
}


//spawnBonus() handles the bonus spawn in the middle of the playground. It's called every BONUS_SPAWN_RATE milliseconds
function spawnBonus(){

	//if a bonus is already on the screen don't spawn one another
	if(GAME.frameCounter % BONUS_SPAWN_RATE!=0 || GAME.BONUS.onScreen == true || GAME.frameCounter==0){
		return;
	}
	GAME.BONUS = new bonusObject();
	GAME.BONUS.onScreen = true;
	var bonus = document.createElement('div');
	bonus.setAttribute('id', 'bonus');

	var styleAttributes = 'background-color: white;'+
						  'background-image:url(./../css/images/bonus/' + GAME.BONUS.type + '.png);' +
						  'margin-left:'+(-GAME.BONUS.width/2) + 'px;' +
						  'margin-right:'+(-GAME.BONUS.width/2) + 'px;' +
						  'margin-top:'+(-GAME.BONUS.height/2) + 'px;' +
						  'float:left;' +
						  'top:'+GAME.BONUS.verPos + 'px;' +
						  'left:'+GAME.BONUS.horPos + 'px;' +
						  'width:'+GAME.BONUS.width + 'px;' +
						  'height:'+GAME.BONUS.height + 'px;' +
					 	  'position: relative;';

	bonus.setAttribute('style', styleAttributes);
	document.getElementById('playground').insertBefore(bonus, document.getElementById('pad2'));
}

//moveBonus() handles the bonus icon movement on the screen (if the bonus has already spawned)
function moveBonus(){

	if(GAME.BONUS.onScreen == false){
		return;
	}
	GAME.BONUS.horPos += GAME.dirBonus * GAME.BONUS.speed;
	document.getElementById('bonus').style.left = GAME.BONUS.horPos + 'px';

}

//clearBonus() clear the bonus icon from the screen. It's called when a player misses or takes a bonus
function clearBonus(){

	if(document.getElementById('bonus')!=null){
		document.getElementById('playground').removeChild(document.getElementById('bonus'));
		GAME.BONUS.onScreen = false;
	}
}

//***********************BONUS EFFECTS***********************************

//modifyPaddleSize stretches or shrinkes the paddle's size, depending on which bonus has been activated
function modifyPaddleSize(player, type){

	var stop = arguments[2];
	if(typeof(stop)=='undefined'){
		stop = false;
	}

	var paddle = document.getElementById('pad' + player);

	if(player == 1){
		var PAD = GAME.PAD1;
	}else{
		var PAD = GAME.PAD2;
	}

	var pixelIncrease = 15;

	var inc = (type == 'increase')? 2: -2;
	var oppositeType = (type == 'increase')? 'decrease': 'increase';

	var interval = setInterval(function(){
		if(pixelIncrease < 0){
			clearInterval(interval);
			if(stop == false){
				//after 5 seconds, call again modifyPaddleSize with the opposite effect to bring back the paddle to it's original size
				GAME.BONUS_HANDLER.modifyPaddleSizeTimeout = setTimeout(modifyPaddleSize, 5000, player, oppositeType, true);
			}
			return;
		}

		pixelIncrease--;
		paddle.style.height = parseInt(paddle.style.height) + inc +'px';
		paddle.style.marginTop = parseInt(paddle.style.marginTop) - inc/2 +'px';
	}, 10);

}

//fastBall() notify to the bonus handler that a Cannon Shot bonus was caught by which player
function fastBall(player){
	GAME.BONUS_HANDLER.fastBall = player;
}

//buildAWall() notify to the bonus handler that a The Wall bonus was caught by which player and displays a wall on the screen
function buildAWall(player){
	document.getElementById('wall' + player).style.visibility = 'visible';
	GAME.BONUS_HANDLER.buildAWall = player;
}