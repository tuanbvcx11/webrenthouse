<?php 

	// lấy chủ trọ có nhiều bài viết nhất
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $result = array();

	$stmt = $db->prepare("SELECT user.name, user.username, COUNT(*) AS totalpost FROM user JOIN post ON user.id_user = post.id_user WHERE user.id_user != 1 GROUP BY user.id_user ORDER BY totalpost DESC LIMIT 1");
	$stmt->execute();
	$count = $stmt->rowCount();
	if ($count > 0) {
		$row = $stmt->fetch();
	    $result = array(
            'name' => $row['name'],
            'username' => $row['username'],
            'totalpost' => $row['totalpost']
        );
		
	}

	$db = null;

	die(json_encode($result))
	
 ?>