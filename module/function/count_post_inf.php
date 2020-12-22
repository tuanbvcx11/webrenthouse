<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    
    $result = '';

    //$stmt = $db->prepare("SELECT * FROM post WHERE id_post = '$id'");
    $stmt = $db->prepare("SELECT COUNT(id_post) AS total FROM post WHERE id_user = ? AND status_post = '1'");
    //SELECT * FROM post join user on post.id_user = user.id_user WHERE id_post = '$id'
    $stmt->execute([$id]);
    $count = $stmt->rowCount();

	$row = $stmt->fetch();
	echo ceil($row['total']/2);
	$db = null;


?>