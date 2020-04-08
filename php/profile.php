<?php
	
	require_once __DIR__ . "/load_dir.php";

	session_start();

    include DIR_BASE . "session.php";
    require_once DIR_DB . "dbManager.php";

    if (!isLogged()){
		header('Location: ./../index.php');
		exit;
    }
?>

<?php
    //load from the database some infos of the current user  
    global $database;

	$queryText = "select * from Users where Username='" . $_SESSION['username'] . "'";
	$result = $database->query($queryText);
	$userRow = $result->fetch_assoc();

	$name = $userRow['Name'];
	$surname = $userRow['Surname'];
	$email = $userRow['Email'];

	$matchPlayed = $userRow['MatchPlayed'];

	$victoriesVsCpu = $userRow['VictoriesVsCpu'];
	$matchVsCpu = $userRow['MatchVsCpu'];
	$matchVsHuman = $userRow['MatchVsHuman'];

	$playTime = gmdate("H:i:s", $userRow['PlayTime']);
	$bonusTaken = $userRow['BonusTaken'];
	$points = $userRow['Points'];
	$avgPoints = ($matchVsCpu == 0)? 0 : round($points/$matchVsCpu, 2);
	
	$database->closeConnection();


?>

<!DOCTYPE html>
<html lang = "it">

	<head>
		<link rel="shortcut icon" type="image/x-icon" href="./../css/images/favicon.png">
		<link rel="stylesheet" type="text/css" href="./../css/menu.css">
		<link rel="stylesheet" type="text/css" href="./../css/style.css">
		<link rel="stylesheet" type="text/css" href="./../css/container.css">
		<link rel="stylesheet" type="text/css" href="./../css/profile.css">

		<script src="./../js/menu.js"></script>

		<meta name="author" content = "Marco Pettorali">
		<meta charset="utf-8">

		<title>Pong - <?php echo $_SESSION['username']?>'s Profile</title>

	</head>

	<body id="body" onLoad="setupMenu()">
		
		<?php
			include DIR_LAYOUT . "side_nav.php";
		?>

		<div id="container">

			<h1><?php echo $_SESSION['username']?> - <?php echo $name . " " . $surname?></h1>
			<?php if($email != "") echo "<p>Email : ".$email."</p>";?>
			<br>
			<p>Points: <?php echo $points;?></p>
			<p>Match played: <?php echo $matchPlayed;?></p>
			<p>Average points per match: <?php echo $avgPoints?></p>
			<br>
			<p>Matches vs Human: <?php echo $matchVsHuman;?></p>
			<p>Matches vs CPU:  <?php echo $matchVsCpu;?></p>
			<p>Victories vs CPU: <?php echo $victoriesVsCpu;?></p>
			<p>Bonus taken against CPU: <?php echo $bonusTaken;?></p>
			<br>
			<p>Effective game time: <?php echo $playTime;?></p>
			

		</div>


	</body>

</html>