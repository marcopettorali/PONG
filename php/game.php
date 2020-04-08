<?php
	
	require_once __DIR__ . "/load_dir.php";

	session_start();

    include DIR_BASE . "session.php";

    if (!isLogged()){
		header('Location: ./../index.php');
		exit;
    }	

?>

<!DOCTYPE html>
<html lang = "it">

	<head>

		<meta charset="utf-8">

		<link rel="shortcut icon" type="image/x-icon" href="./../css/images/favicon.png">
		<link rel="stylesheet" type="text/css" href="../css/style.css">
		<link rel="stylesheet" type="text/css" href="../css/menu.css">
		<link rel="stylesheet" type="text/css" href="../css/game.css">

		<script src="./../js/gameSetup.js"></script>
		<script src="./../js/game.js"></script>
		<script src="./../js/paddle.js"></script>
		<script src="./../js/sketcher.js"></script>
		<script src="./../js/ball.js"></script>
		<script src="./../js/checks.js"></script>
		<script src="./../js/utility.js"></script>
		<script src="./../js/drawItems.js"></script>
		<script src="./../js/menu.js"></script>
		<script src="./../js/bonus.js"></script>
		<script src="./../js/ajax/ajaxManager.js"></script>
		<script src="./../js/ajax/ajaxRequest.js"></script>

		<meta name="author" content = "Marco Pettorali">

		<title>Pong</title>

	</head>

	<body onLoad="setupMenu(), gameSetup()" id="body">
		
		<?php
			include DIR_LAYOUT . "side_nav.php";
		?>

		<div id = "divPoints">
			<p id="player1Points" class = "points">
				0
			</p>
			<p id="player2Points" class = "points">
				0
			</p>
		</div>

		<div id = "playground">
			<div id = "wall1" class = "wall"></div>
			<div id = "pad1" class = "paddle"></div>
			<div id = "ball"></div>
			<div id = "pad2" class = "paddle"></div>
			<div id = "wall2" class = "wall"></div>
		</div>

	</body>

</html>