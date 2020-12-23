// kiểm tra xem có đủ quyền vào trang không?
function validHost() {
  $.ajax({
    url: "module/function/valid-host.php",
    type: "post",
    dataType: "text",
    data: {},
    success: function (result) {
      if (result == "ok") {
      } else {
        location.assign("./home.html");
        return false;
      }
    },
    error: function (result) {
      alert("lỗi tài khoản hợp lệ");
    },
  });
}
validHost();
// hàm biến đổi ngày
function convertDate (str) {
  var res = str.split('-');
  var year = res[0];
  var month = res[1];
  var day = res[2];
  return day + '-' + month + '-' + year;
}
// hàm convert tiền về string
function convertPrice(money) {
  let ans = "";
  if (money >= 1000000000) {
    let billions = parseInt(money / 1000000000);
    ans += billions + " tỉ ";
    let millions = parseInt((money - billions * 1000000000) / 1000000);
    if (millions == 0) {
      return ans;
    }
    ans += millions + " triệu ";
    /* let thousands = parseInt((money - billions*1000000000 - millions*1000000)/1000);
      ans += thousands + " nghìn"; */
  } else if (money >= 1000000) {
    let millions = parseInt(money / 1000000);
    ans += millions + " triệu ";
    let thousands = parseInt((money - millions * 1000000) / 1000);
    if (thousands == 0) {
      return ans;
    }
    ans += thousands + " nghìn";
  } else if (money >= 1000) {
    let thousands = parseInt(money / 1000);
    ans += thousands + " nghìn";
  } else {
    return "số tiền nhỏ hơn 1000";
  }
  return ans;
}
// kiểm tra bài đăng đã hết hạn hay chưa
function testExprisedPost() {
  $.ajax({
    url: "module/function/testExprisedPost.php",
    type: "post",
    dataType: "text",
    data: {},
    success: function (result) { 
      if(result == "ok") {
      }
    },
    error: function(result) {
      alert("không thể update dữ liệu");
    }
  });
}

testExprisedPost();


