<?php
    // lấy các tài khoản đã được duyệt
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $_SESSION["pageSearch"] = isset($_POST["page"]) ? $_POST["page"] : 1;

    $db = null;

    echo "ok";
?>