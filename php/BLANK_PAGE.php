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

		<script type="text/javascript" src="./../js/menu.js"></script>

		<meta title="author" content = "Marco Pettorali">
		<meta charset="utf-8">

		<title>Pong</title>

	</head>

	<body id="body" onLoad="setupMenu()">
		
		<?php
			include DIR_LAYOUT . "side_nav.php";
		?>


	</body>

</html>