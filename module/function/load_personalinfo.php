<?php 
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    
    $result = array();


    //truy vấn lấy dữ liệu
    $stmt = $db->prepare("SELECT name, dia_chi, sdt, email FROM user WHERE id_user = ?");
    
    $stmt->execute([$id]);
    $count = $stmt->rowCount();

    if ($count > 0) {
            while ($row = $stmt->fetch()) {
            $result = array(
                'name' => $row['name'],
                'dia-chi' => $row['dia_chi'],
                'sdt' => $row['sdt'],
                'email' => $row['email']
            );
        }
    }
    
    $db = null;

    die(json_encode($result));
    

    

 ?>