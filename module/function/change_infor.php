<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    

    //lấy các giá trị từ bên front
    $id = $_POST['id'];
    $name = $_POST['name'];
    $sdt = $_POST['sdt'];
    $email = $_POST['email'];
    $dia_chi = $_POST['dia_chi'];
    

    $result = "";

		$sql = "UPDATE user SET name = ?,sdt = ?, dia_chi = ?, email = ?, WHERE id_user = ?";
		$stmt= $db->prepare($sql);
		$stmt->execute([$name, $sdt,$dia_chi, $email, $id]);



	$db = null;
	echo $result;

    
    
 ?>