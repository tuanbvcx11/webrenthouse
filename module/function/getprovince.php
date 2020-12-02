<?php 
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $result = array();

    $stmt = $db->prepare("SELECT * FROM province");
    $stmt->execute();

    $count = $stmt->rowCount();
	if ($count > 0) {
		while ($row = $stmt->fetch()) {
		    $result[] = array(
	            'name' => $row['_name'],
	            'id' => $row['id']
	        );
		}
	}

	$db = null;

	die(json_encode($result));

 ?>