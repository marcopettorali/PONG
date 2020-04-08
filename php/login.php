<?php

	require_once __DIR__ . "/load_dir.php";
	require_once DIR_DB . "dbManager.php";
	require_once DIR_BASE . "session.php";

	$username = $_POST['username'];
	$password = $_POST['password'];
	$name;
	$admin;

	$error = login($username, $password);

	if($error === null){
		header('location: ./game.php');
	}
	else{
		header('location: ./../index.php?error=' . $error);
	}



	function authenticate ($username, $password){   
		global $database;
		global $name;
		global $admin;
		//avoid the sql injection
		$username = $database->sqlInjectionFilter($username);
		$password = $database->sqlInjectionFilter($password);
		//look for a user with that username and password
		$queryText = "select * from Users where Username='" . $username . "'and Password='" . $password . "'";

		$result = $database->query($queryText);

		$userRow = $result->fetch_assoc();

		$name = $userRow['Name'];
		$admin = $userRow['Admin'];

		$numRow = mysqli_num_rows($result);
		//if the user with that username and password doesn't exist return false
		if ($numRow != 1){
			return false;
		}
		
		$database->closeConnection();

		return true;
	}



	function login($username, $password){ 

		global $name;
		global $admin;
		//if username and password are not empty
		if ($username != null && $password != null){
			$userFound = authenticate($username, $password);
			//if an user was found
    		if ($userFound == true){
    			session_start();
    			setSession($username, $name, $admin);

    			return null;

    		}else{
    			//if no users were found
    			return "Authentication failed: username or password not valid";
    		}

    	}else{
    		//if username or password are empty
    	    return 'Authentication failed: username or password empty';
    	}
   
	}

?>