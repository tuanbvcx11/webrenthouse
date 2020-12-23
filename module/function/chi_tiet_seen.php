<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    
    $result = array();

    //tăng lượt xem
    $stmt = $db->prepare("UPDATE post SET luot_xem = luot_xem + 1 WHERE id_post = ?");
    $stmt->execute([$id]);
    
	$db = null;

	die(json_encode($result));
	

	

 ?>