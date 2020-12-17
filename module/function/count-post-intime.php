<?php 
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $pre = $_POST['pre'];
    $next = $_POST['next'];


    $stmt = $db->prepare("SELECT COUNT(*) as post FROM post WHERE tg_dang_bai >= ? AND tg_dang_bai <= ?");
	$stmt->execute([$pre, $next]);
	$row = $stmt->fetch();
	$count = $row['post'];


	$db = null;

	echo $count;
	
 ?>