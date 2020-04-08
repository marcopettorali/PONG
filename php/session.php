<?php

	function setSession($username, $name, $admin){
		$_SESSION['username'] = $username;
		$_SESSION['name'] = $name;
		$_SESSION['admin'] = $admin;
	}

	function isLogged(){
		if(isset($_SESSION['username']))
			return $_SESSION['username'];
		else
			return false;
	}


?>