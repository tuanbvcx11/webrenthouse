<?php
    // lấy các tài khoản đã được duyệt
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $result = array(
        'citySearch' => isset($_SESSION['citySearch']) ? $_SESSION['citySearch'] : "Thành phố",
        'districtSearch' =>  isset($_SESSION['districtSearch']) ? $_SESSION['districtSearch'] : "Quận(Huyện)",
        'type_roomSearch' =>  isset($_SESSION['type_roomSearch']) ? $_SESSION['type_roomSearch'] : "Tất cả",
        'minpriceSearch' =>  isset($_SESSION['minpriceSearch']) ? $_SESSION['minpriceSearch'] : "Tất cả",
        'maxpriceSearch' =>  isset($_SESSION['maxpriceSearch']) ? $_SESSION['maxpriceSearch'] : "Tất cả",
        'page' => isset($_SESSION["pageSearch"]) ? $_SESSION["pageSearch"] : 1
    );

    $db = null;
    die(json_encode($result));

?>