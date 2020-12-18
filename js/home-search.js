// kiểm tra bài đăng đã hết hạn hay chưa
function testExprisedPost() {
  $.ajax({
    url: "module/function/testExprisedPost.php",
    type: "post",
    dataType: "text",
    data: {},
    success: function (result) {
      if (result == "ok") {
      }
    },
    error: function (result) {
      alert("không thể update dữ liệu");
    },
  });
}

testExprisedPost();
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
//hàm hiển thị dữ liệu các bài post lấy input từ session
function load_post() {
  //kiểm tra hết hạn
  testExprisedPost();
   // load bài đăng
   $.ajax({
    url: "module/function/find-post.php",
    type: "post",
    dataType: "json",
    data: {
    },
    success: function (result) {
      var postHtml = `<label>Thuê nhà đất 2020 giá rẻ tại Việt Nam, giá thuê mới nhất</label>
                        <div class="list-table">`;
      $.each(result, function (key, item) {
        // item.gia_phong = convertPrice(item.gia_phong);
        postHtml +=
          `<div class="d-flex baidang">
                        <!-- ảnh -->
                        <div class="img-div">
                          <a class="link-img" href="#">
                            <img
                              class="img-post"
                              src="./upload/` + item.img + `"
                              alt=""
                            />
                          </a>
                        </div>
                        <!-- tóm tắt -->
                        <div class="brief-div">
                          <span class="idPost">` + item.id_post + `</span>
                          <a class="titlePost" href="#">` + item.tieu_de + `</a>

                          <div class="d-flex address-div">
                            <div class="mr-1 address-icon">
                              <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="addressPost"> ` + item.spe_add + ` </div>
                          </div>

                          <div class="d-flex Prices-div">
                            <div class="mt-1 mr-1 Prices-icon">
                              <i class="fas fa-coins"></i>
                            </div>
                            <div class="Prices">` + convertPrice(item.gia_phong) + `</div>
                          </div>

                          <div class="datePost">Ngày đăng: ` + item.tg_duyet_bai + `</div>

                          <div class="d-flex telephone-div">
                            <div class="mr-1 telephone-icon">
                              <i class="fas fa-mobile-alt"></i>
                            </div>
                            <div class="telephone">` + item.tel + `</div>
                          </div>
                        </div>
                        <div class="favorite">
                          <i class="far fa-heart` + item.buttonFav + `"></i>
                        </div>
                      </div>`;
      });
      postHtml += `</div>
                </div>`;
      // lấy số trang trong biến session
      $.ajax({
        url: "module/function/fetch-current-page-number.php",
        type: "post",
        dataType: "text",
        data: {},
        success: function (result) {
          var pagingHTML = `<div class="d-flex justify-content-center paging-bar">
                          <ul class="list-group list-group-horizontal">
                            <!-- nút đến page 1 -->
                            <li class="list-group-item pt-2 goPageHead">
                              <i class="fas fa-angle-double-left"></i>
                            </li>
                            <!-- nút đến page trước curr -->
                            <li class="list-group-item pt-2 previus">
                              <i class="fas fa-caret-left"></i>
                            </li>
                            <li class="list-group-item pt-2 currPage">` + result + `</li>
                            <!-- nút đến page sau curr -->
                            <li class="list-group-item pt-2 next">
                              <i class="fas fa-caret-right"></i>
                            </li>
                            <!-- nút đến page cuối cùng -->
                            <li class="list-group-item pt-2 goPageTail">
                              <i class="fas fa-angle-double-right"></i>
                            </li>
                          </ul>
                        </div>`;
            $(".post-content").html(postHtml);
            $(".paging").html(pagingHTML);
        },
        error: function (result) {
          alert("không thể update dữ liệu");
        },
      });
      

      
    },
    error: function (result) {
      alert("lỗi tìm kiếm");
    },
  });
}
// gửi số trang lên để lưu trong session
function save_page_number(pageNumber) {
  $.ajax({
    url: "module/function/save-page-number-to-session.php",
    type: "post",
    dataType: "text",
    data: {
      page: pageNumber
    },
    success: function (result) {

    },
    error: function (result) {
      alert("không thể update page number");
    },
  });
}

// tính tổng số bài tìm kiếm được rồi tải bài đăng của từng trang
function load_post_per_page(pageNumber) {
  $.ajax({
    url: "module/function/count-total-page.php",
    type: "post",
    dataType: "text",
    data: {},
    success: function (result) {
      if (result > 0) {
        // số trang một bài(nếu chỉnh thì phải chỉnh cả trong find-post.php)
        var post_per_page = 8;
        var totalPost = result;
        var totalPage = Math.ceil(totalPost / post_per_page);

        if(pageNumber <= totalPage) {
          save_page_number(pageNumber);
          load_post();
        } else {
          
        }
      } else if(result == 0) {
        alert("không có kết quả tìm kiếm nào phù hợp")
      }
    },
    error: function (result) {
      alert("không thể update dữ liệu");
    },
  });
}

