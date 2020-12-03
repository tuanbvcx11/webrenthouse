<?php 

	// lấy các tài khoản đã được duyệt
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");


	$stmt = $db->prepare("SELECT * FROM user WHERE status = '1' AND id_user != '1'");
	$stmt->execute();
	$count = $stmt->rowCount();
	if ($count > 0) {
		while ($row = $stmt->fetch()) {
		    $result[] = array(
	            'id_user' => $row['id_user'],
	            'username' => $row['username'],
	            'name' => $row['name'],
	            'password' => $row['password'],
	            'dia_chi' => $row['dia_chi'],
	            'sdt' => $row['sdt']
	        );
		}
	}

	$db = null;

	die(json_encode($result))
	
 ?>