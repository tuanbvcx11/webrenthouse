<?php 

	// lấy các tài khoản chưa được duyệt
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $result = array();

	$stmt = $db->prepare("SELECT * FROM user WHERE status = '0'");
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