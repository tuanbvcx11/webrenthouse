<?php 
	// update tài khoản khi admin duyệt bài

	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $id_user = $_POST['id_user'];

	$stmt = $db->prepare("UPDATE user SET status = '1' WHERE id_user = ?");
	$stmt->execute([$id_user]);
	
	$result = 'ok';

	$db = null;

	echo $result;
	
 ?>