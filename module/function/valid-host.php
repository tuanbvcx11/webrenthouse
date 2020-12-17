<?php
    session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $iduser = isset($_SESSION["iduser"]) ? $_SESSION["iduser"] : 0;
    $vaitro = isset($_SESSION["vaitro"]) ? $_SESSION["vaitro"] : 0;
    
    $result = "sai";

    $stmt = $db->prepare("SELECT * FROM user WHERE id_user = ? AND vai_tro = ?");
	$stmt->execute([$iduser, $vaitro]);
	$row = $stmt->fetch();

    if(($vaitro == "host" || $vaitro == "admin") && $row["status"] == '1') {
        $result = "ok";
    } 

    $db = null;

	echo $result;
?>