<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    $id_user = $_SESSION["iduser"];
    
    $result = '';
    $stmt = $db->prepare("INSERT INTO yeu_thich (id_like, id_bai_viet, id_user) VALUES (NULL, ?, ?)");
    //SELECT * FROM post join user on post.id_user = user.id_user WHERE id_post = '$id'
    $stmt->execute([$id, $id_user]);
    
    
	$db = null;

	echo $result;;

?>