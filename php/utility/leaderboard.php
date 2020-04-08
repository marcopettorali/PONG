<?php
	function drawLeaderboard(){
		global $database;
		//load the best 10 users based on points gained
		$queryText = "select Username, Points from Users order by Points desc limit 10";
		$result = $database->query($queryText);
	
		$counter = 1;
		while ($row = $result->fetch_assoc()) {
			$class = "";
			if($row["Username"] == $_SESSION['username']){
				$class = "select";
			}
	       	echo 	  "<tr><td class='".$class."'><p>" . $counter .
	       		 "</p></td><td class='".$class."'><p>" . $row["Username"] . 
	       		 "</p></td><td class='".$class."'><p>" . $row["Points"] . " </p></td></tr>";
	   		$counter++;
	   	}
		$database->closeConnection();
	}

?>