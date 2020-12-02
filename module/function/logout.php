<?php 
	session_start();


	unset($_SESSION['iduser']);
	unset($_SESSION['vaitro']);
	header("location: ../../home.html");
 ?>