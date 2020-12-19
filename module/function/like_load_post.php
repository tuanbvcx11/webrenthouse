<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

	$db->setAttribute( PDO::ATTR_EMULATE_PREPARES, false );
	
    

	$iduser = isset($_SESSION["iduser"]) ? $_SESSION["iduser"] : 0;
	$page = isset($_POST['page']) ? $_POST['page'] : 0;

	$count1 = ($page - 1) * 2 ;

	$result = array();

	// lấy số bài đã thích của từng user
	$stmt = $db->prepare("SELECT * FROM yeu_thich WHERE id_user = ? LIMIT 2 OFFSET ?");
	$stmt->execute([$iduser, $count1]);
	$count = $stmt->rowCount();

	if ($count > 0) {

		    while ($row = $stmt->fetch()) {
			// lấy id_bai_viet từng hàng
			$id_bai_viet = $row['id_bai_viet'];

			// dùng id_bai_viet rồi cho vào trong bảng post và img để tìm thông tin bài đăng và lấy ảnh
			$postTABLE = $db->prepare("SELECT * FROM post WHERE id_post = ?");
			$imgTABLE = $db->prepare("SELECT * FROM img WHERE id_bai_viet = ? LIMIT 1");

			$postTABLE->execute([$id_bai_viet]);
			$imgTABLE->execute([$id_bai_viet]);

			$rowPOST = $postTABLE->fetch();
			$rowIMG = $imgTABLE->fetch();

		    $result[] = array(
		    	'id_post' => $row['id_bai_viet'],
		    	'tieu_de' => $rowPOST['tieu_de'],
		    	'spe_add' => $rowPOST['spe_add'],
		    	'district' => $rowPOST['district'],
		    	'province' => $rowPOST['province'],
		    	'gia_phong' => $rowPOST['gia_phong'],
		    	'tg_dang_bai' => $rowPOST['tg_dang_bai'],
		    	'img' => $rowIMG['img']

	        );
	        
		}
	}

	$db = null;
	die(json_encode($result));

?>