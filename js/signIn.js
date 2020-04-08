//setupSignIn() adds a onBlur event listener for all the fields of the sign in form
function setupSignIn(){
	var inputs = document.getElementsByTagName('input');
	var i;
	for(i = 0; i<inputs.length; i++){
		inputs[i].addEventListener('blur', checkRegExp, false);
	}
}

//checkRegExp() checks if the field is filled correctly
function checkRegExp(){
	var textRegExp = /[a-zA-Z]/g;

	//checks if there is a string followed or not by a '.' or a '-'' (to accept mails like name.surname@server.com)
	//then checks if there's a '@' and then looks for another string followed or not by '.' or '-' (some servers have a compound name)
	//finally checks for a '.' introducing the domain name that must be composed by 2 or 3 letters
	var emailRegExp = /(^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)*/;

	var regExp;

	if(this.name == 'email'){
		regExp = emailRegExp;
	}else if(this.name == 'name' || this.name == 'surname' || this.name == 'username'){
		regExp = textRegExp;
	}
		

	var matchResult = regExp.test(this.value);

	//if the field is filled in a invalid way it will be noticed with a different color background
	if(!matchResult){
		this.classList.add('invalid');
	}else{
		this.classList.remove('invalid');
	}
}