$(document).ready(function () {
  var pageNumber;
  // ajax lấy input tìm kiếm trên session
  $.ajax({
    url: "module/function/fetch-input-from-session.php",
    type: "post",
    dataType: "json",
    data: {},
    success: function (result) {
      var citySession = result["citySearch"];
      var districtSession = result["districtSearch"];
      var type_roomSession = result["type_roomSearch"];
      var minpriceSession = result["minpriceSearch"];
      var maxpriceSession = result["maxpriceSearch"];

      // ajax lấy các tỉnh trên database
      $.ajax({
        url: "module/function/getprovince.php",
        type: "post",
        dataType: "json",
        data: {},
        success: function (result) {
          var province = '<option value="Thành phố" hidden>Thành phố</option>';
          $.each(result, function (key, item) {
            province +=
              '<option value="' + item.name + '">' + item.name + "</option>";
          });

          $("#city").html(province);
          $("#city").val(citySession);

          // khi chọn 1 tỉnh thì sẽ hiện các huyện của tỉnh đó
          $.ajax({
            url: "module/function/getdistrict.php",
            type: "post",
            dataType: "json",
            data: {
              province: $("#city").val(),
            },
            success: function (result) {
              var district =
                '<option value="Quận(Huyện)" hidden>Quận/Huyện</option>';
              $.each(result, function (key, item) {
                district +=
                  '<option value="' +
                  item.prefix +
                  " " +
                  item.name +
                  '">' +
                  item.prefix +
                  " " +
                  item.name +
                  "</option>";
              });

              $("#district").html(district);
              $("#district").val(districtSession);
            },
            error: function (result) {
              alert("lỗi");
            },
          });
        },
        error: function (result) {
          alert("lỗi");
        },
      });

      //hiển thị dữ liệu phần select phòng
      if (type_roomSession == "Phòng trọ") {
        $(".choose-room input[value='Phòng trọ']").prop("checked", true);
      } else if (type_roomSession == "Chung cư mini") {
        $(".choose-room input[value='Chung cư mini']").prop("checked", true);
      } else if (type_roomSession == "Nhà nguyên căn") {
        $(".choose-room input[value='Nhà nguyên căn']").prop("checked", true);
      } else if (type_roomSession == "Chung cư nguyên căn") {
        $(".choose-room input[value='Chung cư nguyên căn']").prop(
          "checked",
          true
        );
      }

      // hiển thị phần giá min và max
      $("#minPrices").val(minpriceSession);
      if (minpriceSession == "Tất cả") {
        var maxPirceHtml = `<option value="Tất cả">Tất cả</option>
                            <option value="1">1 triệu</option>
                            <option value="3">3 triệu</option>
                            <option value="5">5 triệu</option>
                            <option value="7">7 triệu</option>
                            <option value="10">10 triệu</option>
                            <option value="20">20 triệu</option>`;
      } else if (minpriceSession == "1") {
        var maxPirceHtml = `<option value="1">1 triệu</option>
                            <option value="3">3 triệu</option>
                            <option value="5">5 triệu</option>
                            <option value="7">7 triệu</option>
                            <option value="10">10 triệu</option>
                            <option value="20">20 triệu</option>`;
      } else if (minpriceSession == "3") {
        var maxPirceHtml = `<option value="3">3 triệu</option>
                            <option value="5">5 triệu</option>
                            <option value="7">7 triệu</option>
                            <option value="10">10 triệu</option>
                            <option value="20">20 triệu</option>`;
      } else if (minpriceSession == "5") {
        var maxPirceHtml = `<option value="5">5 triệu</option>
                            <option value="7">7 triệu</option>
                            <option value="10">10 triệu</option>
                            <option value="20">20 triệu</option>`;
      } else if (minpriceSession == "7") {
        var maxPirceHtml = `<option value="7">7 triệu</option>
                            <option value="10">10 triệu</option>
                            <option value="20">20 triệu</option>`;
      } else if (minpriceSession == "10") {
        var maxPirceHtml = `<option value="10">10 triệu</option>
                            <option value="20">20 triệu</option>`;
      } else if (minpriceSession == "20") {
        var maxPirceHtml = `<option value="20">20 triệu</option>`;
      }

      $("#maxPrices").html(maxPirceHtml);
      $("#maxPrices").val(maxpriceSession);

      // tải page trên session
      $.ajax({
        url: "module/function/fetch-current-page-number.php",
        type: "post",
        dataType: "text",
        data: {},
        success: function (result) {
          load_post_per_page(result);
        },
        error: function (result) {
          alert("không thể update dữ liệu");
        },
      });
      
      /* load_post();  */
    },
    error: function (result) {
      alert("lỗi lấy input từ session");
    },
  });

  // khi chọn 1 tỉnh thì sẽ hiện các huyện của tỉnh đó
  $("body").on("change", "#city", function () {
    $.ajax({
      url: "module/function/getdistrict.php",
      type: "post",
      dataType: "json",
      data: {
        province: $(this).val(),
      },
      success: function (result) {
        var district = '<option value="Quận(Huyện)" hidden>Quận/Huyện</option>';
        $.each(result, function (key, item) {
          district +=
            '<option value="' +
            item.prefix +
            " " +
            item.name +
            '">' +
            item.prefix +
            " " +
            item.name +
            "</option>";
        });

        $("#district").html(district);
      },
      error: function (result) {
        alert("lỗi");
      },
    });
  });

  // khi chọn giá ở phần giá thấp nhất
  $("body").on("change", "#minPrices", function () {
    var minprice = $("#minPrices").find(":selected").val();
    if (minprice == "Tất cả") {
      var maxPirceHtml = `<option value="Tất cả">Tất cả</option>
                          <option value="1">1 triệu</option>
                          <option value="3">3 triệu</option>
                          <option value="5">5 triệu</option>
                          <option value="7">7 triệu</option>
                          <option value="10">10 triệu</option>
                          <option value="20">20 triệu</option>`;
    } else if (minprice == "1") {
      var maxPirceHtml = `<option value="1">1 triệu</option>
                          <option value="3">3 triệu</option>
                          <option value="5">5 triệu</option>
                          <option value="7">7 triệu</option>
                          <option value="10">10 triệu</option>
                          <option value="20">20 triệu</option>`;
    } else if (minprice == "3") {
      var maxPirceHtml = `<option value="3">3 triệu</option>
                          <option value="5">5 triệu</option>
                          <option value="7">7 triệu</option>
                          <option value="10">10 triệu</option>
                          <option value="20">20 triệu</option>`;
    } else if (minprice == "5") {
      var maxPirceHtml = `<option value="5">5 triệu</option>
                          <option value="7">7 triệu</option>
                          <option value="10">10 triệu</option>
                          <option value="20">20 triệu</option>`;
    } else if (minprice == "7") {
      var maxPirceHtml = `<option value="7">7 triệu</option>
                          <option value="10">10 triệu</option>
                          <option value="20">20 triệu</option>`;
    } else if (minprice == "10") {
      var maxPirceHtml = `<option value="10">10 triệu</option>
                          <option value="20">20 triệu</option>`;
    } else if (minprice == "20") {
      var maxPirceHtml = `<option value="20">20 triệu</option>`;
    }

    $("#maxPrices").html(maxPirceHtml);
  });

  $("body").on("click", ".titlePost", function (even) {
    var id = $(this).parent().find(".idPost").text();
    alert(id);
  });

  $("body").on("click", ".img-div", function (even) {
    var id = $(this).parent().find(".idPost").text();
    alert(id);
  });

  $("body").on("click", ".favorite", function (even) {
    var id = $(this).parent().find(".idPost").text();
    var tim;
    $.ajax({
      url: "module/function/yeu-thich.php",
      type: "post",
      dataType: "text",
      data: {
        idpost: $(this).parent().find(".idPost").text(),
      },
      success: function (result) {
        if (result == "đã lưu") {
          tim = "đã lưu";
          alert(id + " " + tim);
        } else if (result == "hủy lưu") {
          tim = "hủy lưu";
          alert(id + " " + tim);
        } else if (result == "chưa đăng nhập") {
          alert("bạn cần đăng nhập để lưu bài đăng");
        }
      },
      error: function (result) {
        alert("lỗi lưu yêu thích");
      },
    });

    if ($(this).children("i").hasClass("fas")) {
      $(this).children("i").removeClass("fas");
    } else {
      $(this).children("i").addClass("fas");
    }
  });

  /*tìm kiếm*/
  $("body").on("click", "#submit" ,function (event) {
    pageNumber = 1;

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
    if (type_room === undefined) {
      type_room = "Tất cả";
    }

    //chọn giá thấp nhất
    var minprice = $("#minPrices").find(":selected").val();

    //chọn giá cao nhất
    var maxprice = $("#maxPrices").find(":selected").val();

    //in kết quả
    alert( "load-post " + city + " " + district + " " + type_room + " " + minprice + " " + maxprice);

    $.ajax({
      url: "module/function/save-input-to-session.php",
      type: "post",
      dataType: "text",
      data: {
        city: $("#city").find(":selected").val(),
        district: $("#district").find(":selected").val(),
        type_room: type_room,
        minprice: minprice,
        maxprice: maxprice,
        page: pageNumber
      },
      success: function (result) {
        /* load_post(); */
        load_post_per_page(1);
      },
      error: function (result) {
        alert("lỗi tìm kiếm");
      },
    });
  });

  /* phần chọn trang */
  /* khi hover vào nút << */
  $("body").on("mouseover", ".goPageHead" ,function (event) {
    if ($(".currPage").text() == 1) {
      $(this).css("cursor", "not-allowed");
    }
  });
  /* khi hover vào nút < */
  $("body").on("mouseover", ".previus" ,function (event) {
    if ($(".currPage").text() == 1) {
      $(this).css("cursor", "not-allowed");
    }
  });

  /* khi hover vào nút > */
  $("body").on("mouseover", ".next" ,function (event) {
    var pageNumber1 = parseInt($(".currPage").text()) + 1;
    $.ajax({
      url: "module/function/count-total-page.php",
      type: "post",
      dataType: "text",
      data: {},
      success: function (result) {
        if (result > 0) {
          // số trang một bài(nếu chỉnh thì phải chỉnh cả trong find-post.php)
          var post_per_page = 8;
          var totalPost = result;
          var totalPage = Math.ceil(totalPost / post_per_page);
          if(pageNumber1 > totalPage) {
            $(".next").css("cursor", "not-allowed");
          }
        } else if(result == 0) {
          alert("không có kết quả tìm kiếm nào phù hợp")
        }
      },
      error: function (result) {
        alert("không thể update dữ liệu");
      },
    });
  });

  /* khi hover vào nút >> */
  $("body").on("mouseover", ".goPageTail" ,function (event) {
    var pageNumber1 = parseInt($(".currPage").text()) + 1;
    $.ajax({
      url: "module/function/count-total-page.php",
      type: "post",
      dataType: "text",
      data: {},
      success: function (result) {
        if (result > 0) {
          // số trang một bài(nếu chỉnh thì phải chỉnh cả trong find-post.php)
          var post_per_page = 8;
          var totalPost = result;
          var totalPage = Math.ceil(totalPost / post_per_page);
          if(pageNumber1 > totalPage) {
            $(".goPageTail").css("cursor", "not-allowed");
          }
        } else if(result == 0) {
          alert("không có kết quả tìm kiếm nào phù hợp")
        }
      },
      error: function (result) {
        alert("không thể update dữ liệu");
      },
    });
    
  });


  /* click vào << */
  $("body").on("click", ".goPageHead" ,function (event) {
    pageNumber = $(".currPage").text();
    if (pageNumber == 1) {
      alert("không có trang nào trước trang 1");
      return false;
    } else {
      load_post_per_page(1);
    }
  });

  /* click vào < */
  $("body").on("click", ".previus" ,function (event) {
    pageNumber = parseInt($(".currPage").text());
    if (pageNumber == 1) {
      alert("không có trang nào trước trang 1");
      return false;
    } else {
      load_post_per_page(pageNumber - 1);
    }
  });

  /* click vào >> */
  $("body").on("click", ".goPageTail" ,function (event) {
    var pageNumber = parseInt($(".currPage").text());
    $.ajax({
      url: "module/function/count-total-page.php",
      type: "post",
      dataType: "text",
      data: {},
      success: function (result) {
        if (result > 0) {
          // số trang một bài(nếu chỉnh thì phải chỉnh cả trong find-post.php)
          var post_per_page = 8;
          var totalPost = result;
          var totalPage = Math.ceil(totalPost / post_per_page);
          if(pageNumber <= totalPage) {
            load_post_per_page(totalPage);
          }
        } else if(result == 0) {
          alert("không có kết quả tìm kiếm nào phù hợp")
        }
      },
      error: function (result) {
        alert("không thể update dữ liệu");
      },
    });
  });

  /* click vào > */
  $("body").on("click", ".next" ,function (event) {
    var pageNumber = parseInt($(".currPage").text());
    $.ajax({
      url: "module/function/count-total-page.php",
      type: "post",
      dataType: "text",
      data: {},
      success: function (result) {
        if (result > 0) {
          // số trang một bài(nếu chỉnh thì phải chỉnh cả trong find-post.php)
          var post_per_page = 8;
          var totalPost = result;
          var totalPage = Math.ceil(totalPost / post_per_page);
          if(pageNumber <= totalPage) {
            load_post_per_page(pageNumber + 1);
          }
        } else if(result == 0) {
          alert("không có kết quả tìm kiếm nào phù hợp")
        }
      },
      error: function (result) {
        alert("không thể update dữ liệu");
      },
    });
  });
});
