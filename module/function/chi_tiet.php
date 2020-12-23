<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    
    $result = array();

    //truy vấn lấy dữ liệu
    $stmt = $db->prepare("SELECT * , DATE_ADD(tg_duyet_bai, INTERVAL tg_hien_thi DAY) as ngay_hethan, DATEDIFF(DATE(NOW()), tg_duyet_bai) AS han_post FROM post join user on post.id_user = user.id_user 
	WHERE id_post = ?");
    
    $stmt->execute([$id]);
    $count = $stmt->rowCount();

	if ($count > 0) {
		    while ($row = $stmt->fetch()) {
		    $result = array(
	            'tieu-de' => $row['tieu_de'],
	            'id-post' => $row['id_post'],
	            'gia' => $row['gia_phong'],
	            //tình trạng, lượt xem, lượt thíchx
	            'province' => $row['province'],
	            'district' => $row['district'],
	            'spe-add' => $row['spe_add'],
	            'luot-xem' => $row['luot_xem'],
	            'status-phong' => $row['status_phong'],
	            'loai-phong' => $row['loai_phong'],
	            'so-phong' => $row['so_phong'],
	            'dien-tich' => $row['dien_tich'],
	            'chung-chu' => $row['chung_chu'],
	            'gia-dien' => $row['gia_dien'],
	            'gia-nuoc' => $row['gia_nuoc'],
	            'nong-lanh' => $row['nong_lanh'],
	            'phong-tam' => $row['phong_tam'],
	            'phong-bep' => $row['bep'],
	            'dieu-hoa' => $row['dieu_hoa'],
	            'ban-cong' => $row['ban_cong'],
	            'khac' => $row['tien_ich_khac'],
	            'mo-ta' => $row['mo_ta'],
	            'id-host' => $row['id_user'],
	            'ten-host' => $row['name'],
	            'sdt-host' => $row['sdt'],
	            'dia-chi-host' => $row['dia_chi'],
	            'ngay-dang' => $row['tg_dang_bai'],
	            'ngay-hethan' => $row['ngay_hethan'],
	            'status-post' => $row['status_post'],
	            'time_hien_thi' => $row['tg_hien_thi'],
	            'han_post' => $row['han_post'],
	            'tg_hien_thi' => $row['tg_hien_thi'],
	        );
		}
	}
	
	$db = null;

	die(json_encode($result));
	

	

 ?>