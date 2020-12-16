<?php 
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");
    //$id_user = $_SESSION["iduser"];
    $id = isset($_POST['id']) ? $_POST['id'] : 0;
    
    
    $result = array();

    
    $stmt = $db->prepare("SELECT *, COUNT(id_like) AS luot_thich FROM yeu_thich WHERE id_bai_viet = ?");
    
    $stmt->execute([$id]);
    $count = $stmt->rowCount();

	if ($count > 0) {
		    while ($row = $stmt->fetch()) {
		    $result = array(
		    	'luot-thich' => $row["luot_thich"]
	            

	        );
		}
	}
	
	$db = null;

	die(json_encode($result));

?>