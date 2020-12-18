<?php
    // lấy các tài khoản đã được duyệt
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $iduser = isset($_SESSION["iduser"]) ? $_SESSION["iduser"] : 0;

    // lấy dữ liệu từ session
    $citySearch =  isset($_SESSION['citySearch']) ? $_SESSION['citySearch'] : "Thành phố";
    $districtSearch =  isset($_SESSION['districtSearch']) ? $_SESSION['districtSearch'] : "Quân(Huyện)";
    $type_roomSearch =  isset($_SESSION['type_roomSearch']) ? $_SESSION['type_roomSearch'] : "Tất cả";
    $minpriceSearch =  isset($_SESSION['minpriceSearch']) ? $_SESSION['minpriceSearch'] : "Tất cả";
    $maxpriceSearch =  isset($_SESSION['maxpriceSearch']) ? $_SESSION['maxpriceSearch'] : "Tất cả";


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

    $count = $stmt->rowCount();
    $result = ($count > 0) ? $count : 0;

    $_SESSION["totalPostSearch"] = $result;

    $db = null;

    echo $result;
?>