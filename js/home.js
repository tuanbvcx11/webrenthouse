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

// hàm viết hoa chữ cái đầu
function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// khi hover vào từng bài (ngoài icon time) thì sẽ chuyển title thành màu xanh
$("body").on("mouseover", ".baidang", function (e) {
  /* Act on the event */
  if (!$(e.target).closest('.favorite').length) {
    $(this).find('.titlePost').css('color', '#427bff');
  }
  
});

$("body").on("mouseout", ".baidang", function (e) {
  /* Act on the event */
  if (!$(e.target).closest('.favorite').length) {
    $(this).find('.titlePost').css('color', 'black');
  }
});

testExprisedPost();
// hàm chuyển ngày
function convertDate (str) {
  var res = str.split('-');
  var year = res[0];
  var month = res[1];
  var day = res[2];
  return day + '-' + month + '-' + year;
}

//hàm tải các bài đăng mới nhất
function load_new_post() {
  $.ajax({
    url: "module/function/load-new-post.php",
    type: "post",
    dataType: "json",
    data: {},
    success: function (result) {
      var loadNewPostHtml = `<label>Danh sách bài đăng mới nhất</label>
                              <div class="container">
                                <div class="row">`;

      $.each(result, function (key, item){
        item.gia_phong = convertPrice(item.gia_phong);

        loadNewPostHtml += `<div class="col-12 col-xl-6 mt-4 d-flex baidang">
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
                                <div class="idPost">`+ item.id_post +`</div>
                                <a class="titlePost" href="#">` + jsUcfirst(item.tieu_de) + `</a>

                                <div class="d-flex address-div">
                                  <div class="address-icon">
                                    <i class="fas fa-map-marker-alt"></i>
                                  </div>
                                  <div class="addressPost"> `+ item.spe_add +`, `+ item.district + `, ` + item.province + ` </div>
                                </div>

                                <div class="d-flex area-div">
                                  <label class="area-icon">
                                    <i class="fas fa-home"></i>
                                  </label>
                                  <div class="areaPost">`+ item.dien_tich +` m<sup>2</sup> </div>
                                </div>

                                <div class="d-flex Prices-div">
                                  <div class="Prices-icon">
                                    <i class="fas fa-coins"></i>
                                  </div>
                                  <div class="Prices">` + item.gia_phong +`</div>
                                </div>

                                <div class="datePost">Ngày đăng: ` + convertDate(item.tg_duyet_bai) + `</div>

                                <div class="favorite">
                                  <i class="far fa-heart`+ item.buttonFav +`"></i>
                                </div>
                              </div>
                            </div>`;
      });
           loadNewPostHtml += `</div>
                            </div>`;
            $(".latest-post").html(loadNewPostHtml);
    },
    error: function (result) {
      alert("lỗi");
    },
  });
}

function load_favorite_post() {
  $.ajax({
    url: "module/function/load-favorite-post.php",
    type: "post",
    dataType: "json",
    data: {},
    success: function (result) {
      var loadFavoritePostHtml = `<label>Danh sách bài đăng được yêu thích nhất</label>
                              <div class="container">
                                <div class="row">`;

      $.each(result, function (key, item){
        item.gia_phong = convertPrice(item.gia_phong);
        if(key == 4) {
          return false;
        }
        loadFavoritePostHtml += `<div class="col-12 col-xl-6 mt-4 d-flex baidang">
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
                                    <div class="idPost">`+ item.id_post +`</div>
                                    <a class="titlePost" href="#">` + jsUcfirst(item.tieu_de) + `</a>

                                    <div class="d-flex address-div">
                                      <div class="address-icon">
                                        <i class="fas fa-map-marker-alt"></i>
                                      </div>
                                      <div class="addressPost"> `+ item.spe_add +`, `+ item.district + `, ` + item.province + ` </div>
                                    </div>

                                    <div class="d-flex area-div">
                                      <div class="area-icon">
                                        <i class="fas fa-home"></i>
                                      </div>
                                      <div class="areaPost">`+ item.dien_tich +` m<sup>2</sup> </div>
                                    </div>

                                    <div class="d-flex Prices-div">
                                      <div class="Prices-icon">
                                        <i class="fas fa-coins"></i>
                                      </div>
                                      <div class="Prices">` + item.gia_phong +`</div>
                                    </div>

                                    <div class="datePost">Ngày đăng: ` + convertDate(item.tg_duyet_bai) + `</div>

                                    <div class="favorite">
                                      <i class="far fa-heart`+ item.buttonFav +`"></i>
                                    </div>
                                  </div>
                                </div>`;
      });
      loadFavoritePostHtml += `</div>
                            </div>`;
            $(".favorite-post").html(loadFavoritePostHtml);
    },
    error: function (result) {
      alert("lỗi");
    },
  });
}