$(document).ready(function () {
  var idPost;
  var action;
  var indexPost;
  var inputgiahan;

  // kiểm tra xem có đủ quyền vào trang không?
  /* validHost(); */

  // hàm load các bài viết
  function load_post_table() {
    var type = $("#listingStatus").val();
    // gửi type lên server để hiển thị các bài viết có loại đó
    $.ajax({
      url: "module/function/danh_sach_dang_bai.php",
      type: "post",
      dataType: "json",
      data: {
        type: $("#listingStatus").val(),
      },
      success: function (result) {
        if (type == "Đã duyệt") {
          var html = `<table
                        class="table table-hover table-striped tableApproved"
                      >
                        <thead class="thead-dark border border-secondary">
                          <tr>
                            <th scope="col" width="5%">ID</th>
                            <th scope="col" width="43%">Bài đăng</th>
                            <th scope="col" width="15%">Yêu thích</th>
                            <th scope="col" width="12%">Thời gian duyệt</th>
                            <th scope="col" width="15%">Thời gian hiển thị</th>
                            <th scope="col" width="10%%">Chức năng</th>
                          </tr>
                        </thead>
                        <tbody class="bodyPost">`;
          $.each(result, function (key, item) {
            var index = key + 1;
            html +=
              `<tr>
                          <td><span>`+index+`</span><div class="idPost">` +  item.id_post + `</div></td>
                          <td> <div class="tieude">` + item.tieu_de + `</div>
                          <div class="chitiet"><i class="fas fa-map-marked-alt mr-1"></i>`+ item.spe_add +`, `+ item.district + `, ` + item.province +  `</div>
                          <div class="Prices"><i class="fas fa-coins mr-1"></i>`+ convertPrice(item.gia_phong) +`</td>
                          <td>` + item.yeu_thich + `</td>
                          <td>` + convertDate(item.tg_duyet_bai) + `</td>
                          <td>` + item.tg_hien_thi + `</td>
                          <td class="d-flex">
                            <button
                              type="button"
                              class="btn btn-primary p-1 m-auto detailButton"
                              id="detailButton"
                            >
                              Xem
                            </button>
                          </td>
                    </tr>`;
          });

          html += `</tbody>
                </table>`;
        } else if (type == "Chưa duyệt") {
          var html = `<table
                        class="table table-hover table-striped tableUnapproved"
                      >
                        <thead class="thead-dark border border-secondary">
                          <tr>
                            <th scope="col" width="5%">ID</th>
                            <th scope="col" width="50%">Bài đăng</th>
                            <th scope="col" width="17%">Thời gian đăng</th>
                            <th scope="col" width="15%">Thời gian hiển thị</th>
                            <th scope="col" width="13%">Chức năng</th>
                          </tr>
                        </thead>
                        <tbody class="bodyPost">`;
          $.each(result, function (key, item) {
            var index = key + 1;
            html +=
              `<tr>
                          <td><span>`+index+`</span><div class="idPost">` +  item.id_post + `</div></td>
                          <td> <div class="tieude">` + item.tieu_de + `</div>
                          <div class="chitiet"><i class="fas fa-map-marked-alt mr-1"></i>`+ item.spe_add +`, `+ item.district + `, ` + item.province + `</div>
                          <div class="Prices"><i class="fas fa-coins mr-1"></i>`+ convertPrice(item.gia_phong) +`</td>
                          <td>` + convertDate(item.tg_dang_bai )+ `</td>
                          <td>` + item.tg_hien_thi + `</td>
                          <td class="d-flex pl-3">
                            <button
                              type="button"
                              class="btn btn-primary p-1 mr-1 editButton"
                              id="editButton"
                            >
                              Chỉnh sửa
                            </button>
                            <button
                              type="button"
                              class="btn btn-secondary p-1 eraseButton"
                              data-toggle="modal"
                              data-target="#eraseModal"
                            >
                              Xóa
                            </button>
                          </td>
                      </tr>`;
          });

          html += `</tbody>
                </table>`;
        } else if (type == "Hết hạn") {
          
          var html = `<table
                        class="table table-hover table-striped tableExpired"
                      >
                        <thead class="thead-dark border border-secondary">
                          <tr>
                            <th scope="col" width="5%">ID</th>
                            <th scope="col" width="52%">Bài đăng</th>
                            <th scope="col" width="15%">Yêu thích</th>
                            <th scope="col" width="12%">Thời gian đăng</th>
                            <th scope="col" width="16%">Chức năng</th>
                          </tr>
                        </thead>
                        <tbody class="bodyPost">`;
          $.each(result, function (key, item) {
            var index = key + 1;
            html +=
              `<tr>
                          <td><span>`+index+`</span><div class="idPost">` +  item.id_post + `</div></td>
                          <td> <div class="tieude">` + item.tieu_de + `</div>
                          <div class="chitiet"><i class="fas fa-map-marked-alt mr-1"></i>`+ item.spe_add +`, `+ item.district + `, ` + item.province + `</div>
                          <div class="Prices"><i class="fas fa-coins mr-1"></i>`+ convertPrice(item.gia_phong) +`</td>
                          <td>` +item.yeu_thich +`</td>
                          <td>` +convertDate(item.tg_dang_bai) +`</td>
                          
                          <td class="d-flex pl-3">
                            <button
                              type="button"
                              class="btn btn-primary p-1 mr-1 detailButton"
                              id="detailButton"
                            >
                              Xem
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary p-1 mr-1 validateButton"
                              id="validateButton"
                              data-toggle="modal"
                              data-target="#validateModal"
                            >
                              Gia hạn
                            </button>
                            <button
                              type="button"
                              class="btn btn-secondary p-1 eraseButton"
                              data-toggle="modal"
                              data-target="#eraseModal"
                            >
                              Xóa
                            </button>
                          </td>
                      </tr>`;
          });

          html += `</tbody>
                </table>`;
        }
        $(".each-post").html(html);

        if ($(".each-post .bodyPost").html() == "") {
          html = "<tr>";
          html +=
            '<td colspan="6" class="justify-content-center">' +
            "<h5>Không có bài viết nào</h5>" +
            "</td>";
          html += "<tr>";
          $(".each-post .bodyPost").html(html);
        }
      },
      error: function (result) {
        alert("không thể load bảng");
      },
    });
  }

  load_post_table();

  $("#listingStatus").change(function () {
    testExprisedPost();
    load_post_table();
  });

  $("body").on("click", ".bodyPost button", function () {
    idPost = $(this).parent().parent().children().children(".idPost").text();
    indexPost = $(this).parent().parent().children().children("span").text();
    if ($(this).hasClass("detailButton")) {
      location.assign("./chi_tiet.html");
    } else if ($(this).hasClass("editButton")) {
      location.assign("./chinh_sua_bai_dang.html");
    } else if ($(this).hasClass("eraseButton")) {
      $("#eraseModal .modal-body").text(
        "Bạn xác nhận xóa bài đăng số " + indexPost + " này?"
      );
    } else {
      $("#validateModal .modal-title").text(
        "Gia hạn bài đăng số " + indexPost + ":"
      );
      $("#validateModal input").val("");
    }
  });

  // cập nhật thông báo lên database và xử lý ajax khi xác nhận xóa
  function updateErase(idPost, action) {
    action = "xoa";
    // body...
    // gọi ajax để update idpost với action
    $.ajax({
      url: "module/function/erase-post-host.php",
      type: "post",
      dataType: "text",
      data: {
        idpost: idPost,
      },
      success: function (result) {
        var thongbao = "";
        if (action == "xoa") {
          thongbao = "Xóa thành công";
        }
        if (result == "ok") {
          alert(thongbao);
        }
        // load lại bảng
        load_post_table();
      },
      error: function (result) {
        alert("sai");
      },
    });
  }

  //cập nhật thông báo khi điền vào input gia hạn, xử lý ajax xóa rồi đưa bài vào bảng chưa duyệt
  function updateGiahan(idPost, action, inputgiahan) {
   /*  alert(action + " " + idPost + " " + inputgiahan); */
    $.ajax({
      url: "module/function/giahan-post-host.php",
      type: "post",
      dataType: "text",
      data: {
        idpost: idPost,
        inputgiahan: inputgiahan,
      },
      success: function (result) {
        var thongbao = "";
        if (action == "giahan") {
          thongbao = "giahan thành công";
        }
        if (result == "ok") {
          alert(thongbao);
        }
        // load lại bảng
        load_post_table();
      },
      error: function (result) {
        alert("lỗi");
      },
    });
  }

  $("#eraseModal .btn-primary").click(function (event) {
    action = "xoa";
    //gửi thông báo xóa post bằng ajax
    updateErase(idPost);
    $("#eraseModal").hide();
  });

  $("#validateModal .btn-primary").click(function (event) {
    action = "giahan";
    inputgiahan = $("#thoi_gian_gia_han").val();
    // chuyển post sang bảng chưa duyệt rồi xóa post
    updateGiahan(idPost, action, inputgiahan);
  });
});

/* nút gia hạn 
bấm xác nhận thì phải láy val của input và gửi ajax cập nhật input 
rồi đua baif viết lên phần chưa duyệt
load lại bảng
*/
/* nút xóa
xóa rồi load lại bảng */

/* bàn lại phần gia hạn */
