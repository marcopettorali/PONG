<?php
	require_once __DIR__ . "/load_dir.php";

	session_start();

    include DIR_BASE . "session.php";
    require_once DIR_DB . "dbManager.php";
    require_once DIR_UTIL . "leaderboard.php";

    if (!isLogged()){
		header('Location: ./../index.php');
		exit;
    }
?>

<!DOCTYPE html>
<html lang = "it">

	<head>
		
		<link rel="shortcut icon" type="image/x-icon" href="./../css/images/favicon.png">
		<link rel="stylesheet" type="text/css" href="./../css/menu.css">
		<link rel="stylesheet" type="text/css" href="./../css/style.css">
		<link rel="stylesheet" type="text/css" href="./../css/container.css">
		<link rel="stylesheet" type="text/css" href="./../css/leaderboard.css">

		<script src="./../js/menu.js"></script>

		<meta name="author" content = "Marco Pettorali">
		<meta charset="utf-8">

		<title>Pong</title>

	</head>

	<body id="body" onLoad="setupMenu()">
		
		<?php
			include DIR_LAYOUT . "side_nav.php";
		?>

		<div id="container">

			<h1>Leaderboard</h1>

			<table>
  				<tr>
  				  <th>Pos</th>
  				  <th>Username</th>
  				  <th>Points</th>
  				</tr>
  				<?php drawLeaderboard();?>
			</table> 

		</div>

	</body>

</html>