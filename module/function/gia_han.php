<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    $time = isset($_POST['time']) ? $_POST['time'] : 0;
    
    $result = '';

    //$stmt = $db->prepare("SELECT * FROM post WHERE id_post = '$id'");
    $stmt = $db->prepare("UPDATE post SET tg_hien_thi = ?, status_post = '0' WHERE id_post = ?");
    //SELECT * FROM post join user on post.id_user = user.id_user WHERE id_post = '$id'
    $stmt->execute([$time, $id]);

	
	$db = null;

	echo $result;

?>