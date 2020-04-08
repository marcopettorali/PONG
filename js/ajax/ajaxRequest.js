//ajaxRequest() handles all the interactions with the database 
function ajaxRequest(){

	var type = arguments[0];

	var DEFAULT_URL = './../php/ajax/ajaxReceiver.php';
	var ADD_TYPE = '?type=' + type;

	var i;
	for(i = 1; i<arguments.length; i++){
		ADD_TYPE += '&auxData' + i + '=' + arguments[i]; 
	}

	var funct = null;

	//choose the answer function based on the type of the request
	if(type == 'getTheme' && typeof(arguments[1])=='undefined'){
		funct = drawBackground;
	}else if(type == 'getTheme' && arguments[1]=='currentTheme'){
		funct = updateCurrentTheme;
	}else if(type == 'deleteUser' || type == 'nominateAdmin' || type == 'revokeAdmin' ){
		funct = refreshPage;
	}
	AjaxManager.ajaxRequest('GET', DEFAULT_URL + ADD_TYPE, true, null, funct);

}

//refreshPage() refreshes the current page
function refreshPage(){
	if(arguments[0]!= ''){
		alert(arguments[0]);
	}
	location.reload();

}