<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
<<<<<<< HEAD
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
=======
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
>>>>>>> 9510eeee951f240f6360bccddcadef814d35347d
	        );
	        
		}
	}

	$db = null;
	die(json_encode($result));

?>