<?php
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $iduser = isset($_SESSION["iduser"]) ? $_SESSION["iduser"] : 0;
    $result = array();

    //lấy các bài viết đã duyệt 
    $stmt = $db->prepare("SELECT DATEDIFF(DATE_ADD(DATE(NOW()), INTERVAL tg_hien_thi DAY), tg_dang_bai) as remainingTime, id_post, id_user 
                        FROM post 
                        WHERE id_user = ? AND status_post = '1'");
	$stmt->execute([$iduser]);
    $count = $stmt->rowCount();

    // cập nhật hệt hạn cho status_post = -2
    $hethan = $db->prepare("UPDATE post SET status_post = '-2', tg_duyet_bai = 'NULL' WHERE id_post = ? AND id_user = ?");
	

    if($count > 0) {
        while ($row = $stmt->fetch()) {      
		    
            $idpost = $row['id_post'];
            $iduser = $row['id_user'];
            $remainingTime = $row['remainingTime'];
            if($remainingTime == "0") {
                $hethan->execute([$idpost, $iduser]);
            } 
		}
    }
    $db = null;

	echo "ok";
?>