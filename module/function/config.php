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
	// $count = $stmt->fetchColumn();
	// echo $count;
	// while ($row = $stmt->fetch()) {
	//     echo $row['username']."<br />\n";
	// }

	// //Đóng kết nối cơ sở dữ liệu
	// echo "oke nha";


	// $name = 'lê minh tuấn';
 //    $sdt = '0987654321';
 //    $add = '70 ngách 332/7 Hoàng Công Chất';
 //    $username = 'tuancules';
 //    $pass = '123123';
 //    $email = 'tuancules24@gmail.com';
 //    $vaitro = 'host';
 //    $status = 1;

	// $sql = "INSERT INTO user (username, password, name, dia_chi, sdt, email, vai_tro, status) VALUES (?,?,?,?,?,?,?,?)";
	// $stmt= $db->prepare($sql);
	// $stmt->execute([$username, $pass, $name, $add, $sdt, $email, $vaitro, $status]);

 ?>
