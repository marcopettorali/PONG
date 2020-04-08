//THIS FILE INCLUDES SOME FUNCTION USED IN MANY DIFFERENT PARTS OF THE CODE

//printOnPlayground() prints something in the middle of the playground
function printOnPlayground(str, id){

	var font = arguments[2];
	var size = arguments[3];

	if(typeof(font) == 'undefined'){
		font = 'Bit';
	}

	if(typeof(size) == 'undefined'){
		size = 40;
	}

	var styleAttributes = 'color: white;'+
						  'margin:0px;'+
						  'top:45%;'+
						  'width:100%;'+
					 	  'position: relative;'+
					 	  'font-family:' + font + ';' +
						  'text-align:center;'+
					 	  'font-size: ' + size + 'pt;';

	var string = document.createElement('p');
	string.setAttribute('id', id);
	string.setAttribute('style', styleAttributes);
	var text = new Text(str);
	string.appendChild(text);
	document.getElementById('playground').appendChild(string);

}

//cleanPrint() clean the print identified by the id passed to the function
function cleanPrint(id){
	if(document.getElementById(id) != null){
		document.getElementById('playground').removeChild(document.getElementById(id));
	}
}

//fadeIn() it's a simple fade in effect
var STEP_FADE = 0.02;

function fadeIn(div){

	if(typeof(fadeIn.fader) == 'undefined'){
		fadeIn.fader = 0;
	}

	var interval = setInterval(function(){
		if(fadeIn.fader>1){
			clearInterval(interval);
			return;
		}
		fadeIn.fader += STEP_FADE;
		div.style.opacity = fadeIn.fader;
	}, 10);

}