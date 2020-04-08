<!DOCTYPE html>
<html lang="en">
	<head>

		<link rel="stylesheet" type="text/css" href = "./../css/indexContainer.css">
		<link rel="stylesheet" type="text/css" href = "./../css/signin.css">
		<link rel="shortcut icon" type="image/x-icon" href="./../css/images/favicon.png">

		<script src="./../js/signIn.js"></script>

		<meta name="author" content = "Marco Pettorali">
		<meta charset="utf-8">

		<title>Pong - Sign in</title>
		
	</head>
	<body onLoad="setupSignIn()">
		<div id="container">

			<img id = "logo" src="./../css/images/white_logo.png" alt = "Pong logo">

			<form name = "signin" action = "./signIn.php" method = "post">

				<p class="input">
					<label>Name: * 
						<input type="text" name="name" placeholder="eg. James" required autofocus>
					</label> 
				</p>

				<p class="input">
					<label>Surname: *
						<input type="text" name="surname" placeholder="eg. Smith" required>
					</label>
				</p>

				<p class="input">
					<label>E-mail: 
						<input type="email" name="email" placeholder="eg. jamessmith@example.com" >
					</label>
				</p>

				<p class="input">
					<label>Username: *
						<input type="text" name="username" placeholder="Username" required>
					</label>
				</p>

				<p class="input">
					<label>Password: *
						<input type="password" name="password" placeholder="Password" required>
					</label>
				</p>

				<p class="input">
					<label>Confirm password: *
						<input type="password" name="conf" placeholder="Confirm password" required>
					</label>
				</p>

				<?php
	
					if (isset($_GET['error'])){
						echo '<div class="loginError">';
						echo '<p>' . $_GET['error'] . '</p>';
						echo '</div>';
					}
	
				?>	
				<p class="input">* necessary field</p>
				<button type="submit">Enter</button>

			</form>

			<div id="links">
				<a href="./../index.php">Back to login | </a>
				<a href="./../html/info.html">About the game | </a>
				<a href="./../html/privacy.html"> Privacy and Terms of Service</a>
			</div>
			
		</div>
	</body>
</html>