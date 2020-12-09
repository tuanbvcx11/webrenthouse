<?php 

    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    if(isset($_POST['id_host'])) {
        $iduser = $_POST['id_host'];
    } else $iduser = $_SESSION['iduser'];

    $result = array();

    $stmt = $db->prepare("SELECT * FROM chat c JOIN user u on c.id_host = u.id_user WHERE id_host = ?");
    $stmt->execute([$iduser]);

    $count = $stmt->rowCount();
    if ($count > 0) {
        while ($row = $stmt->fetch()) {
            $result[] = array(
                'name' => $row['name'],
                'host' => $row['id_host'],
                'action' => $row['action'],
                'message' => $row['con_chat']
            );
        }
    }

    $db = null;

    die(json_encode($result));

 ?>