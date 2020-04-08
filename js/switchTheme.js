//switchThemeSetup() adds a onClick event listener for all the themes' pictures
function switchThemeSetup(){
	var img = document.getElementsByClassName('themeImage');
	var i;
	ajaxRequest('getTheme','currentTheme');
	for (i = 0; i < img.length; i++){
    	img[i].addEventListener('click', themeHandler, false);
	}
}

//themeHandler() stores in the database the name of the theme chosen by the user
function themeHandler(){
	ajaxRequest('setTheme', this.id);
	ajaxRequest('getTheme','currentTheme');
}

//updateCurrentTheme() updates the current theme pictures in the themes selection page
function updateCurrentTheme(theme){
	document.getElementById('currentNameTheme').firstChild.nodeValue = 'Current theme: ' + theme;
	document.getElementById('currentTheme').src = './../css/images/themes/' + theme +'.png';
}