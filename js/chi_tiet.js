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
var idpost = getUrlParameter('idpost');
var status_post = 2;
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var user_login = "NotOwner";
//hàm chuyển ngày thành định dạng dd/mm/yyyy
function convertDate (str) {
    var res = str.split('-');
    var year = res[0];
    var month = res[1];
    var day = res[2];
    return day + '-' + month + '-' + year;
  }

// hàm viết hoa chữ cái đầu
function jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
}

//load bình luận
var get_comment = function get_Comment(){
  $.ajax({
      url : 'module/function/binh_luan.php',
      type : 'post',
      dataType : 'json',
      data : {
        id : idpost
      },
      
      success : function(result){
        
      var html = '';
          $.each(result, function (key, item){
              html += '<div class="user_comment dan_le">';
              html += '<div>';
              html += '<strong>';
              html += '<p class="ten_user_cmt">'+item.name+'</p>';
              html += '</strong></div><div>';
              html += '<p class="content">'+item.comment+'</p>';
              html += '</div></div>';
          });
          $('.binhluan').html(html);
          if (html != '') {
            $('.comment_none').css("display","none");
          }
      },
      error : function(result){
        alert("lỗi");
      }
    });
}
//lấy đánh giá của user
function rateStar(){
  $.ajax({
      url : 'module/function/rate_star.php',
      type : 'post',
      dataType : 'json',
      data : {
        id : idpost

      },
      
      success : function(result){
        if (result["so-sao"] == 5){
          var $radios = $('input:radio[name=rate]');
          if($radios.is(':checked') === false) {
            $radios.filter('[value=5]').prop('checked', true);
          }
        }
        if (result["so-sao"] == 4){
          var $radios = $('input:radio[name=rate]');
          if($radios.is(':checked') === false) {
            $radios.filter('[value=4]').prop('checked', true);
          }
        }
        if (result["so-sao"] == 3){
          var $radios = $('input:radio[name=rate]');
          if($radios.is(':checked') === false) {
            $radios.filter('[value=3]').prop('checked', true);
          }
        }
        if (result["so-sao"] == 2){
          var $radios = $('input:radio[name=rate]');
          if($radios.is(':checked') === false) {
            $radios.filter('[value=2]').prop('checked', true);
          }
        }
        if (result["so-sao"] == 1){
          var $radios = $('input:radio[name=rate]');
          if($radios.is(':checked') === false) {
            $radios.filter('[value=1]').prop('checked', true);
          }
        }
      },

      error : function(result){
        alert("lỗi3");
      }
    });
}

