<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    $id_user = $_SESSION["iduser"];
    $content = isset($_POST['content']) ? $_POST['content'] : 0;
    $date = isset($_POST['date']) ? $_POST['date'] : 0;
    
    $result = '';
    $stmt = $db->prepare("INSERT INTO comment (id_cmt, id_bai_viet, id_user, comment, cmt_date) VALUES (NULL, ?, ?, ?, ?)");
    //SELECT * FROM post join user on post.id_user = user.id_user WHERE id_post = '$id'
    $stmt->execute([$id, $id_user, $content, $date]);
    
    
	$db = null;

	echo $result;;

?>