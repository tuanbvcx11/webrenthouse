<?php
    // lấy các tài khoản đã được duyệt
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $iduser = isset($_SESSION["iduser"]) ? $_SESSION["iduser"] : 0;

    $citySearch =  isset($_POST["city"]) ? $_POST["city"] : 0;
    $districtSearch =  isset($_POST["district"]) ? $_POST["district"] : 0;
    $type_roomSearch =  isset($_POST["type_room"]) ? $_POST["type_room"] : 0;
    $minpriceSearch =  isset($_POST["minprice"]) ? $_POST["minprice"] : 0;
    $maxpriceSearch =  isset($_POST["maxprice"]) ? $_POST["maxprice"] : 0;

    $result = array();
    
    if($citySearch == "Thành phố") {
      $city = '%%';
    } else {
      $city = $citySearch;
    }

    if($districtSearch == "Quân(Huyện)") {
      $district = '%%';
    } else {
      $district = $districtSearch;
    }

    if($type_roomSearch == "Tất cả") {
      $type_room = '%%';
    } else {
      $type_room = $type_roomSearch;
    }
    $minprice = "Tất cả";
    $maxprice = "Tất cả";
    if($minpriceSearch != "Tất cả") {
      $minprice = $minpriceSearch * 1000000;
    }
    if($maxpriceSearch != "Tất cả") {
      $maxprice = $maxpriceSearch * 1000000;
    }


    if($minpriceSearch == "Tất cả") {
      if($maxpriceSearch == "Tất cả") {
        $stmt = $db->prepare("SELECT * FROM post WHERE province LIKE ? AND district LIKE ? AND loai_phong LIKE ? AND status_post = 1 AND status_phong = 1 AND gia_phong LIKE '%%'");
        $stmt->execute([$city, $district, $type_room]);
      } else {
        $stmt = $db->prepare("SELECT * FROM post WHERE province LIKE ? AND district = ? AND loai_phong LIKE ? AND status_post = 1 AND status_phong = 1 AND gia_phong <= ?");
        $stmt->execute([$city, $district, $type_room, $maxprice]);
      }
    } else if($minpriceSearch != "Tất cả"){
      if($maxpriceSearch == "Tất cả") {
        $stmt = $db->prepare("SELECT * FROM post WHERE province LIKE ? AND district LIKE ? AND loai_phong LIKE ? AND status_post = 1 AND status_phong = 1 AND gia_phong >= ?");
        $stmt->execute([$city, $district, $type_room, $minprice]);
      } else {
        $stmt = $db->prepare("SELECT * FROM post WHERE province LIKE ? AND district LIKE ? AND loai_phong LIKE ? AND status_post = 1 AND status_phong = 1 AND gia_phong >= ? AND gia_phong <= ?");
        $stmt->execute([$city, $district, $type_room, $minprice, $maxprice]);
      }
    }
    $img = $db->prepare("SELECT * FROM img WHERE id_bai_viet = ? LIMIT 1");
    $tel = $db->prepare("SELECT * FROM user WHERE id_user = ? and status = 1");
    $count = $stmt->rowCount();

    if($count > 0) {
      while ($row = $stmt->fetch()) {
        $id_post = $row['id_post'];
        $id_user_tel = $row['id_user'];

        $img->execute([$id_post]);
        $tel->execute([$id_user_tel]);

        $rowIMG = $img->fetch();
        $rowTel = $tel->fetch();

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
          'tel' => $rowTel['sdt'],
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