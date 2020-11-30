$(document).ready(function () {
  var pageNumber;

  /* tải danh sách bài đăng */
  function load_post(pageNumber) {
    /* tải danh sách các bài đăng */
    //action

    /* thông báo */
    pageNumber = $(".currPage").text();
    alert("page number: " + pageNumber);
  }
  load_post();

  /* click vào << */
  $(".goPageHead").click(function (event) {
    pageNumber = $(".currPage").text();
    if (pageNumber == 1) {
      alert("không có trang nào trước trang 1");
      return false;
    }

    load_post();
  });

  /* click vào < */
  $(".previus").click(function (event) {
    pageNumber = $(".currPage").text();
    if (pageNumber == 1) {
      alert("không có trang nào trước trang 1");
      return false;
    }
    load_post();
  });

  /* click vào >> */
  $(".goPageTail").click(function (event) {
    pageNumber = $(".currPage").text();
    // kiểm tra có phải trang cuối cùng không?
    /* action */

    /* đến trang cuối */
    load_post();
  });

  /* click vào > */
  $(".next").click(function (event) {
    pageNumber = $(".currPage").text();
    // kiểm tra có phải trang cuối cùng không?
    /* action */

    /* về trang trước trang hiện tại nếu pageNumber != 1 */
    load_post();
  });

  $(".titlePost").click(function (event) {
    var id = $(this).parent().find(".idPost").text();
    alert(id);
  });

  $(".img-div").click(function (event) {
    var id = $(this).parent().find(".idPost").text();
    alert(id);
  });

  /*yêu thích và lưu tin*/
  $(".favorite").click(function (event) {
    var id = $(this).parent().find(".idPost").text();
    var tim;
    if ($(this).children("i").hasClass("fas")) {
      $(this).children("i").removeClass("fas");
      tim = "hủy lưu";
    } else {
      $(this).children("i").addClass("fas");
      tim = "đã lưu";
    }
    alert(id + " " + tim);
    /*
          var id = $(this).parent().find('.idPost').text();
          alert(id);
          */
  });

  /*tìm kiếm*/
  $("#submit").click(function (event) {
    //chọn tỉnh/thành phố
    var city = $("#city").find(":selected").val();

    //chọn quận/huyện
    var district = $("#district").find(":selected").val();

    //chọn loại phòng
    var type_room;
    var checkbox = $("[name=type_room]");

    // Lặp qua từng checkbox để lấy giá trị
    for (var i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked === true) {
        type_room = checkbox[i].value;
      }
    }
    //chọn giá thấp nhất
    var minprice = $("#minPrices").find(":selected").val();

    //chọn giá cao nhất
    var maxprice = $("#maxPrices").find(":selected").val();

    //in kết quả
    alert(
      city + " " + district + " " + type_room + " " + minprice + " " + maxprice
    );
  });

  /* phần chọn trang */
  /* khi hover vào nút << */
  $(".goPageHead").hover(function (event) {
    if ($(".currPage").text() == 1) {
      $(this).css("cursor", "not-allowed");
    }
  });
  /* khi hover vào nút < */
  $(".previus").hover(function (event) {
    if ($(".currPage").text() == 1) {
      $(this).css("cursor", "not-allowed");
    }
  });
  /* khi hover vào nút > */
  $(".next").hover(function (event) {
    /* action */
  });
  /* khi hover vào nút >> */
  $(".goPageTail").hover(function (event) {
    /* action */
  });
});
