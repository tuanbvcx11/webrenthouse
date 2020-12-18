<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $db->setAttribute( PDO::ATTR_EMULATE_PREPARES, false );
    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    $page = isset($_POST['page']) ? $_POST['page'] : 0;
    $count = ($page -1) * 2;
    $result = array();

    
    $stmt = $db->prepare("SELECT post.id_post, post.tieu_de, post.spe_add, post.district, post.province, post.gia_phong, post.tg_dang_bai, img.img FROM post JOIN img ON post.id_post = img.id_bai_viet WHERE post.id_user = ? AND post.status_post = '1' GROUP BY post.id_post limit 2 offset ?");
    
    $stmt->execute([$id, $count]);
    $count = $stmt->rowCount();

	if ($count > 0) {
		    while ($row = $stmt->fetch()) {
		    	$fav = "chualuu";
		    	$idpost = $row['id_post'];
		    	
		    	if (isset($_SESSION["iduser"])){
					$stmt1 = $db->prepare("SELECT * FROM yeu_thich WHERE id_bai_viet = ? AND id_user = ?");
				    
				    $stmt1->execute([$idpost, $_SESSION["iduser"]]);
				    $count1 = $stmt1->rowCount();
				    if ($count1 > 0) {$fav = "daluu";}
			    }
		    $result[] = array(
		    	'id_post' => $row['id_post'],
		    	'tieu_de' => $row['tieu_de'],
		    	'spe_add' => $row['spe_add'],
		    	'district' => $row['district'],
		    	'province' => $row['province'],
		    	'gia_phong' => $row['gia_phong'],
		    	'tg_dang_bai' => $row['tg_dang_bai'],
		    	'img' => $row['img'],
		    	'fav' => $fav
	        );
	        
		}
	}

	$db = null;
	die(json_encode($result));

?>