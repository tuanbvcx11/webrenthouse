$('#submit').click(function(event) {
    /* Act on the event */
    // tạo biến kiểm tra nhập
    var baoloi = true;

    if ($('#username').val() == "") {
        baoloi = false;
    }

    if ($('#password').val() == "") {
        baoloi = false;
    }

    if (baoloi) {
        // gửi user pass lên server
        $.ajax({
            url : 'module/function/login.php',
            type : 'post',
            dataType : 'text',
            data : {
                user : $('#username').val(),
                pass : $('#password').val()
            },
            success : function (result){
                if(result == "ok") {
                    location.assign("trotot.com/home");
                } else if (result == "sai") {
                    alert("Sai tài khoản hoặc mật khẩu");
                } else {
                    alert("Tài khoản đang chờ phê duyệt");
                }
            },
            error : function (result) {
                alert("lỗi");
            }
        });
    } else {
        alert("vui lòng nhập đầy đủ thông tin");
    }

    
});