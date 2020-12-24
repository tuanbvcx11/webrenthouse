<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    //lấy các giá trị từ bên front
    $id = $_POST['id'];
    $pass = md5($_POST['pass']);
    
    $result = '';
    if ($_SESSION["iduser"] == $id){
            $stmt= $db->prepare("UPDATE user SET password = ? WHERE id_user = ?");
            $stmt->execute([$pass, $id]);
            $result = "Thành công";
    } else {
        $result = "Thất bại";
    }
	

	$db = null;
	echo $result;

    
    
 ?>