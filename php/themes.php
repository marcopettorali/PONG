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
	
		<link rel="stylesheet" type="text/css" href="./../css/menu.css">
		<link rel="stylesheet" type="text/css" href="./../css/style.css">
		<link rel="stylesheet" type="text/css" href="./../css/switchTheme.css">
		<link rel="stylesheet" type="text/css" href="./../css/container.css">

		<script src="./../js/menu.js"></script>
		<script src="./../js/switchTheme.js"></script>
		<script src="./../js/ajax/ajaxManager.js"></script>
		<script src="./../js/ajax/ajaxRequest.js"></script>

		<meta name="author" content = "Marco Pettorali">
		<meta charset="utf-8">

		<title>Pong</title>

	</head>

	<body id="body" onLoad="setupMenu(), switchThemeSetup()">
		
		<?php
			include DIR_LAYOUT . "side_nav.php";
		?>

		<div id="container">
			<h1 id = "prova">THEMES</h1>

			<p id = "currentNameTheme">Current theme:</p>
			<img id = "currentTheme" alt = "current theme image">
			<br>
			<p>Classic:</p>
			<a href="#"><img id = "classic" class = "themeImage" src = "./../css/images/themes/classic.png" alt = "classic theme image"></a>
			<p>Sky:</p>
			<a href="#"><img id = "sky" class = "themeImage" src = "./../css/images/themes/sky.png" alt = "sky theme image"></a>
			<p>Earth:</p>
			<a href="#"><img id = "earth" class = "themeImage" src = "./../css/images/themes/earth.png" alt = "earth theme image"></a>
			<p>Ground:</p>
			<a href="#"><img id = "ground" class = "themeImage" src = "./../css/images/themes/ground.png" alt = "ground theme image"></a>
			<p>Tennis:</p>
			<a href="#"><img id = "tennis" class = "themeImage" src = "./../css/images/themes/tennis.png" alt = "tennis theme image"></a>
			<p>Soccer:</p>
			<a href="#"><img id = "soccer" class = "themeImage" src = "./../css/images/themes/soccer.png" alt = "soccer theme image"></a>
		
		</div>
	</body>

</html>