<?php 

	// lấy chủ trọ có nhiều bài viết nhất
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $result = array();

	$stmt = $db->prepare("SELECT p.id_post,p.gia_phong, p.tieu_de, u.name, COUNT(*) AS totallike FROM post p JOIN yeu_thich yt ON p.id_post = yt.id_bai_viet JOIN user u ON p.id_user = u.id_user GROUP BY p.id_post ORDER BY totallike DESC LIMIT 1");
	$stmt->execute();
	$count = $stmt->rowCount();
	if ($count > 0) {
		$row = $stmt->fetch();
	    $result = array(
            'name' => $row['name'],
            'tieu_de' => $row['tieu_de'],
            'totallike' => $row['totallike'],
            'gia_phong' => $row['gia_phong'],
        );
		
	}

	$db = null;

	die(json_encode($result))
	
 ?>