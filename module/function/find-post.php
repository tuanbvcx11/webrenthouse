<?php
    // lấy các tài khoản đã được duyệt
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $db->setAttribute( PDO::ATTR_EMULATE_PREPARES, false );

    $iduser = isset($_SESSION["iduser"]) ? $_SESSION["iduser"] : 0;

    // lấy dữ liệu từ session
    $citySearch =  isset($_SESSION['citySearch']) ? $_SESSION['citySearch'] : "Thành phố";
    $districtSearch =  isset($_SESSION['districtSearch']) ? $_SESSION['districtSearch'] : "Quân(Huyện)";
    $type_roomSearch =  isset($_SESSION['type_roomSearch']) ? $_SESSION['type_roomSearch'] : "Tất cả";
    $minpriceSearch =  isset($_SESSION['minpriceSearch']) ? $_SESSION['minpriceSearch'] : "Tất cả";
    $maxpriceSearch =  isset($_SESSION['maxpriceSearch']) ? $_SESSION['maxpriceSearch'] : "Tất cả";
    // trang tìm kiếm
    $pageSearch = isset($_SESSION["pageSearch"]) ? $_SESSION["pageSearch"] : 1;
    // tổng số bài viết tìm kiếm đc
    $totalPost = isset($_SESSION["totalPostSearch"]) ? $_SESSION["totalPostSearch"] : 1;

    $result = array();
    // số bài post một trang
    $post_per_page = 8;
    $offset = ($pageSearch - 1) * $post_per_page;


    if($citySearch == "Thành phố") {
      $city = '%%';
    } else {
      $city = $citySearch;
    }

    if($districtSearch == "Quận(Huyện)") {
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
        $stmt = $db->prepare("SELECT * FROM post
                              WHERE province LIKE ? AND district LIKE ? AND loai_phong LIKE ? AND status_post = 1 AND status_phong = 1 AND gia_phong LIKE '%%'
                              LIMIT ? OFFSET ?");
        $stmt->execute([$city, $district, $type_room  , $post_per_page, $offset ]);
      } else {
        $stmt = $db->prepare("SELECT * FROM post
                              WHERE province LIKE ? AND district = ? AND loai_phong LIKE ? AND status_post = 1 AND status_phong = 1 AND gia_phong <= ?
                              LIMIT ? OFFSET ?");
        $stmt->execute([$city, $district, $type_room, $maxprice , $post_per_page, $offset ]);
      }
    } else if($minpriceSearch != "Tất cả"){
      if($maxpriceSearch == "Tất cả") {
        $stmt = $db->prepare("SELECT * FROM post
                              WHERE province LIKE ? AND district LIKE ? AND loai_phong LIKE ? AND status_post = 1 AND status_phong = 1 AND gia_phong >= ?
                              LIMIT ? OFFSET ?");
        $stmt->execute([$city, $district, $type_room, $minprice, $post_per_page, $offset ]);
      } else {
        $stmt = $db->prepare("SELECT * FROM post
                              WHERE province LIKE ? AND district LIKE ? AND loai_phong LIKE ? AND status_post = 1 AND status_phong = 1 AND gia_phong >= ? AND gia_phong <= ?
                              LIMIT ? OFFSET ?");
        $stmt->execute([$city, $district, $type_room, $minprice, $maxprice, $post_per_page, $offset ]);
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
          'tg_duyet_bai' => $row['tg_duyet_bai'],
        );
      }
    }
    $db = null;
    die(json_encode($result));
?>