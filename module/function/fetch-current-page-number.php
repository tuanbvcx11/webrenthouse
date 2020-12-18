<?php
    // lấy các tài khoản đã được duyệt
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    
    $result = isset($_SESSION["pageSearch"]) ? $_SESSION["pageSearch"] : 1;

    $db = null;

    echo $result;
?>