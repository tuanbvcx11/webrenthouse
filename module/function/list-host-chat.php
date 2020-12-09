<?php 

	// lấy các tài khoản chưa được duyệt
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $result = array();

	$stmt = $db->prepare("SELECT * FROM last_chat lc JOIN user u ON lc.id_host = u.id_user ORDER BY last_date DESC");
	$stmt->execute();
	$count = $stmt->rowCount();
	if ($count > 0) {
		while ($row = $stmt->fetch()) {
		    $result[] = array(
	            'last_message' => $row['last_message'],
	            'id_host' => $row['id_host'],
	            'name' => $row['name'],
	            'status' => $row['status_mes'],
	            'action' => $row['action']
	        );
		}
	}

	$db = null;

	die(json_encode($result))
	
 ?>