//load ảnh
var load_images = function loadimages(){

    $.ajax({
      url : 'module/function/img.php',
      type : 'post',
      dataType : 'json',
      data : {
        id : idpost
      },
      
      success : function(result){
        
      var html = '';
      var html_dot = '';
      var x = 0;
          $.each(result, function (key, item){
            x = x + 1;
            html += '<div class="mySlides fade"><img src="./upload/'+item.images+'" class="slideanh"></div>';
            html_dot += '<span class="dot" onclick="currentSlide('+ x +')"></span>'; 
          });

          $('.slideshow-container').html(html);
          $('.dot_slide').html(html_dot);

           var slideIndex;
  // KHai bào hàm hiển thị slide
  function showSlides() {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      for (i = 0; i < slides.length; i++) {
         slides[i].style.display = "none";  
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
 
      slides[slideIndex].style.display = "block";  
      dots[slideIndex].className += " active";
      //chuyển đến slide tiếp theo
      slideIndex++;
      //nếu đang ở slide cuối cùng thì chuyển về slide đầu
      if (slideIndex > slides.length - 1) {
        slideIndex = 0
      }    
      //tự động chuyển đổi slide sau 5s
      setTimeout(showSlides, 3000);
  }
  //mặc định hiển thị slide đầu tiên 
  showSlides(slideIndex = 0);
 
 
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

      },

      error : function(result){
        alert("lỗi2");
      }
    });

}

var get_data = function get_data(){
   $.ajax({
        url : 'module/function/chi_tiet.php',
        type : 'post',
        dataType : 'json',
        data : {
          id : idpost
        },

        success : function (result)
        { 
            if ( result["tieu-de"] != null){
            $(".tieu_de").text(jsUcfirst(result["tieu-de"]));
            $(".dia_chi").text(jsUcfirst(result["spe-add"])+", "+jsUcfirst(result["district"])+", "+jsUcfirst(result["province"]));
            $(".id_tin").text(result["id-post"]);
            $(".gia").text(convertPrice(result["gia"]));
            $('.luotxem').text(result["luot-xem"]);
            if (result["status-phong"] == 1){
              $(".inf_trangthai").text("Còn phòng");
            } else{
              $(".inf_trangthai").text("Hết phòng");
            }
            $(".loai_phong").text(jsUcfirst(result["loai-phong"]));
            $(".so_phong").text(result["so-phong"]);
            $(".dientich").html(result["dien-tich"]+" m<sup>2</sup>");
            $(".chung_chu").text(jsUcfirst(result["chung-chu"]));
            $(".gia_dien").text(result["gia-dien"] + " VND/số");
            $(".gia_nuoc").text(result["gia-nuoc"] + " VND/khối");
            $(".nong_lanh").text(jsUcfirst(result["nong-lanh"]));
            $(".phong_tam").text(jsUcfirst(result["phong-tam"]));
            $(".phong_bep").text(jsUcfirst(result["phong-bep"]));
            $(".dieu_hoa").text(jsUcfirst(result["dieu-hoa"]));
            $(".ban_cong").text(jsUcfirst(result["ban-cong"]));
            $(".tien_ich_khac").text(jsUcfirst(result["khac"]));
            $(".mo_ta_chi_tiet").html(result["mo-ta"]);
            $(".idOwner").text(result["id-host"]);
            $(".ten_host").text(result["ten-host"]);
            $(".sdt_host").text(result["sdt-host"]);
            $(".dia_chi_host").text(jsUcfirst(result["dia-chi-host"]));
            $(".ngay_dang").text(convertDate(result["ngay-dang"]));
            $(".ngay_hethan").text(convertDate(result["ngay-hethan"]));
            //$(".id_user").text(result["id-user"]);
            $(".trang_thai_bai_dang").text(result["status-post"]);
            status_post = result["status-post"];
            if (result["status-post"] == 1){
              $(".duyet").css("display","none");
              $(".sua").css("display","none");
              $("#validateButton").css("display","none");
            } else
            if (result["status-post"] == -1){
              $(".duyet").css("display","none");
            } else
            if (result["status-post"] == 0){
              $("#validateButton").css("display","none");
            } 
            } else {
              location.assign("home.html");
            }

        },
        error : function (result) {
            alert("lỗi1");
        }
            
    });
}
//đánh giá chung
var star_avg = function star_avg(){
  $.ajax({
      url : 'module/function/rate_star_avg.php',
      type : 'post',
      dataType : 'json',
      data : {
        id : idpost
      },
      
      success : function(result){
        if (result["star-avg"] != null) 
          $('.sao_chung').text(result["star-avg"]+"/5.0 sao");

      },

      error : function(result){
        alert("lỗi588");
      }
    });
}
//lượt yêu thích
var yeu_thich = function yeu_thich(){
  $.ajax({
      url : 'module/function/yeu_thich.php',
      type : 'post',
      dataType : 'json',
      data : {
        id : idpost
      },
      
      success : function(result){
        $('.luotthich').text(result["luot-thich"]);

      },

      error : function(result){
        alert("lỗi5");
      }
    });
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
$(document).ready(function() {
    
    //lấy dữ liệu
    get_data();

    //load ảnh
    load_images();
    
    //gọi hàm bình luận
    get_comment();

    //gọi đánh giá chung
    star_avg();
    
    //lượt thích
    yeu_thich();

});

//dánh gia sao
var get_rateStar = function get_rateStar(){
  $.ajax({
      url : 'module/function/rate_star.php',
      type : 'post',
      dataType : 'json',
      data : {
        id : idpost

      },
      
      success : function(result){
        
        if (result["so-sao"] == 5){
          var $radios = $('input:radio[name=rate]');
          if($radios.is(':checked') === false) {
            $radios.filter('[value=5]').prop('checked', true);
          }
        }
        if (result["so-sao"] == 4){
          var $radios = $('input:radio[name=rate]');
          if($radios.is(':checked') === false) {
            $radios.filter('[value=4]').prop('checked', true);
          }
        }
        if (result["so-sao"] == 3){
          var $radios = $('input:radio[name=rate]');
          if($radios.is(':checked') === false) {
            $radios.filter('[value=3]').prop('checked', true);
          }
        }
        if (result["so-sao"] == 2){
          var $radios = $('input:radio[name=rate]');
          if($radios.is(':checked') === false) {
            $radios.filter('[value=2]').prop('checked', true);
          }
        }
        if (result["so-sao"] == 1){
          var $radios = $('input:radio[name=rate]');
          if($radios.is(':checked') === false) {
            $radios.filter('[value=1]').prop('checked', true);
          }
        }
      },

      error : function(result){
      }
    });
}



//kiểm tra vai trò người đăng nhập   
var check_user = function check_user(){
  $.ajax({
        url : 'module/function/chi_tiet.php',
        type : 'post',
        dataType : 'json',
        data : {
          id : idpost
        },

        success : function (result)
        { 

            var id_host = result["id-host"];
            $.ajax({ 
              url : 'module/function/chi_tiet_user.php',
              type : 'post',
              dataType : 'json',
              data : {
              },

              success : function(result){
                $(".ten_user").text(result["ten-user"]);
                if (result["vai-tro"] == "admin"){
                  $('.admin').css("display","block");
                }
                if (result["id-user"] == id_host){
                  $('.owner').css("display","block");
                  user_login = "owner";
                }
              },

              error : function(result){
              }             
            });
        },
        error : function (result) {  
        }
    });
}

    //lưu bài/tim
var get_luubai = function get_luubai(){
            $.ajax({ 
              url : 'module/function/luu_bai_dang.php',
              type : 'post',
              dataType : 'text',
              data : {
                id : idpost
              },

              success : function(result){
                if (result == "daluu"){
                  $('.like').children('i').removeClass("blackheart");
                  $('.like').children('i').addClass("redheart");
                  $('.like').children('i').text(' Đã lưu');
                } else {
                  $('.like').children('i').removeClass("redheart");
                  $('.like').children('i').addClass("blackheart");
                  $('.like').children('i').text(' Lưu tin');
                }
              },

              error : function(result){
              }             
            });
}
            

      $.ajax({ 
        url : 'module/function/checkss-header.php',
        type : 'post',
        dataType : 'text',
        data : {
        id : idpost
        },

        success : function(result){
          var status_user = result;
           $.ajax({
            url : 'module/function/chi_tiet.php',
            type : 'post',
            dataType : 'json',
            data : {
              id : idpost
            },

            success : function (result)
            {
               
                $(".trang_thai_bai_dang").text(result["status-post"]);
                status_post = result["status-post"];
                if ((status_user != "admin" && user_login != "owner" ) && (status_post != '1') ){
                location.assign("home.html");
                }
            },
            error : function (result) {
                alert("lỗi1");
            }
            
          });
          
          
          if (result == "nologin"){
            $('.starTitle').css("display","none");
            $('.Star').css("display","none");
            $('.comments').css("display","none");
            $('.ten_user').css("display","none");
            $('#user_box').css('display', 'none');
          } else {
            check_user();
            get_rateStar();
            get_luubai();
          }
          
        },

        error : function(result){
        }             
      });
    
/*đánh giá sao*/


  $('.Star .rate input').click(function(event){
    var label = $("label[for='" + $(this).attr('id') + "']")
    var ss = label.text();
    var so_sao = 1;
    if (ss == "2 stars") so_sao = 2;
    if (ss == "3 stars") so_sao = 3;
    if (ss == "4 stars") so_sao = 4;
    if (ss == "5 stars") so_sao = 5;
    $.ajax({
        url : 'module/function/danh_gia_sao.php',
        type : 'post',
        dataType : 'text',
        data : {
          id : idpost,
          so_sao : so_sao
        },

        success : function (result)
        {
            alert("Cảm ơn bạn đã đánh giá!");
            star_avg();

        },
        error : function (result){}
            
    });
    
  });


/*bình luận*/

  $('#submit_cmt').click(function(event){
    var cmt = $('#comment').val();
    var users = $('.ten_user:last').text();
    
    $('.binhluan').scrollTop($(document).height(),1);
    $('#comment').val('');
    if (cmt.trim() != ""){

              $.ajax({
                  url : 'module/function/comment.php',
                  type : 'post',
                  dataType : 'text',
                  data : {
                    id : idpost,
                    content : cmt,
                    date : date
                  },

                  success : function (result)
                  {
                      get_comment();
                  },

                  error : function (result){}
                  
              });
    }          

  });

  


/*Yêu thích và lưu tin*/

  $('.like').click(function(event){
          if ($(this).children('i').hasClass("blackheart") ){
              $(this).children('i').removeClass("blackheart");
              $(this).children('i').addClass("redheart");
              $(this).children('i').text(' Đã lưu');
              $.ajax({
                  url : 'module/function/luu_tin.php',
                  type : 'post',
                  dataType : 'text',
                  data : {
                    id : idpost,
                  },

                  success : function (result)
                  {
                      
                  },
                  error : function (result){}
            
              });
          } else{
              $(this).children('i').removeClass("redheart");
              $(this).children('i').addClass("blackheart");
              $(this).children('i').text(' Lưu tin');
              $.ajax({
                  url : 'module/function/huy_luu_tin.php',
                  type : 'post',
                  dataType : 'text',
                  data : {
                    id : idpost,
                  },

                  success : function (result)
                  {
                      
                  },
                  error : function (result){}
            
              });
          }     
  });


/*xác nhận báo cáo bài viết*/

  $('#submit_report').click(function(event){
  var id = $('.id_tin').text();
  var content = $('#inp_report').val();
              $.ajax({
                  url : 'module/function/report.php',
                  type : 'post',
                  dataType : 'text',
                  data : {
                    id : idpost,
                    content : content
                  },

                  success : function (result)
                  {
                      alert("thành công");
                  },
                  error : function (result){}
                  
              });
  
});



/*duyệt bài viết*/
$('.duyet').click(function(event){
  $(this).css("display","none");
  $('.sua').css("display","none");
              $.ajax({
                  url : 'module/function/duyet_bai.php',
                  type : 'post',
                  dataType : 'text',
                  data : {
                    id : idpost,
                    date : date
                  },

                  success : function (result)
                  {
                      alert("thành công");
                  },
                  error : function (result){}
                  
              });
});

 /*xóa bài viết*/
$('.xoa').click(function(event){
 
  var text = "Bạn có thực sự muốn xóa bài viết?\n Bài viết sẽ bị xóa hoàn toàn khi xác nhận.";
  var accept = confirm(text);
  if (accept == true){
              $.ajax({
                  url : 'module/function/xoa_bai.php',
                  type : 'post',
                  dataType : 'text',
                  data : {
                    id : idpost
                  },

                  success : function (result)
                  {
                      alert("thành công");
                      location.assign("home.html");
                  },
                  error : function (result){}
                  
              });
  } 
});

//admin xóa bài: lưu lại nhưng không hiển thị
$('.xoa_admin').click(function(event){
 
  var text = "Bạn có thực sự muốn xóa bài viết?";
  var accept = confirm(text);
  if (accept == true){
              $.ajax({
                  url : 'module/function/xoa_bai_admin.php',
                  type : 'post',
                  dataType : 'text',
                  data : {
                    id : idpost
                  },

                  success : function (result)
                  {
                      alert("thành công");
                      location.assign("home.html");
                  },
                  error : function (result){}
                  
              });
  } 
});
/*gia hạn bài viết*/
$('#submit_giahan').click(function(event){
  var id = $('.id_tin').text();
  var time = $('#thoi_gian_gia_han').val();
              $.ajax({
                  url : 'module/function/gia_han.php',
                  type : 'post',
                  dataType : 'text',
                  data : {
                    id : idpost,
                    time : time
                  },

                  success : function (result)
                  {
                      alert("thành công");
                  },
                  error : function (result){}
                  
              });

});
/*thay đổi trạng thái phòng*/
$('.trangthai').click(function(event){
  var trangthai = $('.inf_trangthai').text();
  var change;
  var change1;
  if ($('.inf_trangthai').text()=="Còn phòng") {
    change = "Hết phòng";
    change1 = 0;
  } else{
    change = "Còn phòng";
    change1 = 1;
  }
  var text = "Bạn có muốn thay đổi trạng thái thành " + change;
  var accept = confirm(text);
  if (accept == true){
    $('.inf_trangthai').text(change);
              $.ajax({
                  url : 'module/function/thay_doi_trang_thai.php',
                  type : 'post',
                  dataType : 'text',
                  data : {
                    id : idpost,
                    trang_thai : change1
                  },

                  success : function (result)
                  {
                      alert("thành công");
                  },
                  error : function (result){}
                  
              });
  }
});

$('.sua').click(function(event){
});

$('#rectangle_right').click(function(event){
  var idOwner = $(this).find('.idOwner').text();
  location.assign("personalinfo.html?idUser=" + idOwner);
});

