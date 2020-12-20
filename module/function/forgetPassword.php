<?php 
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    require __DIR__ . '/vendor/autoload.php';

    $options = array(
    	'cluster' => 'ap1',
    	'useTLS' => true
  	);
	$pusher = new Pusher\Pusher(
	    '12ea60284f12037878c4',
	    '77c34fac44d9e3c42cf9',
	    '1107385',
	    $options
	);

    //lấy các giá trị từ bên front
    $username = $_POST['username'];
    $email = $_POST['email'];
    $newpas = md5($_POST['newpas']);

    // $result = "";

    $result = 'ok';

	$check = true;


	// kiểm tra tên đăng nhập
	$stmt = $db->prepare("SELECT * FROM user WHERE username = ? AND email = ?");
	$stmt->execute([$username, $email]);
	$count = $stmt->fetchColumn();
	if ($count > 0) {
		
	} else {
		$result = "Thông tin tài khoản không đúng";
		$check = false;
	}

	
	if ($check) {
		$sql = "UPDATE user set password = ? WHERE username = ? AND email = ?";
		$stmt= $db->prepare($sql);
		$stmt->execute([$newpas, $username, $email]);

		$data['message'] = 'alo';
  		$pusher->trigger('my-channel', 'my-event', $data);
	}

	$db = null;
	echo $result;
	

    
    
 ?>