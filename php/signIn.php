<?php

	require_once __DIR__ . "/load_dir.php";
	require_once DIR_DB . "dbManager.php";
	require_once DIR_BASE . "session.php";

	
	$error = signIn();

	if($error === null){
		header('location: ./game.php');
	}else{
		header('location: ./signInForm.php?error=' . $error);
	}

	function signIn(){

		global $database;

		//check if password and confirm password are the same
		$password = $_POST['password'];
		$confpassword = $_POST['conf'];

		if($password != $confpassword){
			return "Passwords do not coincide";
			
		}

		//check if that username already exists in the database
		$username = $database->sqlInjectionFilter($_POST['username']);
		$queryText = "select * from Users where Username='" . $username . "'";

		$result = $database->query($queryText);
		$numRow = mysqli_num_rows($result);

		if ($numRow == 1){
			$database->closeConnection();
			return "Username already exists. Please retry with another username.";
		}

		//insert the values in the database
		$name = $database->sqlInjectionFilter($_POST['name']);
		$surname = $database->sqlInjectionFilter($_POST['surname']);
		$email = $database->sqlInjectionFilter($_POST['email']);
		$password = $database->sqlInjectionFilter($_POST['password']);
		$queryText = "insert into Users values('" .$username. "','".
												   $password. "','".
												   $name. "','".
												   $surname. "','".
												   $email. "',0,'classic',0,0,0,0,0,0,0,0)";
		$result = $database->query($queryText);
		$database->closeConnection();

		session_start();
		setSession($username, $name);
		return null;
	}

?>