<?php  
	// kiểm tra phiên đăng nhập cho phần header
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    $result = "";

	if (!isset($_SESSION["vaitro"])) {
		$result = "nologin";
	} else {
		if ($_SESSION["vaitro"] == "admin") {
			$result = "admin";
		} else if ($_SESSION["vaitro"] == "host") {
			$result = "host";
		} else {
			$result = "guest";
		}
	}

	echo $result;
?>