<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $id_user = $_SESSION["iduser"];
    
    $result = array();

    //$stmt = $db->prepare("SELECT * FROM post WHERE id_post = '$id'");
    $stmt = $db->prepare("SELECT * FROM user WHERE id_user = '$id_user'");
    //SELECT * FROM post join user on post.id_user = user.id_user WHERE id_post = '$id'
    $stmt->execute();
    $count = $stmt->rowCount();

	if ($count > 0) {
		    while ($row = $stmt->fetch()) {
		    $result = array(
		    	'id-user' => $row['id_user'],
		    	'ten-user' => $row['name'],
		    	'vai-tro' => $row['vai_tro']
	        );
		}
	}
	
	$db = null;

	die(json_encode($result));

?>