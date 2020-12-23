<?php
    // lấy các tài khoản đã được duyệt
    session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $iduser = isset($_SESSION["iduser"]) ? $_SESSION["iduser"] : 0;
    $vaitro = isset($_SESSION["vaitro"]) ? $_SESSION["vaitro"] : 0;

    $type = isset($_POST['type']) ? $_POST['type'] : 0;
    $result = array();

    if ($type == "Đã duyệt") {
        $status = 1;
    } else if($type == "Chưa duyệt") {
        $status = 0;
    } else {
        $status = -2;
    }

    $stmt = $db->prepare("SELECT * FROM post WHERE id_user = ? AND status_post = ?");
	$stmtLike = $db->prepare("SELECT * FROM yeu_thich WHERE id_bai_viet = ?");
    
    $stmt->execute([$iduser, $status]);

    $count = $stmt->rowCount();
    
    if ($count > 0) {
		while ($row = $stmt->fetch()) {
            $idpost = $row['id_post'];
			$stmtLike->execute([$idpost]);
			$countLike = $stmtLike->rowCount();
			if($countLike > 0) {
				$result[] = array(
                    'id_post' => $row['id_post'],
                    'spe_add' => $row['spe_add'],
                    'tieu_de' => $row['tieu_de'],
                    'gia_phong' => $row['gia_phong'],
                    'yeu_thich' => $countLike,
                    'tieu_de' => $row['tieu_de'],
                    'tg_dang_bai' => $row['tg_dang_bai'],
                    'tg_duyet_bai' => $row['tg_duyet_bai'],
                    'tg_hien_thi' => $row['tg_hien_thi'],
                    'province' => $row['province'],
                    'district' => $row['district'],
                    'dien_tich' => $row['dien_tich']
				);
			} else {
                $result[] = array(
                    'id_post' => $row['id_post'],
                    'spe_add' => $row['spe_add'],
                    'tieu_de' => $row['tieu_de'],
                    'gia_phong' => $row['gia_phong'],
                    'yeu_thich' => "0",
                    'tieu_de' => $row['tieu_de'],
                    'tg_dang_bai' => $row['tg_dang_bai'],
                    'tg_duyet_bai' => $row['tg_duyet_bai'],
                    'tg_hien_thi' => $row['tg_hien_thi'],
                    'province' => $row['province'],
                    'district' => $row['district'],
                    'dien_tich' => $row['dien_tich']
                );
            }
		    
		}
    }

	$db = null;

	die(json_encode($result));
?>