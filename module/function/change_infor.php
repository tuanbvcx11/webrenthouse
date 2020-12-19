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
    $result = '';
    if ($_SESSION["iduser"] == $id){
            $stmt= $db->prepare("UPDATE user SET name = ?,sdt = ?, dia_chi = ?, email = ? WHERE id_user = ?");
            $stmt->execute([$name, $sdt, $dia_chi, $email, $id]);
            $result = "Thành công";
    } else {
        $result = "Thất bại";
    }
	

	$db = null;
	echo $result;

    
    
 ?>