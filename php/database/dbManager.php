<?php
	
	require_once __DIR__ . "/../load_dir.php";
    require DIR_DB . "dbConfig.php";

    $database = new dbManager();

	class dbManager {
		private $mysqli_conn = null;
	
		function dbManager(){
			$this->openConnection();
		}
    
    	function openConnection(){
    		if (!$this->isOpened()){
    			global $dbHostname;
    			global $dbUsername;
    			global $dbPassword;
    			global $dbName;
    			
    			$this->mysqli_conn = new mysqli($dbHostname, $dbUsername, $dbPassword);

				if ($this->mysqli_conn->connect_error){ 
					exit('Connect Error (' . $this->mysqli_conn->connect_errno . ') ' . $this->mysqli_conn->connect_error);
				}

				if(!$this->mysqli_conn->select_db($dbName)){
					exit ('Can\'t use pweb: ' . mysqli_error());
				}
			}
    	}
    
    	function isOpened(){
       		return ($this->mysqli_conn != null);
    	}

		function query($queryText) {

			if (!$this->isOpened()){
				$this->openConnection();
			}
			
			return $this->mysqli_conn->query($queryText);
		}
		
		function sqlInjectionFilter($parameter){

			if (!$this->isOpened()){
				$this->openConnection();
			}
				
			return $this->mysqli_conn->real_escape_string($parameter);
		}

		function closeConnection(){
	
			if($this->mysqli_conn !== null){
				$this->mysqli_conn->close();
			}
			
			$this->mysqli_conn = null;
		}
	}

?>