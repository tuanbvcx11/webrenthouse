<?php 
	// update tin nhắn thành đã đọc admin click vào tin nhắn 

	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $idhost = $_POST['idhost'];

	$stmt = $db->prepare("UPDATE last_chat SET status_mes = '0' WHERE id_host = ?");
	$stmt->execute([$idhost]);
	
	$result = 'ok';

	$db = null;

	echo $result;
	
 ?>