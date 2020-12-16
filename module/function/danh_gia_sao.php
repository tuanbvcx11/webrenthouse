<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    $so_sao = isset($_POST['so_sao']) ? $_POST['so_sao'] : 0;
    $id_user = $_SESSION["iduser"];
    
    $result = '';
    $stmt = $db->prepare("SELECT * FROM danh_gia WHERE id_user = '$id_user' and id_bai_viet = ?");
    //SELECT * FROM post join user on post.id_user = user.id_user WHERE id_post = '$id'
    $stmt->execute([$id]);
    $count = $stmt->rowCount();

	if ($count > 0) {
		$result = $so_sao + " sao";
		    $stmt = $db->prepare("UPDATE danh_gia SET so_sao = ? WHERE id_user = ? AND id_bai_viet = ?");
    //SELECT * FROM post join user on post.id_user = user.id_user WHERE id_post = '$id'
    $stmt->execute([$so_sao,$id_user,$id]);
	} else {
		$result = $so_sao + " sao";
		$stmt = $db->prepare("INSERT INTO `danh_gia` (`id_danh_gia`, `id_user`, `id_bai_viet`, `so_sao`) VALUES (NULL, ?, ?, ?)");
    //SELECT * FROM post join user on post.id_user = user.id_user WHERE id_post = '$id'
    $stmt->execute([$id_user,$id,$so_sao]);
	}

    
	$db = null;

	echo $result;;

?>