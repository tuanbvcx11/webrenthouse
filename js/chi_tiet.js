
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
      setTimeout(showSlides, 5000);
  }
  //mặc định hiển thị slide đầu tiên 
  showSlides(slideIndex = 0);
 
 
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  $('#rate5').click(function(event){
    var ss = $('#rate5').text();
  alert(ss);
  });
  $('#rate4').click(function(event){
    var ss = $('#rate4').text();
  alert(ss);
  });
  $('#rate3').click(function(event){
    var ss = $('#rate3').text();
  alert(ss);
  });
  $('#rate2').click(function(event){
    var ss = $('#rate2').text();
  alert(ss);
  });
  $('#rate1').click(function(event){
    var ss = $('#rate1').text();
  alert(ss);
  });




  $('#submit_cmt').click(function(event){
    var cmt = $('#comment').val();
    alert(cmt);
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

$('.report').click(function(event){
    alert($('.id_tin').text());   
});


$('.duyet').click(function(event){
  alert($('.duyet').text());
  $(this).css("display","none");
});

$('.xoa').click(function(event){
  alert($('.xoa').text());
});

$('.giahan').click(function(event){
  alert($('.giahan').text());
  $(this).css("display","none");
});

$('.ycgiahan').click(function(event){
  alert($('.ycgiahan').text());
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
  } else{
    $('.inf_trangthai').text(change);
  }
});

