<?php
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $iduser = isset($_SESSION["iduser"]) ? $_SESSION["iduser"] : 0;

    $idPost = isset($_POST['idpost']) ? $_POST['idpost'] : 0;

    $inputgiahan = isset($_POST['inputgiahan']) ? $_POST['inputgiahan'] : 0;

    
    $stmt = $db->prepare("UPDATE post SET tg_hien_thi = ?, status_post = '0' WHERE id_post = ? AND id_user = ?");
	$stmt->execute([$inputgiahan, $idPost, $iduser]);

    
    $db = null;

	echo "ok";
?>