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
    $name = $_POST['name'];
    $sdt = $_POST['sdt'];
    $add = $_POST['add'];
    $username = $_POST['username'];
    $pass = md5($_POST['pass']);
    $email = $_POST['email'];
    $vaitro = $_POST['vaitro'];
    $status = 1;
    if ($vaitro == 'host') {
    	$status = 0;
    }

    // $result = "";

    $result = array(
    	"username" => "",
		"sdt" => "",
		"email" => ""
	);

	$check = true;

	$stmt = $db->prepare("SELECT * FROM user WHERE username = ?");
	$stmt->execute([$username]);
	$count = $stmt->fetchColumn();
	if ($count > 0) {
		// $result = $result . "tên đăng nhập đã tồn tại; ";
		$result["username"] = "tên đăng nhập đã tồn tại";
		$check = false;
	}

	$stmt = $db->prepare("SELECT * FROM user WHERE sdt = ?");
	$stmt->execute([$sdt]);
	$count = $stmt->fetchColumn();
	if ($count > 0) {
		// $result = $result .  "số điện thoại đã tồn tại; ";
		$result["sdt"] = "số điện thoại đã tồn tại";
		$check = false;
	}

	$stmt = $db->prepare("SELECT * FROM user WHERE email = ?");
	$stmt->execute([$email]);
	$count = $stmt->fetchColumn();
	if ($count > 0) {
		// $result = $result .  "email đã tồn tại";
		$result["email"] = "email đã tồn tại";
		$check = false;
	}

	if ($check) {
		$sql = "INSERT INTO user (username, password, name, dia_chi, sdt, email, vai_tro, status) VALUES (?,?,?,?,?,?,?,?)";
		$stmt= $db->prepare($sql);
		$stmt->execute([$username, $pass, $name, $add, $sdt, $email, $vaitro, $status]);

		$data['message'] = $status;
  		$pusher->trigger('my-channel', 'my-event', $data);
	}

	$db = null;
	// echo $result;
	die (json_encode($result));
	

    
    
 ?>