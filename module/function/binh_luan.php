<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    
    $result = array();

    //$stmt = $db->prepare("SELECT * FROM post WHERE id_post = '$id'");
    $stmt = $db->prepare("SELECT * FROM comment JOIN user ON comment.id_user = user.id_user WHERE comment.id_bai_viet = '$id'");
    //SELECT * FROM post join user on post.id_user = user.id_user WHERE id_post = '$id'
    $stmt->execute();
    $count = $stmt->rowCount();

	if ($count > 0) {
		    while ($row = $stmt->fetch()) {
		    $result[] = array(
		    	'name' => $row['name'],
		    	'comment' => $row['comment']
	        );
		}
	}
	$db = null;

	die(json_encode($result));

?>