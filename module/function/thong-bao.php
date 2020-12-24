<?php 
	// lấy thông báo của user đang đăng nhập
	
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");


    $result = array();
    if (isset($_SESSION["iduser"])) {
    	$iduser = $_SESSION["iduser"];

    	$stmt = $db->prepare("SELECT u.name, tb.content, tb.id_bai_viet, p.tieu_de, tb.more_content FROM thong_bao tb JOIN user u ON tb.id_send = u.id_user JOIN post p ON tb.id_bai_viet = p.id_post WHERE tb.id_receive = ? ORDER BY tb.id_thongbao DESC");
		$stmt->execute([$iduser]);
		$count = $stmt->rowCount();
		if ($count > 0) {
			while ($row = $stmt->fetch()) {
			    $result[] = array(
		            'id_bai_viet' => $row['id_bai_viet'],
		            'name' => $row['name'],
		            'tieu_de' => $row['tieu_de'],
		            'content' => $row['content'],
		            'more_cont' => $row['more_content']

		        );
			}
		}
    }

	

	$db = null;

	die(json_encode($result));
	
 ?>