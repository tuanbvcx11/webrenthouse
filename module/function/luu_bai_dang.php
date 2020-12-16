<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $id_user = $_SESSION["iduser"];

    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    
    $result = "chualuu";

    
    $stmt = $db->prepare("SELECT * FROM yeu_thich WHERE id_bai_viet = ? AND id_user = ?");
    //SELECT * FROM post join user on post.id_user = user.id_user WHERE id_post = '$id'
    $stmt->execute([$id,$id_user]);
    $count = $stmt->rowCount();
    
	if ($count > 0) {
		    $result = "daluu";
	}
	
	$db = null;

	echo $result;

?>