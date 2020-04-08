<?php
	
	require_once __DIR__ . "/../load_dir.php";
	include DIR_BASE . "session.php";
    require_once DIR_DB . "dbManager.php";

	session_start();

	$type = $_GET['type'];

	$username = $_SESSION['username'];

	//switch the function
	if($type == 'matchPlayed'){
		updateMatchPlayed();
	}else if($type == 'playTime'){
		updatePlayTime();
	}else if($type == 'bonus'){
		updateBonus();
	}else if($type == 'points'){
		updatePoints();
	}else if($type == 'getTheme'){
		getTheme();
	}else if($type == 'setTheme'){
		setTheme();
	}else if($type == 'deleteUser'){
		$result = deleteUser();
	}else if($type == 'nominateAdmin'){
		nominateAdmin();
	}else if($type == 'revokeAdmin'){
		revokeAdmin();
	}

	//updateMatchPlayed() updates the number of games played against Humans, against Cpu, the victories against Cpu
	function updateMatchPlayed(){

		global $database;
		$database->openConnection();
		$username = $_SESSION['username'];

		$queryText = "update Users set MatchPlayed = MatchPlayed + 1 where Username = '" . $username . "'";
		$database->query($queryText);

		if($_GET['auxData1']=='true'){
			$queryText = "update Users set VictoriesVsCpu = VictoriesVsCpu + 1 where Username = '" . $username . "'";
			$database->query($queryText);
		}else{
			$queryText = "update Users set VictoriesVsHuman = VictoriesVsHuman + 1 where Username = '" . $username . "'";
			$database->query($queryText);
		}

		if($_GET['auxData2']=="CPU"){
			$queryText = "update Users set MatchVsCpu = MatchVsCpu + 1 where Username = '" . $username . "'";
			$database->query($queryText);
		}else{
			$queryText = "update Users set MatchVsHuman = MatchVsHuman + 1 where Username = '" . $username . "'";
			$database->query($queryText);
		}

		$database->closeConnection();

	}

	//updatePlayTime() update the effective game time when any player makes point
	function updatePlayTime(){

		global $database;
		$database->openConnection();
		$username = $_SESSION['username'];
		$queryText = "update Users set PlayTime = PlayTime + " . $_GET['auxData1'] . " where Username = '" . $username . "'";
		$database->query($queryText);
		$database->closeConnection();

	}

	//updateBonus() updates the number of bonuses taken by a human player against the cpu
	function updateBonus(){

		global $database;
		$database->openConnection();
		$username = $_SESSION['username'];
		$queryText = "update Users set BonusTaken = BonusTaken + 1 where Username = '" . $username . "'";;
		$database->query($queryText);
		$database->closeConnection();

	}

	//updatePoints() updates the points gained by the current user
	function updatePoints(){

		global $database;
		$database->openConnection();
		$username = $_SESSION['username'];
		$queryText = "update Users set Points = Points + " . $_GET['auxData1'] . " where Username = '" . $username . "'";
		$database->query($queryText);
		$database->closeConnection();

	}

	//getTheme() gets the theme chosen by the user to display it in the Game section
	function getTheme(){

		global $database;
		$database->openConnection();
		$username = $_SESSION['username'];
		$queryText = "select Theme from Users where Username = '" . $username . "'";
		$result = $database->query($queryText);
		$userRow = $result->fetch_assoc();
		$response = $userRow['Theme'];
		echo $response;
		$database->closeConnection();

	}

	//setTheme() stores in the database the new theme chosen by the current user
	function setTheme(){
		global $database;
		$database->openConnection();
		$username = $_SESSION['username'];
		$queryText = "update Users set Theme = '" . $_GET['auxData1'] . "' where Username = '" . $username . "'";
		$result = $database->query($queryText);
		$database->closeConnection();

	}

	//deleteUser() delete a user from the database
	function deleteUser(){
		if(checkAdminLevel()){
			global $database;
			$database->openConnection();
			$username = $_GET['auxData1'];
			$queryText = "delete from Users where Username = '" . $username . "'";
			$result = $database->query($queryText);
			$database->closeConnection();
		}
	}

	//nominateAdmin() lets the admins choose another people in the database to become a lower level admin
	function nominateAdmin(){
		global $database;
		$database->openConnection();
		$adminLevel = $_SESSION['admin'];
		$username = $_GET['auxData1'];
		$queryText = "update Users set Admin = ".($adminLevel + 1)." where Username = '" . $username . "'";
		$result = $database->query($queryText);
		$database->closeConnection();

	}

	//revokeAdmin() lets the admins revoke the admin privileges of another admin
	function revokeAdmin(){
		if(checkAdminLevel()){
			global $database;
			$database->openConnection();
			$username = $_GET['auxData1'];
			$queryText = "update Users set Admin = 0 where Username = '" . $username . "'";
			$result = $database->query($queryText);
			$database->closeConnection();
		}
	}

	//check if the current user has the permissions to do an action
	function checkAdminLevel(){
		global $database;
		$database->openConnection();
		$adminLevel = $_SESSION['admin'];
		$username = $_GET['auxData1'];

		$queryText = "select Admin from Users where Username = '" . $username . "'";
		$result = $database->query($queryText);
		$userRow = $result->fetch_assoc();

		if($userRow['Admin']!=0 && $userRow['Admin']<=$adminLevel){
			echo "ERROR: You have not the permissions to do this";
			return false;
		}else{
			return true;
		}
	}
?>