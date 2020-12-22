<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    $id_user = $_SESSION["iduser"];
    $content = isset($_POST['content']) ? $_POST['content'] : 0;
    
    $result = '';
    $stmt = $db->prepare("INSERT INTO thong_bao (id_thongbao, id_bai_viet, id_send, id_receive, content,more_content) VALUES (NULL, ?, ?, '1','vừa báp cáo bài viết', ?)");
    //SELECT * FROM post join user on post.id_user = user.id_user WHERE id_post = '$id'
    $stmt->execute([$id, $id_user, $content]);
    
    
	$db = null;

	echo $result;;

?>