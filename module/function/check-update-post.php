<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $idPost = isset($_POST['idPost']) ? $_POST['idPost'] : 0;
   
    $result = 'sai';

    if (isset($_SESSION["iduser"])) {
    	$iduser = $_SESSION["iduser"];
    	$stmt = $db->prepare("SELECT * FROM post WHERE id_post = ? AND id_user = ? AND status_post = 0");
    	$stmt->execute([$idPost, $iduser]);
    	$count = $stmt->rowCount();
		if ($count > 0) {
			$result = 'ok';
		}
    }


	$db = null;

	echo $result;

 ?>