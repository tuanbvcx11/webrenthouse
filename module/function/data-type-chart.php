<?php 
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $result = array();

    $stmt = $db->prepare("SELECT loai_phong, COUNT(*) as total FROM post GROUP BY loai_phong");
	$stmt->execute();
	$count = $stmt->rowCount();
	if ($count > 0) {
		while ($row = $stmt->fetch()) {
		    $result[] = array(
	            'loai_phong' => $row['loai_phong'],
	            'total' => $row['total']
	        );
		}
	}

	$db = null;

	die(json_encode($result));
	
 ?>