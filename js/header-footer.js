$(document).ready(function() {

    // hiện tên người dùng lên trên header
    function getUser () {
        // body... 
        $.ajax({
            url : 'module/function/chi_tiet_user.php',
            type : 'post',
            dataType : 'json',
            data : {
            },
            success : function (result){
                $(".logo").find('#hello').text('Hi: ' +result['ten-user'])
            },
            error : function (result) {
                alert("lỗi");
            }
        });
    }
    

    // hàm viết hoa chữ cái đầu
    function jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // hàm load thông báo
    function load_thong_bao () {
        // body... 
        $.ajax({
            url : 'module/function/thong-bao.php',
            type : 'post',
            dataType : 'json',
            data : {
            },
            success : function (result){
                var html = `<h3>Thông báo</h3><hr>`;
                var html_con = ``;
                $.each(result, function (key, item){
                    html_con += `<div class="content-thongbao">
                                    <span>` + jsUcfirst(item.name) + `</span>
                                    <span>` + item.content + `:</span>
                                    <span class="id_bai_viet">` + item.id_bai_viet +`</span>
                                    <span>` + jsUcfirst(item.tieu_de) + `</span>
                                </div>`;
                    
                });

                if (html_con == ``) {
                    html_con = `<div class="no-thongbao">
                                    <h5>Bạn chưa có thông báo nào</h5>
                                </div>`;
                }

                html += html_con;

                $('.list-thongbao').html(html);

            },
            error : function (result) {
                alert("lỗi");
            }
        });
    }

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
                getUser();
            } else if (result == "host") {
            	$('.toadmin').css('display', 'none');
            	$('.dangnhap').css('display', 'none');
                getUser();
            } else {
            	$('.host-chat').css('display', 'none');
            	$('.dangnhap').css('display', 'none');
            	$('.info-me').css('display', 'none');
                getUser();
            }
        },
        error : function (result) {
            //alert("lỗi");
        } 
    });

    $('.tuychon button').click(function(event) {
         // Act on the event 
        $(this).toggleClass('open');
    });

    //hiển thi thông báo
    $('.thongbao').click(function(event) {
        /* Act on the event */
        $('.list-thongbao').fadeToggle(200);
        load_thong_bao();
    });

    $('.yeuthich').click(function(event){
        location.assign("like.html");
    });

    
});