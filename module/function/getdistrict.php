<?php 
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $province = isset($_POST['province']) ? $_POST['province'] : 0;
   

    $result = array();

    $stmt = $db->prepare("SELECT * FROM district WHERE _province_id = (SELECT id FROM province WHERE _name = ?)");
    $stmt->execute([$province]);

    $count = $stmt->rowCount();
	if ($count > 0) {
		while ($row = $stmt->fetch()) {
		    $result[] = array(
		    	'prefix' => $row['_prefix'],
	            'name' => $row['_name'],
	            'id' => $row['id']
	        );
		}
	}

	$db = null;

	die(json_encode($result));

 ?>