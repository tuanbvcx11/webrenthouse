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

  $('.change_info').click(function(event){
  	var ho_ten = $('.ho_ten').text();
  	var chung_minh = $('.chung_minh').text();
  	var dien_thoai = $('.dien_thoai').text();
  	var email = $('.email').text();
  	var dia_chi = $('.dia_chi').text();

  	alert(ho_ten+chung_minh+dien_thoai+email+dia_chi);
  })