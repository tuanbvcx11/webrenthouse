<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    $trang_thai = isset($_POST['trang_thai']) ? $_POST['trang_thai'] : 0;
    
    $result = '';

    //$stmt = $db->prepare("SELECT * FROM post WHERE id_post = '$id'");
    $stmt = $db->prepare("UPDATE post SET status_phong = ? WHERE id_post = ?");
    //SELECT * FROM post join user on post.id_user = user.id_user WHERE id_post = '$id'
    $stmt->execute([$trang_thai,$id]);
    $count = $stmt->rowCount();

	
	$db = null;

	echo $result;

?>