<?php
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $result = array();

    //lấy các bài viết đã duyệt 
    $stmt = $db->prepare("SELECT DATEDIFF(DATE_ADD(tg_duyet_bai, INTERVAL tg_hien_thi DAY), DATE(NOW())) as remainingTime, DATE(NOW()), tg_duyet_bai, tg_hien_thi, id_post, id_user 
                        FROM post 
                        WHERE status_post = '1'");
	$stmt->execute();
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