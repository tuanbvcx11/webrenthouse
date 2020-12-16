<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    $date = isset($_POST['date']) ? $_POST['date'] : 0;
    
    $result = array();

    //$stmt = $db->prepare("SELECT * FROM post WHERE id_post = '$id'");
    $stmt = $db->prepare("UPDATE post SET status_post = '1', tg_duyet_bai = ? WHERE id_post = ?");
    //SELECT * FROM post join user on post.id_user = user.id_user WHERE id_post = '$id'
    $stmt->execute([$date, $id]);
    $count = $stmt->rowCount();

	
	$db = null;

	die(json_encode($result));

?>