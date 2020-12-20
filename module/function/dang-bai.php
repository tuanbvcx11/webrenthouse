<?php  

	// khởi tạo cái này thì mới dùng được biến session
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    require __DIR__ . '/vendor/autoload.php';

      $options = array(
        'cluster' => 'ap1',
        'useTLS' => true
      );
      $pusher = new Pusher\Pusher(
        'b06168af2fefdf2d1ba2',
        '9ef860455aad59edbbb3',
        '1117334',
        $options
      );
    
    $status_phong = 1; //còn phòng <> 0 là hết phòng
    $status_post = 0; //chưa được duyệt <> 1 là đã duyệt (-1 là bị xóa)

    // lấy id người đăng nhập
    $iduser = $_SESSION["iduser"];

    $tg_dang_bai = date('Y-m-d');

    // nếu người đăng nhập là admin thì cho status_post là 1 (không cần chờ phê duyệt)
    if ($iduser == 1)
    	$status_post = 1;

    if(isset($_POST['submit'])){

    	// khi submit, lấy các dữ liệu mà form gửi lên
    	$province = $_POST['tinh_thanh_pho'];
    	$district = $_POST['quan_huyen'];
    	$spe_add = $_POST['dia_chi_chi_tiet'];
    	$loai_phong = $_POST['loai_phong'];
    	$so_luong_phong = $_POST['so_luong_phong'];
    	$dien_tich = $_POST['dien_tich'];
    	$chung_chu = mb_strtolower($_POST['chung_chu'], 'UTF-8');
    	$bathroom = $_POST['bathroom'];
    	$nong_lanh = mb_strtolower($_POST['nong_lanh'], 'UTF-8');
    	$kitchen = $_POST['kitchen'];
    	$dieu_hoa = mb_strtolower($_POST['dieu_hoa'], 'UTF-8');
    	$ban_cong = mb_strtolower($_POST['ban_cong'], 'UTF-8');
    	$tien_ich_khac = $_POST['tien_ich_khac'];
    	$gia_dien = $_POST['gia_dien'];
    	$gia_nuoc = $_POST['gia_nuoc'];
    	$gia_phong = $_POST['Prices'];
    	$tieu_de = $_POST['postTitle'];
    	$mo_ta = nl2br($_POST['descriptionPost']);
    	$tg_hienthi = $_POST['thoi_gian_dang_bai'];



    	// lấy hết được r thì insert vào fbsql_database ở đây
        if ($iduser != 1) {
            $sql = "INSERT INTO post (id_user, province, district, spe_add, tieu_de, loai_phong, gia_phong, dien_tich, gia_dien, gia_nuoc, so_phong, phong_tam, chung_chu, nong_lanh, bep, dieu_hoa, ban_cong, tien_ich_khac, mo_ta, tg_hien_thi, tg_dang_bai, status_phong, status_post) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            $stmt= $db->prepare($sql);
            $stmt->execute([$iduser, $province, $district, $spe_add, $tieu_de, $loai_phong, $gia_phong, $dien_tich, $gia_dien, $gia_nuoc, $so_luong_phong, $bathroom, $chung_chu, $nong_lanh, $kitchen, $dieu_hoa, $ban_cong, $tien_ich_khac, $mo_ta, $tg_hienthi, $tg_dang_bai, $status_phong, $status_post]);

        } else {
            $tg_duyet_bai = date('Y-m-d');
            $sql = "INSERT INTO post (id_user, province, district, spe_add, tieu_de, loai_phong, gia_phong, dien_tich, gia_dien, gia_nuoc, so_phong, phong_tam, chung_chu, nong_lanh, bep, dieu_hoa, ban_cong, tien_ich_khac, mo_ta, tg_hien_thi, tg_dang_bai, tg_duyet_bai, status_phong, status_post) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            $stmt= $db->prepare($sql);
            $stmt->execute([$iduser, $province, $district, $spe_add, $tieu_de, $loai_phong, $gia_phong, $dien_tich, $gia_dien, $gia_nuoc, $so_luong_phong, $bathroom, $chung_chu, $nong_lanh, $kitchen, $dieu_hoa, $ban_cong, $tien_ich_khac, $mo_ta, $tg_hienthi, $tg_dang_bai, $tg_duyet_bai, $status_phong, $status_post]);
        }
    	
		
        



    	// sau khi insert vào database, sẽ lấy lại id của bài viết vừa insert, để insert vào bảng ảnh
        $stmt = $db->prepare("SELECT * FROM post ORDER BY id_post DESC LIMIT 1");
        $stmt->execute();
        while ($row = $stmt->fetch()) {
            $id_post = $row['id_post'];
        }

        $data['message'] = $id_post;
        $pusher->trigger('my-channel', 'my-event', $data);


    	//ở đây sẽ là ảnh từ form và insert vào bảng ảnh
        $countfiles = count($_FILES['file']['name']);

        // Looping all files
        for($i=0;$i<$countfiles;$i++){
            $filename = $_FILES['file']['name'][$i];

            $stmt = $db->prepare("insert into img(id_bai_viet, img) values (?,?)");
            $stmt->execute([$id_post, $filename]);
            //insert value
            // $sql = 'insert into anh(link) value("'.$filename.'")';
            // mysqli_query($conn, $sql);

            // Upload file
            move_uploaded_file($_FILES['file']['tmp_name'][$i],'../../upload/'.$filename);
        }


    }


?>