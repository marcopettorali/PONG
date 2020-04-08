<?php
	session_start();
	require_once __DIR__ . "/php/load_dir.php";
    include DIR_BASE . "session.php";

    if (isLogged()){
		header('Location: ./php/game.php');
		exit;
    }	
?>
<!DOCTYPE html>
<html lang="en">
	<head>

		<link rel="stylesheet" type="text/css" href = "./css/indexContainer.css">
		<link rel="stylesheet" type="text/css" href = "./css/login.css">
		<link rel="shortcut icon" type="image/x-icon" href="./css/images/favicon.png">

		<script src="./js/utility.js"></script>

		<meta name="author" content = "Marco Pettorali">
		<meta charset="utf-8">

		<title>Pong - Login</title>
		
	</head>
	<body onLoad = "fadeIn(document.getElementById('container'))">
		<div id="container">

			<img id = "logo" src="./css/images/white_logo.png" alt = "Pong logo">

			<form name = "login" action = "./php/login.php" method = "post">
				
				<p class="input">
					<label>Username: 
						<input type="text" name="username" placeholder="Username" required autofocus>
					</label>
				</p>

				<p class="input">
					<label>Password: 
						<input type="password" name="password" placeholder="Password" required>
					</label>
				</p>

				<?php
	
					if (isset($_GET['error'])){
							echo '<div class="loginError">';
							echo '<p>' . $_GET['error'] . '</p>';
							echo '</div>';
						}
	
				?>	
	
				<button type="submit">Enter</button>

			</form>

			<div id="links">
				<a href="./php/signInForm.php">Sign In | </a>
				<a href="./html/info.html">About the game | </a>
				<a href="./html/privacy.html">Privacy and Terms of Service</a>
			</div>

		</div>
	</body>
</html>