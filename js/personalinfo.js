var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
 
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
    
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
//viết hoa chữ cái đầu
function jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
}

//chuyển ngày về dạng dd/mm/yyy
function convertDate (str) {
      var res = str.split('-');
      var year = res[0];
      var month = res[1];
      var day = res[2];
      return day + '-' + month + '-' + year;
    }

var id = getUrlParameter('idUser');
if (id === undefined) {
  var url = window.location.href;
  var str = url.split('user/');
  id = str[1];
}
var page = 1;
var count_post;

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
var load_user = function load_user(){
  $.ajax({
    url : 'module/function/load_personalinfo.php',
    type : 'post',
    dataType : 'json',
    data : {
      id : id
    },
    success : function(result){
      if (result["name"] != null){
        $("#name").text(result["name"]);
        $("#sdt").text(result["sdt"]);
        $(".ho_ten").text(result["name"]);
        $(".dien_thoai").text(result["sdt"]);
        $(".email").text(result["email"]);
        $(".dia_chi").text(result["dia-chi"]);
        $(".inp_name").val(result["name"]);
        $(".inp_sdt").val(result["sdt"]);
        $(".inp_email").val(result["email"]);
        $(".inp_dia_chi").val(result["dia-chi"]);
      } else {
        location.assign("home.html");
      }
    },

    error : function(result){
      alert("lỗi5");
    }
  });
}

var check_user = function check_user(){
  $.ajax({
    url : 'module/function/check_user.php',
    type : 'post',
    dataType : 'text',
    data : {
      id : id
    },
    success : function(result){
        if (result == "owner"){
          $('.change_info').css("display","block");
          $('.change_pass').css("display","block"); 
        }
    },

    error : function(result){
      alert("lỗi5");
    }
  });
}

var load_post = function load_post(){
  $.ajax({
      url : 'module/function/load_post_personalinf.php',
      type : 'post',
      dataType : 'json',
      data : {
        id : id,
        page : page
      },
      
      success : function(result){
        
      var html = '';
          $.each(result, function (key, item){
              
            html += '<div class="d-flex baidang"><div class="img-div">';
            html += '<a class="link-img" href="#"><img class="img-post" src="./upload/'+item.img+'" alt="'+item.tieu_de+'"/></a></div>';
            html += '<div class="brief-div"><span class="idPost">'+item.id_post+'</span><a class="titlePost" href="#">'+item.tieu_de+'</a>';
            html +=`<div class="d-flex area-div">
                            <div class="area-icon">
                              <i class="fas fa-home"></i>
                            </div>
                            <div class="areaPost">`+ item.dien_tich +` m<sup>2</sup> </div>
                          </div>`;
            html += '<div class="d-flex address-div"><div class="mr-1 address-icon"><i class="fas fa-map-marker-alt"></i>';
            html += '</div><div class="addressPost">'+jsUcfirst(item.spe_add)+', '+item.district+', '+item.province+'</div></div>';
            html += '<div class="d-flex Prices-div"><div class="mt-1 mr-1 Prices-icon"><i class="fas fa-coins"></i></div>';
            html += '<div class="Prices">'+convertPrice(item.gia_phong)+'</div></div>';
            html += '<div class="datePost">Ngày đăng: '+convertDate(item.tg_dang_bai)+'</div></div><div class="favorite">';
            if (item.fav == "chualuu"){
              html += '<i class="far fa-heart"></i></div></div>';
            } else {
              html += '<i class="far fa-heart fas"></i></div></div>';
            }
          });
          $('.list-table').html(html);
          
      },
      error : function(result){
        alert("lỗi123");
      }
    });
}
var phan_trang = function phan_trang(){
  $.ajax({
      url : 'module/function/count_post_inf.php',
      type : 'post',
      dataType : 'text',
      data : {
        id : id
      },
      
      success : function(result){
        var count = result;
        count_post = result;
        if (count_post == 0){
          $('.post_none').css("display","block");
          $('.paging').css("display","none");
        } else
        if (count_post > 1){
          if (page.toString() == "1"){
            $('.goPageHead').addClass('disabled');
            $('.previus').addClass('disabled');
            $('.currPage').text("1");
            $('.currPage').addClass('active');
            if ($('.goPageTail').hasClass('disabled')){
              $('.goPageTail').removeClass('disabled')
            }
            if ($('.next').hasClass('disabled')){
              $('.next').removeClass('disabled')
            }
          } else if (page.toString() == count){
            $('.goPageTail').addClass('disabled');
            $('.next').addClass('disabled');
            $('.currPage').text(page.toString());
            $('.currPage').addClass('active');
            if ($('.previus').hasClass('disabled')){
              $('.previus').removeClass('disabled')
            }
            if ($('.goPageHead').hasClass('disabled')){
              $('.goPageHead').removeClass('disabled')
            }
          } else {
            if ($('.goPageHead').hasClass('disabled')){
              $('.goPageHead').removeClass('disabled')
            }
            if ($('.goPageTail').hasClass('disabled')){
              $('.goPageTail').removeClass('disabled')
            }
            if ($('.next').hasClass('disabled')){
              $('.next').removeClass('disabled')
            }
            if ($('.previus').hasClass('disabled')){
              $('.previus').removeClass('disabled')
            }
            $('.currPage').text(page.toString());
            $('.currPage').addClass('active');
          }
        }
        else {
          $('.goPageHead').addClass('disabled');
          $('.previus').addClass('disabled');
          $('.currPage').text("1");
          $('.goPageTail').addClass('disabled');
          $('.next').addClass('disabled');
          $('.currPage').addClass('active');
        }
        
      
      },
      error : function(result){
        alert("lỗi123");
      }
    });

}

