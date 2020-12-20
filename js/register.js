//hàm viết hoa kí tự đầu của mỗi từ
function uppper(str) {
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toLocaleUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}

//kiểm tra số điện thoại
$('#sdt').change(function(event) {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    var mobile = $('#sdt').val();
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


// kiểm tra email
// $('#email').blur(function(event) {
//      Act on the event 
//     var email = $(this).val();
    
// });

// kiểm tra nhập lại mật khẩu
$('#repassword').change(function(event) {
    /* Act on the event */
    var pass = $('#password').val();
    var repass = $('#repassword').val();
    if (repass != pass) {
        alert("mật khẩu không giống nhau");
        this.focus();
    }
});


//khi bấm đăng kí
$('#submit').click(function(event) {

    //kiểm tra nhập đầy đủ thông tin
    var baoloi = "";
    email = $('#email').val();
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    if (!filter.test(email)) { 
        baoloi = 'Hay nhap dia chi email hop le.\nExample@gmail.com';
    }

    if ($('#hoten').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }

    if ($('#sdt').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    if ($('#address').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    if ($('#username').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    if ($('#email').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    if ($('#password').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    if ($('#repassword').val() == "") {
        baoloi = "vui lòng nhập đầy đủ thông tin";
    }
    
    if (baoloi != "") {
        // nếu lỗi sẽ thông báo
        alert(baoloi);
    } else {

        console.log($('#vaitro').val());
        //nếu không lỗi sẽ gửi dữ liệu bằng ajax
        $.ajax({
            url : 'module/function/register.php',
            type : 'post',
            dataType : 'json',
            data : {
                name: uppper($('#hoten').val().toLowerCase()),
                sdt: $('#sdt').val(),
                add: $('#address').val(),
                username: $('#username').val(),
                email: $('#email').val(),
                pass: $('#password').val(),
                vaitro: $('#vaitro').val()
            },
            success : function (result){
                var error_sdt = result["sdt"];
                var error_email = result["email"];
                var error_user = result["username"];

                if(error_sdt === "" && error_email === "" && error_user === ""){
                    if ($('#vaitro').val() === "host") {
                        alert("Đăng ký thành công. Vui lòng chờ admin phê duyệt");
                        location.assign("./login.html");
                    } else {
                        alert("Đăng ký thành công");
                        location.assign("./login.html");
                    }
                }
                else{
                    alert(error_sdt + "\n" + error_email + "\n" + error_user);
                }
            },
            error : function (result) {
                alert("lỗi");
            }
        });
    }
});