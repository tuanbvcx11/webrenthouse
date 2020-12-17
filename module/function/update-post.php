<?php 

	// lấy các tài khoản đã được duyệt
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $action = isset($_POST['action']) ? $_POST['action'] : 0;
    $idpost = isset($_POST['idpost']) ? $_POST['idpost'] : 0;



    if ($action === 'duyet') {
    	$status = '1';
    	$tg_duyet_bai = date('Y-m-d');
    	$stmt = $db->prepare("UPDATE post SET tg_duyet_bai = ? WHERE id_post = ?");
		$stmt->execute([$tg_duyet_bai, $idpost]);
    } else if ($action === 'xoa') {
    	$status = '-1';
    } else $status = '0';

	$stmt = $db->prepare("UPDATE post SET status_post = ? WHERE id_post = ?");
	$stmt->execute([$status, $idpost]);
	// $count = $stmt->rowCount();
	// if ($count > 0) {
	// 	while ($row = $stmt->fetch()) {
	// 	    $result[] = array(
	//             'id_post' => $row['id_post'],
	//             'name' => $row['name'],
	//             'tieu_de' => $row['tieu_de'],
	//             'tg_dang_bai' => $row['tg_dang_bai'],
	//             'tg_hien_thi' => $row['tg_hien_thi']
	//         );
	// 	}
	// }

	$db = null;

	echo "ok";
	
 ?>