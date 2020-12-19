
<?php
/* khi bấm vào button trái tim thì sẽ kiểm tra rồi thêm hoặc xóa kết quả trên bảng yeu_thich  */ 
    session_start();
    header('Content-Type: text/html; charset=UTF-8');
    include_once("config.php");

    $iduser = isset($_SESSION["iduser"]) ? $_SESSION["iduser"] : 0;
    $idpost = isset($_POST['idpost']) ? $_POST['idpost'] : 0;
    /* $result = "chưa đăng nhập"; */
    $result = array(
      'alert' => "chưa đăng nhập"
    );
    /* echo "test" . $result; */

    if($iduser != 0) {
      $stmt = $db->prepare("SELECT * FROM yeu_thich WHERE id_bai_viet = ? AND id_user = ?");
      $stmt->execute([$idpost, $iduser]);
      $count = $stmt->rowCount();

      if($count > 0) {
        $result['alert'] = "hủy lưu";
        $eraseFav = $db->prepare("DELETE FROM yeu_thich WHERE id_bai_viet = ? AND id_user = ?");
        $eraseFav->execute([$idpost, $iduser]);

      } else {
        $result['alert'] = "đã lưu";
        $addFav = $db->prepare("INSERT INTO yeu_thich ( id_bai_viet, id_user) VALUES (?, ?)");
        $addFav->execute([$idpost, $iduser]);
      }

    }

    $db = null;
    die(json_encode($result));
?>