// hàm convert tiền về string
function convertPrice(money) {
  let ans = "";
  if(money >= 1000000000) {
    let billions = parseInt(money/1000000000);
    ans += billions + " tỉ ";
    let millions = parseInt((money - billions*1000000000)/1000000);
    if(millions == 0) {
      return ans;
    }
    ans += millions + " triệu ";
    /* let thousands = parseInt((money - billions*1000000000 - millions*1000000)/1000);
    ans += thousands + " nghìn"; */
  } else if(money >= 1000000) {
    let millions = parseInt(money/1000000);
    ans += millions + " triệu ";
    let thousands = parseInt((money - millions*1000000)/1000);
    if(thousands == 0) {
      return ans;
    }
    ans += thousands + " nghìn";
  } else if(money >= 1000) {
    let thousands = parseInt(money/1000);
    ans += thousands + " nghìn";
  } else {
    return "số tiền nhỏ hơn 1000";
  }
  return ans;
}
$(document).ready(function () {
  // load lại lựa chọn về mặc định
  $("#city").find(":selected").val("Thành phố");
  $("#district").find(":selected").val("Quận(Huyện)");
  $("#minPrices").find(":selected").val("Tất cả");
  $("#maxPrices").find(":selected").val("Tất cả");
  $(".choose-room input[value='Phòng trọ']").prop("checked", false);
  $(".choose-room input[value='Chung cư mini']").prop("checked", false);
  $(".choose-room input[value='Nhà nguyên căn']").prop("checked", false);
  $(".choose-room input[value='Chung cư nguyên căn']").prop("checked", false);
  // ajax lấy các tỉnh trên database
  $.ajax({
    url: "module/function/getprovince.php",
    type: "post",
    dataType: "json",
    data: {},
    success: function (result) {
      var province = '<option value="Thành phố">Thành phố</option>';
      $.each(result, function (key, item) {
        province +=
          '<option value="' + item.name + '">' + item.name + "</option>";
      });

      $("#city").html(province);
    },
    error: function (result) {
      alert("lỗi");
    },
  });
  
  load_new_post();
  load_favorite_post();
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
        var district = '<option value="Quận(Huyện)">Quận/Huyện</option>';
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

  // khi chọn giá thấp nhất
  $("body").on("change", "#minPrices", function(){
    var minprice = $("#minPrices").find(":selected").val();
    if(minprice == "Tất cả") {
      var maxPirceHtml = `<option value="Tất cả">Tất cả</option>
                          <option value="1">1 triệu</option>
                          <option value="3">3 triệu</option>
                          <option value="5">5 triệu</option>
                          <option value="7">7 triệu</option>
                          <option value="10">10 triệu</option>
                          <option value="20">20 triệu</option>`;
    } else if(minprice == "1") {
      var maxPirceHtml = `<option value="1">1 triệu</option>
                          <option value="3">3 triệu</option>
                          <option value="5">5 triệu</option>
                          <option value="7">7 triệu</option>
                          <option value="10">10 triệu</option>
                          <option value="20">20 triệu</option>`;
    } else if(minprice == "3") {
      var maxPirceHtml = `<option value="3">3 triệu</option>
                          <option value="5">5 triệu</option>
                          <option value="7">7 triệu</option>
                          <option value="10">10 triệu</option>
                          <option value="20">20 triệu</option>`;
    } else if(minprice == "5") {
      var maxPirceHtml = `<option value="5">5 triệu</option>
                          <option value="7">7 triệu</option>
                          <option value="10">10 triệu</option>
                          <option value="20">20 triệu</option>`;
    } else if(minprice == "7") {
      var maxPirceHtml = `<option value="7">7 triệu</option>
                          <option value="10">10 triệu</option>
                          <option value="20">20 triệu</option>`;
    } else if(minprice == "10") {
      var maxPirceHtml = `<option value="10">10 triệu</option>
                          <option value="20">20 triệu</option>`;

    } else if(minprice == "20") {
      var maxPirceHtml = `<option value="20">20 triệu</option>`;
    }

    $("#maxPrices").html(maxPirceHtml);
  });


  // khi click vao 1 bài đăng và check nếu ko phải click vào tim
  $("body").on("click", ".baidang", function(even) {
    var id = $(this).find(".idPost").text();
    if (!$(even.target).closest('.favorite').length) {
      alert(id);
    }
  });

  // $("body").on("click", ".img-div", function(even) {
  //   var id = $(this).parent().find(".idPost").text();
  //   alert(id);
  // });

  // sự kiện khi bấm vào tim
  $("body").on("click", ".favorite", function(even) {
    var id = $(this).parent().find(".idPost").text();
    var icon = $(this).children('i');
    
    var tim;
    $.ajax({
      url: "module/function/click-button-like.php",
      type: "post",
      dataType: "json",
      data: {
        idpost: $(this).parent().find(".idPost").text()
      },
      success: function (result) {
        if(result['alert'] == "đã lưu") {
          /* tim = "đã lưu";
          alert(id + " " + tim);
          icon.addClass('fas'); */
          load_new_post();
          load_favorite_post();
        } else if(result['alert'] == "hủy lưu") {
          /* tim = "hủy lưu";
          alert(id + " " + tim);
          icon.removeClass('fas'); */
          load_new_post();
          load_favorite_post();
        } else if(result['alert'] == "chưa đăng nhập") {
          alert("bạn cần đăng nhập để lưu bài đăng");
        }
        
        
      },
      error: function(result) {
        alert("lỗi lưu yêu thích");
      }
    });
/* 
    if ($(this).children("i").hasClass("fas")) {
      $(this).children("i").removeClass("fas");

    } else {
      $(this).children("i").addClass("fas");
    } */

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
    if(type_room === undefined) {
      type_room = "Tất cả"
    }

    //chọn giá thấp nhất
    var minprice = $("#minPrices").find(":selected").val();

    //chọn giá cao nhất
    var maxprice = $("#maxPrices").find(":selected").val();

    //in kết quả
    alert(
      city + " " + district + " " + type_room + " " + minprice + " " + maxprice
    );

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
        page: "1"
      },
      success: function (result) {
        if(result == "ok") {
          location.assign("./home-search.html");

        }
      },
      error: function (result) {
        alert("lỗi tìm kiếm");
      },
    });
  });
});
