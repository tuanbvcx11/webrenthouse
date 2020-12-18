<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $db->setAttribute( PDO::ATTR_EMULATE_PREPARES, false );
    $id = $_SESSION["iduser"];
    $page = isset($_POST['page']) ? $_POST['page'] : 0;
    $count1 = ($page -1) * 2;
    
    $result = array();


    $stmt = $db->prepare("SELECT yeu_thich.id_bai_viet, img.img, post.tieu_de, post.province, post.district,post.spe_add,post.gia_phong, post.tg_duyet_bai FROM yeu_thich JOIN post ON yeu_thich.id_bai_viet = post.id_post JOIN img ON img.id_bai_viet=post.id_post  WHERE yeu_thich.id_user = '1' AND post.status_post = '1' GROUP BY post.id_post LIMIT 2 OFFSET '0'");
    
    $stmt->execute();
    $count = $stmt->rowCount();

	if ($count > 0) {
		    while ($row = $stmt->fetch()) {
		    $result[] = array(
		    	'id_post' => $row['id_bai_viet'],
		    	'tieu_de' => $row['tieu_de'],
		    	'spe_add' => $row['spe_add'],
		    	'district' => $row['district'],
		    	'province' => $row['province'],
		    	'gia_phong' => $row['gia_phong'],
		    	'tg_dang_bai' => $row['tg_dang_bai'],
		    	'img' => $row['img']
	        );
	        
		}
	}

	$db = null;
	die(json_encode($result));

?>