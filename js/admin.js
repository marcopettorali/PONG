//adminSetup() adds a onClick event listener on the rows of the users table in the admin panel
function adminSetup(){
	var rows = document.getElementsByClassName('element');
	var i;
	for (i = 0; i < rows.length; i++){
    	rows[i].addEventListener('click', userHandler, false);
	}
}

//userHandler() displays the buttons to delete a user, promote him to admnistrator or revoke him the administrator privileges
function userHandler(){
	
	if(document.getElementById('deleteUserBtn')!=null){
		document.getElementById('container').removeChild(document.getElementById('deleteUserBtn'));
		document.getElementById('container').removeChild(document.getElementById('nominateAdminBtn'));
		document.getElementById('container').removeChild(document.getElementById('revokeAdminBtn'));
	}

	var lineSelected = this.getAttribute('class');
	var userId = handleSelectionDisplay(lineSelected);

	createButton('deleteUser', 'Delete this user', userId);
	createButton('nominateAdmin', 'Nominate admin', userId);
	createButton('revokeAdmin', 'Revoke admin privileges', userId);

	var admin = document.getElementsByClassName('admin ' + lineSelected);
	if(admin[0].firstChild.firstChild.nodeValue != 'No'){
		document.getElementById('nominateAdminBtn').disabled = 'true';
	}else{
		document.getElementById('revokeAdminBtn').disabled = 'true';
	}
}

//handleSelectionDisplay() makes the row selected by the admin of another color
function handleSelectionDisplay(line){
	var lines = document.getElementsByClassName('element');
	var i;
	for (i = 0; i < lines.length; i++){
		lines[i].classList.remove('selection');
	}

	var selectedLine = document.getElementsByClassName(line);
	for (i = 0; i < selectedLine.length; i++){
		selectedLine[i].classList.add('selection'); 
	}

	return selectedLine[0].firstChild.firstChild.nodeValue;
}

//createButton() display a button on the screen
function createButton(id, value, user){
	var button = document.createElement('input');
	button.setAttribute('type', 'button');
	button.setAttribute('id', id + 'Btn');
	button.setAttribute('value', value);
	button.setAttribute('onclick', 'ajaxRequest("'+ id +'", "' + user + '")');
	document.getElementById('container').insertBefore(button, document.getElementById('adminStats'));
}