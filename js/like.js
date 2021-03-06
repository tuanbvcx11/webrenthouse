var page = 1;
var count_post;


// hàm viết hoa chữ cái đầu
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
var load_post = function load_post(){
	$.ajax({
	    url : 'module/function/like_load_post.php',
	    type : 'post',
	    dataType : 'json',
	    data : {
	    	page : page,
	    },

		
		success : function (result)
		{

			var html = '';
          $.each(result, function (key, item){
              
            html += '<div class="d-flex baidang"><!-- ảnh --><div class="img-div"><a class="link-img" href="#">';
            html += '<img class="img-post" src="./upload/'+item.img+'" alt="'+item.tieu_de+'"/></a></div>';
            html += '<!-- tóm tắt --><div class="brief-div"><span class="idPost">'+item.id_post+'</span><a class="titlePost" href="#">';
            html += item.tieu_de+'</a><div class="d-flex address-div"><div class="mr-1 address-icon"><i class="fas fa-map-marker-alt"></i>';
            html +=	'</div><div class="addressPost">'+item.spe_add+', '+item.district+', '+item.province+'</div></div>';
            html +=`<div class="d-flex area-div">
                            <div class="area-icon">
                              <i class="fas fa-home"></i>
                            </div>
                            <div class="areaPost">`+ item.dien_tich +` m<sup>2</sup> </div>
                          </div>`;
            html +=	'<div class="d-flex Prices-div"><div class="mt-1 mr-1 Prices-icon"><i class="fas fa-coins"></i>';
            html += '</div><div class="Prices">'+convertPrice(item.gia_phong)+'</div></div><div class="datePost">Ngày đăng: '+convertDate(item.tg_dang_bai)+'</div></div>';
            html +=	'<div class="dislike"><button class="btn btn-primary">Xóa</button></div></div>';
           
           });
      
          if (html != ''){

            $('.paging').css('display', 'block');
          	$('.post_none').css("display","none");
          } else {
            $('.post_none').css("display","block");
            $('.paging').css('display', 'none');

          }
          $('.list-table').html(html);
         
	    },
	    error : function (result){ alert("lỗi12212");}
          

    });
}

var check_login = function check_login(){
  $.ajax({
    url : 'module/function/checkss-header.php',
    type : 'post',
    dataType : 'text',
    data : {
    },
    success : function(result){
        if (result == "nologin"){
          location.assign("trotot.com/home");
        }
    },

    error : function(result){
      alert("lỗi5");
    }
  });
}

var phan_trang = function phan_trang(){
  $.ajax({
      url : 'module/function/like_count_post.php',
      type : 'post',
      dataType : 'text',
      data : {
      },
      
      success : function(result){
        var count = result;
        count_post = result;
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
$(document).ready(function(){
	load_post();
	phan_trang();
  check_login();
});

$("body").on("click", ".paging .paging-bar .next", function(){
  page = page + 1;
  load_post();
  phan_trang();
  $('.currPage').text(page.toString());
  window.scrollTo(0, 0);
});
$("body").on("click", ".paging .paging-bar .previus", function(){
  page = page - 1;
  load_post();
  phan_trang();
  $('.currPage').text(page.toString());
  window.scrollTo(0, 0);
});
$("body").on("click", ".paging .paging-bar .goPageHead", function(){
  page = 1;
  load_post();
  phan_trang();
  $('.currPage').text(page.toString());
  window.scrollTo(0, 0);
});
$("body").on("click", ".paging .paging-bar .goPageTail", function(){
  page = count_post;
  load_post();
  phan_trang();
  $('.currPage').text(page.toString());
  window.scrollTo(0, 0);
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

$('.dislike').click(function(event){
	var id = $(this).parent().find('.idPost').text();
	alert(id);
});

$("body").on("click", ".dislike", function(){
            var id = $(this).parent().find(".idPost").text();
            $.ajax({
			    url : 'module/function/like_delete_post.php',
			    type : 'post',
			    dataType : 'text',
			    data : {
			    	id : id
			    },

				success : function (result)
				{

          phan_trang();
          load_post();
					
			   },
			    error : function (result){ alert("lỗi12");}
		    });
            
        });