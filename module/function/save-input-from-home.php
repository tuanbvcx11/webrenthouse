<?php
    // lấy các tài khoản đã được duyệt
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $_SESSION["citySearch"] =  isset($_POST["city"]) ? $_POST["city"] : 0;
    $_SESSION["districtSearch"] =  isset($_POST["district"]) ? $_POST["district"] : 0;
    $_SESSION["type_roomSearch"] =  isset($_POST["type_room"]) ? $_POST["type_room"] : 0;
    $_SESSION["minpriceSearch"] =  isset($_POST["minprice"]) ? $_POST["minprice"] : 0;
    $_SESSION["maxpriceSearch"] =  isset($_POST["maxprice"]) ? $_POST["maxprice"] : 0;

    $db = null;

    echo "ok";
?>