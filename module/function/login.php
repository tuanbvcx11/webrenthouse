<?php 

	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    //lấy các giá trị từ bên front
    $username = $_POST['user'];
    $pass = md5($_POST['pass']);

    // $result = "";

    // tạo biến result check các trường hợp tài khoản
    $result = "sai";

	$stmt = $db->prepare("SELECT * FROM user WHERE username = ? AND password = ?");
	$stmt->execute([$username, $pass]);
	$count = $stmt->rowCount();
	
	if ($count > 0) {
		// nếu tài khoản đã có trong sb
		$row = $stmt->fetch();

		if ($row["status"] == 1) {
			// nếu là tài khoản đã được duyệt
			$result = "ok";
			$_SESSION["iduser"] = $row["id_user"];
			$_SESSION["vaitro"] = $row["vai_tro"];
		} else {
			// nếu là tài khoản chưa được duyệt
			$result = "load";
		}
	}

	
	$db = null;

	echo $result;
	
 ?>