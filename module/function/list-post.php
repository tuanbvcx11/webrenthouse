<?php 

	// lấy các tài khoản đã được duyệt
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $type = isset($_POST['type']) ? $_POST['type'] : 0;
    $result = array();

    if ($type === "unapproved") {
    	$status = '0';
    } else if ($type === "approved") {
    	$status = '1';
    } else $status = '-1';

	$stmt = $db->prepare("SELECT * FROM post p JOIN user u on p.id_user = u.id_user WHERE p.status_post = ?");
	$stmt->execute([$status]);
	$count = $stmt->rowCount();
	if ($count > 0) {
		while ($row = $stmt->fetch()) {
		    $result[] = array(
	            'id_post' => $row['id_post'],
	            'name' => $row['name'],
	            'tieu_de' => $row['tieu_de'],
	            'tg_dang_bai' => $row['tg_dang_bai'],
	            'tg_hien_thi' => $row['tg_hien_thi']
	        );
		}
	}

	$db = null;

	die(json_encode($result));
	
 ?>