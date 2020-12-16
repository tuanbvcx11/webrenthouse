<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $id_user = $_SESSION["iduser"];
    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    
    $result = array();

    //$stmt = $db->prepare("SELECT * FROM post WHERE id_post = '$id'");
    $stmt = $db->prepare("SELECT * FROM danh_gia WHERE id_user = ? and id_bai_viet = ?");
    //SELECT * FROM post join user on post.id_user = user.id_user WHERE id_post = '$id'
    $stmt->execute([$id_user,$id]);
    $count = $stmt->rowCount();

	if ($count > 0) {
		    while ($row = $stmt->fetch()) {
		    $result = array(
		    	'so-sao' => $row['so_sao']
	        );
		}
	}
	
	$db = null;

	die(json_encode($result));

?>