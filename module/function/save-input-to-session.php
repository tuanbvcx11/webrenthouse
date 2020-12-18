<?php
    // lấy các tài khoản đã được duyệt
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $_SESSION["citySearch"] =  isset($_POST["city"]) ? $_POST["city"] : "Thành phố";
    $_SESSION["districtSearch"] =  isset($_POST["district"]) ? $_POST["district"] : "Quận(Huyện)";
    $_SESSION["type_roomSearch"] =  isset($_POST["type_room"]) ? $_POST["type_room"] : "Tất cả";
    $_SESSION["minpriceSearch"] =  isset($_POST["minprice"]) ? $_POST["minprice"] :"Tất cả";
    $_SESSION["maxpriceSearch"] =  isset($_POST["maxprice"]) ? $_POST["maxprice"] : "Tất cả";
    $_SESSION["pageSearch"] = isset($_POST["page"]) ? $_POST["page"] : 1;

    $db = null;

    echo "ok";
?>