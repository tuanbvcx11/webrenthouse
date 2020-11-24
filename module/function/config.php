<?php 
	
	// mở kết nối để database
	$dsn = "mysql:host=localhost;dbname=webrenthouse;";
	$db_user = 'root';
	$db_pass = '';
	$db = new PDO($dsn, $db_user, $db_pass);

	// $ad = 'admin';

	// $stmt = $db->prepare("SELECT * FROM user WHERE username = ?");
	// $stmt->execute([$ad]); 
	// //Các thao tác cơ sở dữ liệu: truy vấn, cập nhật
	// // $stmt = $db->query("SELECT * FROM user where username = 'alo'");
	// while ($row = $stmt->fetch()) {
	//     echo $row['username']."<br />\n";
	// }

	// //Đóng kết nối cơ sở dữ liệu
	// echo "oke nha";


	// $name = 'admin1';
	// $surname = 'tuancules';
	// $sex = '0912345678';

	// $sql = "INSERT INTO user (name, username, sdt) VALUES (?,?,?)";
	// $stmt= $db->prepare($sql);
	// $stmt->execute([$name, $surname, $sex]);

 ?>
