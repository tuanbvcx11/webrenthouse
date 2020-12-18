<?php
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $iduser = isset($_SESSION["iduser"]) ? $_SESSION["iduser"] : 0;

    $result = array();

    $stmt = $db->prepare("SELECT * FROM post WHERE status_post = '1' AND status_phong = '1' ORDER BY id_post DESC LIMIT 4");
    $img = $db->prepare("SELECT * FROM img WHERE id_bai_viet = ? LIMIT 1");
    $stmt->execute();

    $count = $stmt->rowCount();

    if ($count > 0) {
		while ($row = $stmt->fetch()) {
            $id_post = $row['id_post'];
            $img->execute([$id_post]);
            $rowIMG = $img->fetch();

            $yeuthich = "";
            // kiểm tra xem có bài nào trong trong danh sách yêu thích không để bôi đỏ icon tim khi đã đăng nhập
            if($iduser != 0) {
              $Fav = $db->prepare("SELECT * FROM yeu_thich WHERE id_bai_viet = ? AND id_user = ?");
              $Fav->execute([$id_post, $iduser]);
              $countFav = $Fav->rowCount();

              if($countFav > 0) {
                $yeuthich = " fas";
              }
            }

            $result[] = array(
              'id_post' => $row['id_post'], 
              'buttonFav' => $yeuthich,
              'img' => $rowIMG['img'],
	            'spe_add' => $row['spe_add'],
	            'tieu_de' => $row['tieu_de'],
	            'gia_phong' => $row['gia_phong'],
	            'tg_duyet_bai' => $row['tg_duyet_bai']
            );
            
		}
    }
    

    $db = null;
    die(json_encode($result));
?>