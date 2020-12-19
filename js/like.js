var page = 1;
var count_post;

var load_post = function load_post(){
	$.ajax({
	    url : 'module/function/like_load_post.php',
	    type : 'post',
	    dataType : 'json',
	    data : {
<<<<<<< HEAD
	    	page : page,
	    },

		success : function (result)
		{
=======
	    	page : page
	    },

		success : function (result)
		{alert(result["tieu_de"]);
>>>>>>> 9510eeee951f240f6360bccddcadef814d35347d
			var html = '';
          $.each(result, function (key, item){
              
            html += '<div class="d-flex baidang"><!-- ảnh --><div class="img-div"><a class="link-img" href="#">';
<<<<<<< HEAD
            html += '<img class="img-post" src="./upload/'+item.img+'" alt="'+item.tieu_de+'"/></a></div>';
=======
            html += '<img class="img-post" src="./'+item.img+'" alt="'+item.tieu_de+'"/></a></div>';
>>>>>>> 9510eeee951f240f6360bccddcadef814d35347d
            html += '<!-- tóm tắt --><div class="brief-div"><span class="idPost">'+item.id_post+'</span><a class="titlePost" href="#">';
            html += item.tieu_de+'</a><div class="d-flex address-div"><div class="mr-1 address-icon"><i class="fas fa-map-marker-alt"></i>';
            html +=	'</div><div class="addressPost">'+item.spe_add+', '+item.district+', '+item.province+'</div></div>';
            html +=	'<div class="d-flex Prices-div"><div class="mt-1 mr-1 Prices-icon"><i class="fas fa-coins"></i>';
            html += '</div><div class="Prices">'+item.gia_phong+'</div></div><div class="datePost">Ngày đăng: '+item.tg_dang_bai+'</div></div>';
            html +=	'<div class="dislike"><button class="btn btn-primary">Xóa</button></div></div>';
           
          });
<<<<<<< HEAD
          if (html != ''){
          	$('.post_none').css("display","none");
          }
          $('.list-table').html(html);
         
	    },
	    error : function (result){ alert("lỗi12212");}
=======
          $('.list-table').html(html);
         
	    },
	    error : function (result){ alert("lỗi12212")}
>>>>>>> 9510eeee951f240f6360bccddcadef814d35347d
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
<<<<<<< HEAD


$(document).ready(function(){
	load_post();
	phan_trang();
=======
$(document).ready(function(){
	load_post();
	//phan_trang();
>>>>>>> 9510eeee951f240f6360bccddcadef814d35347d
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


$("body").on("click", ".brief-div .titlePost", function(){
            var id = $(this).parent().find(".idPost").text();
            location.assign("chi_tiet.html?idpost=" + id);
        });


$("body").on("click", ".img-div", function(){
            var id = $(this).parent().find(".idPost").text();
            location.assign("chi_tiet.html?idpost=" + id);
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
					load_post();
			    },
			    error : function (result){ alert("lỗi12");}
		    });
        });