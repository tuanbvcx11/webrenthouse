<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    $result = array();
    
    //$stmt = $db->prepare("SELECT * FROM post WHERE id_post = '$id'");
    $stmt = $db->prepare("SELECT *, round((SUM(so_sao)) / COUNT(id_danh_gia),1) AS danh_gia  
	FROM danh_gia
	WHERE id_bai_viet = ?");
    //SELECT * FROM post join user on post.id_user = user.id_user WHERE id_post = '$id'
    $stmt->execute([$id]);
    $count = $stmt->rowCount();

	if ($count > 0) {
		    while ($row = $stmt->fetch()) {
		    $result = array(
		    	'star-avg' => $row['danh_gia'],
	        );
		}
	}
	
	$db = null;

	die(json_encode($result));

?>