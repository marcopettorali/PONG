<?php
	require_once DIR_DB . "dbManager.php";

	//drawUsersTable() draws the main infos about all the users
	function drawUsersTable(){

		global $database;
		$queryText = "select * from Users order by Username";
		$result = $database->query($queryText);

		$counter = 1;
		while ($row = $result->fetch_assoc()) {
			
			$admin = ($row["Admin"]==0)? "No" : $row["Admin"];

       		echo 	  "<tr> <td class ='element ".$counter."'><p>" . $row["Username"] .
       			 "</p></td> <td class ='element ".$counter."'><p>" . $row["Password"] . 
       			 "</p></td> <td class ='element ".$counter."'><p>" . $row["Name"] . 
       			 "</p></td> <td class ='element ".$counter."'><p>" . $row["Surname"] . 
       			 "</p></td> <td class ='element ".$counter."'><p>" . $row["Email"] . 
       			 "</p></td> <td class ='admin element ".$counter."'><p>" . $admin . 
       			 "</p></td> <td class ='element ".$counter."'><p>" . $row["Theme"] . 
       			 "</p></td> <td class ='element ".$counter."'><p>" . $row["MatchVsCpu"] . 
       			 "</p></td> <td class ='element ".$counter."'><p>" . $row["MatchVsHuman"] . 
       			 "</p></td> <td class ='element ".$counter."'><p>" . gmdate("H:i:s", $row['PlayTime']) . 
       			 "</p></td> <td class ='element ".$counter."'><p>" . $row["Points"] . 
       			 " </p></td></tr>";

       			 $counter++;
   		}
   		$database->closeConnection();
	}

	//getTotalUsers() gets the number of the users in the database
	function getTotalUsers(){
		global $database;
		$queryText = "select * from Users order by Username";
		$result = $database->query($queryText);
		$totalUsers = mysqli_num_rows($result);
		$database->closeConnection();
		return $totalUsers;
	}

	//getMostUsedTheme() gets the most used theme by the player
	function getMostUsedTheme(){
		global $database;
   		$queryText = "select Theme, Count(*) as Count from Users group by Theme order by Count desc limit 1";
		$result = $database->query($queryText);
		$row = $result->fetch_assoc();
		$mostUsedTheme = $row['Theme'];
		$database->closeConnection();
		return $mostUsedTheme;
	}

	//getBestUser() gets the best user in terms of time spent in the game
	function getBestUser(){
		global $database;
		$queryText = "select * from Users order by PlayTime desc limit 1";
		$result = $database->query($queryText);
		$row = $result->fetch_assoc();
		$bestUser = $row['Username'];
		$database->closeConnection();
		return $bestUser;
	}

	//getBestUserTime() gets the best user's time spent in the game
	function getBestUserTime(){
		global $database;
		$queryText = "select * from Users order by PlayTime desc limit 1";
		$result = $database->query($queryText);
		$row = $result->fetch_assoc();
		$bestUserTime = gmdate("H:i:s", $row['PlayTime']);
		$database->closeConnection();
		return $bestUserTime;
	}
?>