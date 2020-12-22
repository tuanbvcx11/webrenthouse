<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    
    $iduser = $_SESSION["iduser"];
    $result = '';

    //$stmt = $db->prepare("SELECT * FROM post WHERE id_post = '$id'");
    $stmt = $db->prepare("SELECT COUNT(id_like) AS total FROM yeu_thich WHERE id_user = ?");
    //SELECT * FROM post join user on post.id_user = user.id_user WHERE id_post = '$id'
    $stmt->execute([$iduser]);
    $count = $stmt->rowCount();

	$row = $stmt->fetch();
	echo $row['total'];
	$db = null;


?>