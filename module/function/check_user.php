<?php  
	// kiểm tra phiên đăng nhập cho phần header
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    $result = "";

	if (!isset($_SESSION["iduser"])) {
		$result = "nologin";
	} else {
		if ($_SESSION["iduser"] == $id) {
			$result = "owner";
		} else  {
			$result = "guest";
		}
	}

	echo $result;
?>