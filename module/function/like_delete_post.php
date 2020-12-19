<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
	
	
	$iduser = $_SESSION["iduser"];
	$idpost = isset($_POST["id"]) ? $_POST["id"] : 0;

	echo $idpost;
	// lấy số bài đã thích của từng user
	$stmt = $db->prepare("DELETE FROM yeu_thich WHERE id_bai_viet = ? AND id_user = ?");
	$stmt->execute([$idpost, $iduser]);
	
	$db = null;
	$result = '';
	echo $result;
?>