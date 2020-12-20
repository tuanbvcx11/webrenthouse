<?php 
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $result = array();

    $stmt = $db->prepare("SELECT IF (gia_phong < 1000000, 'A', IF(gia_phong < 3000000, 'B', IF(gia_phong < 5000000, 'C', 'D'))) AS type_of_price, COUNT(*) as total FROM post WHERE status_post = 1 GROUP BY type_of_price");
	$stmt->execute();
	$count = $stmt->rowCount();
	if ($count > 0) {
		while ($row = $stmt->fetch()) {
		    $result[] = array(
	            'type_of_price' => $row['type_of_price'],
	            'total' => $row['total']
	        );
		}
	}

	$db = null;

	die(json_encode($result));
	
 ?>