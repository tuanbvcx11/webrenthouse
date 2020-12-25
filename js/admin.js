$(document).ready(function() {
	$.ajax({
        url : 'module/function/checkss-header.php',
        type : 'post',
        dataType : 'text',
        data : {
        },
        success : function (result){
            if (result == 'admin') {
            	
            } else {
            	alert("bạn không phải admin");
            	location.assign("trotot.com/home");
            }
        },
        error : function (result) {
            //alert("lỗi");
        }
    });
});