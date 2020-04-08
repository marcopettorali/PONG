<?php
	
	require_once __DIR__ . "/load_dir.php";

	session_start();

    include DIR_BASE . "session.php";
    require_once DIR_UTIL . "adminStats.php";

    if (!isLogged() || $_SESSION['admin'] == 0){
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
		<link rel="stylesheet" type="text/css" href="./../css/admin.css">

		<script src="./../js/menu.js"></script>
		<script src="./../js/admin.js"></script>
		<script src="./../js/ajax/ajaxRequest.js"></script>
		<script src="./../js/ajax/ajaxManager.js"></script>

		<meta name="author" content = "Marco Pettorali">
		<meta charset="utf-8">

		<title>Pong - Admin Panel</title>

	</head>

	<body id="body" onLoad="setupMenu(), adminSetup()">
		
		<?php
			include DIR_LAYOUT . "side_nav.php";
		?>

		<div id="container">
			<h1>Users: </h1>
			<?php
				if (isset($_POST['error'])){
					echo '<div class="loginError">';
					echo '<p>' . $_POST['error'] . '</p>';
					echo '</div>';
				}
			?>
	
			<table>
  				<tr>
  				  <th>Username: </th>
  				  <th>Password: </th>
  				  <th>Name: </th>
  				  <th>Surname: </th>
  				  <th>Email: </th>
  				  <th>Admin level: </th>
  				  <th>Theme: </th>
  				  <th>Match vs CPU: </th>
  				  <th>Match vs Humans: </th>
  				  <th>Played time: </th>
  				  <th>Points: </th>
  				</tr>
  				<?php drawUsersTable();?>
			</table>

			<div id="adminStats">
				<p>Total: <?php echo getTotalUsers()?> users</p>
				<p>Most used theme: <?php echo getMostUsedTheme()?></p>
				<p>Best user: <?php echo getBestUser()?>, time spent: <?php echo getBestUserTime()?></p>
			</div>
		</div>

	</body>

</html>