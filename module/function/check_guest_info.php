<?php  
	// kiểm tra phiên đăng nhập cho phần header
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    $result = "other";

    $stmt = $db->prepare("SELECT * FROM `user` WHERE id_user = ?");
	$stmt->execute([$id]);
	$count = $stmt->rowCount();
	if ($count > 0){
		$row = $stmt->fetch();
		if ($row['vai_tro'] == "guest"){
			$result = "guest";
		}
	}

	echo $result;
?>