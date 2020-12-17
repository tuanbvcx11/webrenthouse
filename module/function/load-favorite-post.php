<?php
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $iduser = isset($_SESSION["iduser"]) ? $_SESSION["iduser"] : 0;

    $result = array();

    $stmt = $db->prepare("SELECT COUNT(id_like) AS fav, id_bai_viet FROM yeu_thich GROUP BY id_bai_viet ORDER BY fav DESC ");
    $post = $db->prepare("SELECT * FROM post WHERE status_post = '1' AND status_phong = '1' AND id_post = ?");
    $img = $db->prepare("SELECT * FROM img WHERE id_bai_viet = ? LIMIT '1'");

    $stmt->execute();

    $count = $stmt->rowCount();

    if ($count > 0) {
      while ($row = $stmt->fetch()) {
              $id_bai_viet = $row['id_bai_viet'];
              $post->execute([$id_bai_viet]);
              $img->execute([$id_bai_viet]);

              // kiểm tra xem bải viết được yêu thích nhiều có còn hạn hoặc có còn tồn tại hay không
              $countPost = $post->rowCount();
              if($countPost > 0) {
                $rowIMG = $img->fetch();
                $rowPost = $post->fetch();
    
                // kiểm tra xem có bài nào trong trong danh sách yêu thích không để bôi đỏ icon tim khi đã đăng nhập
                $yeuthich = "";
                if($iduser != 0) {
                  $postFav = $db->prepare("SELECT * FROM post WHERE status_post = '1' AND status_phong = '1' AND id_post = ? AND id_user = ?");
                  $postFav->execute([$id_bai_viet, $iduser]);
    
                  $countFav = $postFav->fetch();
    
                  if($countFav > 0) {
                    $yeuthich = " fas";
                  }
                }
                $result[] = array(
                  'id_post' => $rowPost['id_post'],
                  'buttonFav' => $yeuthich,
                  'img' => $rowIMG['img'],
                  'spe_add' => $rowPost['spe_add'],
                  'tieu_de' => $rowPost['tieu_de'],
                  'gia_phong' => $rowPost['gia_phong'],
                  'tg_duyet_bai' => $rowPost['tg_duyet_bai']
                );
                
              }
              
      }
    }
    

    $db = null;
    die(json_encode($result));
?>