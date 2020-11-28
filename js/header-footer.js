$(document).ready(function() {
	
	//hiển thi thông báo
	$('.thongbao').click(function(event) {
		/* Act on the event */
		$('.list-thongbao').fadeToggle(200);
	});

	//kiểm tra đăng nhập
    $.ajax({
        url : 'module/function/checkss-header.php',
        type : 'post',
        dataType : 'text',
        data : {
        },
        success : function (result){
            if (result == 'nologin') {
            	$('.tuychon').css('display', 'none');
            	$('.thongbao').css('display', 'none');
            	$('.yeuthich').css('display', 'none');
            	$('#hello').css('display', 'none');
            	$('.dangnhap').css('display', 'block');
            	$('.dangnhap').css('margin-right', '10px');
            } else if (result == 'guest') {
            	$('.dangnhap').css('display', 'none');
            	// $('.tuychon').css('display', 'block');
            	$('.thongbao').css('display', 'none');
            	// $('.yeuthich').css('display', 'block');
            	// $('#hello').css('display', 'block');
            	$('.dangbai').css('display', 'none');
            	$('.list-posted').css('display', 'none');
            	$('.host-chat').css('display', 'none');
            	$('.toadmin').css('display', 'none');
            } else if (result == "host") {
            	$('.toadmin').css('display', 'none');
            	$('.dangnhap').css('display', 'none');
            } else {
            	$('.host-chat').css('display', 'none');
            	$('.dangnhap').css('display', 'none');
            	$('.info-me').css('display', 'none');
            }
        },
        error : function (result) {
            alert("lỗi");
        }
    });
});