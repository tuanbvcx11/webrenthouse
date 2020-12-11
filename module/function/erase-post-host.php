<?php
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $iduser = isset($_SESSION["iduser"]) ? $_SESSION["iduser"] : 0;

    $idPost = isset($_POST['idpost']) ? $_POST['idpost'] : 0;

    /* if($action == "xoa") {
        $status = '-1';
    } */

    $stmt = $db->prepare("DELETE FROM post WHERE id_post = ? AND id_user = ?");
	$stmt->execute([$idPost, $iduser]);


    $db = null;

	echo "ok";
?>