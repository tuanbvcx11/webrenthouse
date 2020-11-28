
  //khai báo biến slideIndex đại diện cho slide hiện tại
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

  $('.Star .rate input').click(function(event){
    var label = $("label[for='" + $(this).attr('id') + "']")
    var ss = label.text();
    console.log(ss);
  });


  $('#submit_cmt').click(function(event){
    var cmt = $('#comment').val();
    var users = $('.ten_user:last').text();
    if (cmt != "")
    $('.binhluan').append('<div class="user_comment dan_le"><div><p class="ten_user">'+users+'</p></div><div><p class="content">'+cmt+'</p></div></div>');
    $('#comment').val('');
  });

  $('.like').click(function(event){
          if ($(this).children('i').hasClass("blackheart") ){
              $(this).children('i').removeClass("blackheart");
              $(this).children('i').addClass("redheart");
              $(this).children('i').text('đã lưu');
          } else{
              $(this).children('i').removeClass("redheart");
              $(this).children('i').addClass("blackheart");
              $(this).children('i').text('lưu tin');
          }     
  });


$('#submit_report').click(function(event){
  var id = $('.id_tin').text();
  var content = $('#inp_report').val();
    alert(id+content);   
});


$('.duyet').click(function(event){
  alert($('.id_tin').text()); 
  $(this).css("display","none");
  $('.sua').css("display","none");

});

$('.xoa').click(function(event){
  var id = $('.id_tin').text();
  var text = "Bạn có thực sự muốn xóa bài viết";
  var accept = confirm(text);
  if (accept = false){
    alert(id+" xóa cmnr");
  } 
});

$('#submit_giahan').click(function(event){
  var id = $('.id_tin').text();
  var time = $('#thoi_gian_gia_han').val();
  alert(id+time); 

});

$('.trangthai').click(function(event){
  var trangthai = $('.inf_trangthai').text();
  var change;
  if ($('.inf_trangthai').text()=="Còn phòng") {
    change = "Hết phòng";
  } else{
    change = "Còn phòng";
  }
  var text = "Bạn có muốn thay đổi trạng thái thành " + change;
  var accept = confirm(text);
  if (accept == true){
    $('.inf_trangthai').text(change);
  }
});

$('.sua').click(function(event){
});

