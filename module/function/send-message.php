<?php 

	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    require __DIR__ . '/vendor/autoload.php';

    $options = array(
        'cluster' => 'ap1',
        'useTLS' => true
    );
    $pusher = new Pusher\Pusher(
        '7b20795b600d93a462e2',
        '0c1d9739e44d27914e2b',
        '1118902',
        $options
    );


    $message = isset($_POST['message']) ? $_POST['message'] : 0;
    $id_host = isset($_POST['id_host']) ? $_POST['id_host'] : 0;

    if($id_host == 0) {
    	$action = "send";
    	$iduser = $_SESSION['iduser'];
    } else {
    	$action = "receive";
    	$iduser = $id_host;
    }
   	
   	// $vaitro = $_SESSION['vaitro'];

   	$tg_chat = date('Y-m-d');


    $stmt = $db->prepare("INSERT INTO chat(id_host, action, con_chat, chat_date) VALUES(?,?,?,?)");
    $stmt->execute([$iduser, $action, $message, $tg_chat]);

    $data['message'] = $id_host;
    $pusher->trigger('my-channel', 'my-event', $data);

	$db = null;

	echo "ok";

 ?>