var check_guest = function check_guest(){
  $.ajax({
    url : 'module/function/check_guest_info.php',
    type : 'post',
    dataType : 'text',
    data : {
      id : id
    },
    success : function(result){
        if (result == "guest"){
          $('.post-content').css("display","none");
        }
    },

    error : function(result){
      alert("lỗi5");
    }
  });
}

var check_guest_1 = function check_guest_1(){
  $.ajax({
    url : 'module/function/check_status_info.php',
    type : 'post',
    dataType : 'text',
    data : {
      id : id
    },
    success : function(result){
        if (result == "chuaduyet"){
          location.assign("trotot.com/home");
        }
    },

    error : function(result){
      alert("lỗi5");
    }
  });
}
$(document).ready(function(){
  load_user();
  check_user();
  check_guest();
  check_guest_1()
  load_post();
  phan_trang();

});


$("body").on("click", ".paging .paging-bar .next", function(){
            page = page + 1;
            load_post();
            phan_trang();
            $('.currPage').text(page.toString());
            window.scrollTo(0, 600);
        });
$("body").on("click", ".paging .paging-bar .previus", function(){
            page = page - 1;
            load_post();
            phan_trang();
            $('.currPage').text(page.toString());
            window.scrollTo(0, 600);
        });
$("body").on("click", ".paging .paging-bar .goPageHead", function(){
            page = 1;
            load_post();
            phan_trang();
            $('.currPage').text(page.toString());
            window.scrollTo(0, 600);
        });
$("body").on("click", ".paging .paging-bar .goPageTail", function(){
            page = count_post;
            load_post();
            phan_trang();
            $('.currPage').text(page.toString());
            window.scrollTo(0, 600);
        });


$("body").on("click", ".brief-div .titlePost", function(e){
  e.preventDefault();
  var id = $(this).parent().find(".idPost").text();
  location.assign("trotot.com/post/" + id);
});


$("body").on("click", ".img-div", function(e){
  e.preventDefault();
  var id = $(this).parent().find(".idPost").text();
  location.assign("trotot.com/post/" + id);
});


  /*yêu thích và lưu tin*/
  
  $("body").on("click", ".favorite i", function(){
    var idpost = $(this).parent().parent().find(".idPost").text();
    var icon = $(this);
    $.ajax({
        url : 'module/function/checkss-header.php',
        type : 'post',
        dataType : 'text',
        data : {
          id : idpost,
        },

        success : function (result)
        {  
          if (result != "nologin"){
            if (icon.hasClass("fas")) {
              icon.removeClass("fas");
              $.ajax({
                          url : 'module/function/huy_luu_tin.php',
                          type : 'post',
                          dataType : 'text',
                          data : {
                            id : idpost,
                          },

                          success : function (result)
                          {
                              load_post();
                          },
                          error : function (result){}
                            
                      });
            } else {
              icon.addClass("fas");
              $.ajax({
                          url : 'module/function/luu_tin.php',
                          type : 'post',
                          dataType : 'text',
                          data : {
                            id : idpost
                          },

                          success : function (result)
                          {
                              alert("lưu");
                              load_post();
                          },
                          error : function (result){}
                    
                      });
            }
          } else {
            alert("vui lòng đăng nhâpk");
          }
        },
        error : function (result){}
  
    });

    
  })

//đưa đến sửa đổi thông tin
  $('.change_info').click(function(event){
  	$('.change_infor').css("display","block");
    $('.infor').css("display","none");
  })

$('#sodt').blur(function(event) {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    var mobile = $('#sodt').val();
    if(mobile !==''){
        if (vnf_regex.test(mobile) == false) 
        {
            alert('Số điện thoại của bạn không đúng định dạng!');
            this.focus();
        }
    }else{
        alert('Bạn chưa điền số điện thoại!');
        this.focus();
    }
});
  $('#email').blur(function(event) {
    /* Act on the event */
    var email = $(this).val();
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    if (!filter.test(email)) { 
         alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
         this.focus();
    }
});

  $('.change_submit').click(function(event){
    var name = $(".inp_name").val();
    var sdt = $(".inp_sdt").val();
    var email = $(".inp_email").val();
    var dia_chi  = $(".inp_dia_chi").val();
    $.ajax({
    url : 'module/function/change_infor.php',
    type : 'post',
    dataType : 'text',
    data : {
      id : id,
      name : name,
      sdt : sdt,
      email : email,
      dia_chi : dia_chi
    },
    success : function(result){
      alert(result);
    },

    error : function(result){
      alert("lỗi5");
    }

  });
    $('.change_infor').css("display","none");
    $('.infor').css("display","block");
    load_user();
  })
//hủy thay đổi thông tin
  $('.change_exit').click(function(event){
    $('.change_infor').css("display","none");
    $('.infor').css("display","block");
  })

    $('.change_pass').click(function(event){
    $('.infor').css("display","none");
    $('.change_password').css("display","block");
  })
  //nhập lại mật khẩu
  $('#repassword').change(function(event) {
    /* Act on the event */
    var pass = $('#password').val();
    var repass = $('#repassword').val();
    if (repass != pass) {
        alert("mật khẩu không giống nhau");
        this.focus();
    }
});
  $('.change_pass_exit').click(function(event){
    $('.change_password').css("display","none");
    $('.infor').css("display","block");
  })

$('.change_pass_submit').click(function(event){
    var newpass = $('#repassword').val();
    $.ajax({
    url : 'module/function/change_pass_inf.php',
    type : 'post',
    dataType : 'text',
    data : {
      id : id,
      pass : newpass
    },
    success : function(result){
      alert(result);
    },

    error : function(result){
      alert("lỗi5");
    }

  });
    $('.change_password').css("display","none");
    $('.infor').css("display","block");
  })