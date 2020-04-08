<nav id = "sideNav">
			
	<img id = "logo" src="./../css/images/logo.png" alt = "Pong logo">
	<p id = "icon" class="button" onClick="show()"> ☰ </p>

	<div id="profile">

		<a href="./profile.php"><img id="profileImg" src="../css/images/empty_profile.png" alt="Profile image"></a>

	</div>

	<ul id="menuUnorderedList">
		<li> <a href="./profile.php"><?php echo $_SESSION['name'];?></a>
		<li> <a href="./game.php">Game</a>
		<li> <a href="./leaderboard.php">Leaderboard</a>
		<li> <a href="./themes.php">Themes</a>
		<?php if($_SESSION['admin']!=0){echo '<li><a href="./admin.php">Administrator Panel</a>';}?>	
		<li> <a href="./logout.php">Logout</a>
	</ul>
	
</nav>