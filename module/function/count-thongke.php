<?php 
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");


    $result = array(
    	'post' => '',
    	'host' => '',
    	'guest' => ''
    );

    $stmt = $db->prepare("SELECT COUNT(*) as post FROM post");
	$stmt->execute();
	$row = $stmt->fetch();
	$result['post'] = $row['post'];

	$stmt = $db->prepare("SELECT COUNT(*) as host FROM user WHERE vai_tro = 'host'");
	$stmt->execute();
	$row = $stmt->fetch();
	$result['host'] = $row['host'];


    $stmt = $db->prepare("SELECT COUNT(*) as guest FROM user WHERE vai_tro = 'guest'");
	$stmt->execute();
	$row = $stmt->fetch();
	$result['guest'] = $row['guest'];


	$db = null;

	die(json_encode($result));
	
 ?>