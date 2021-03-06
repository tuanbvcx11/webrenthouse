// hàm đêm số bài viết đã like
function count_like_header() {
    // body... 
    $.ajax({
        url : 'module/function/count-like-header.php',
        type : 'post',
        dataType : 'text',
        data : {
        },
        success : function (result){
            if (result == 0) {
                $('#total-like-header').css('display', 'none');
            } else if (result <= 9) {
                $('#total-like-header').css('display', 'block');
                $('#total-like-header').text(result);
            } else {
                $('#total-like-header').css('display', 'block');
                $('#total-like-header').text('9+');
            }
            
        },
        error : function (result) {
            alert("lỗi");
        }
    });
}


$(document).ready(function() {

    count_like_header();

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
                    if (item.more_cont == "no") {
                        html_con += `<div class="content-thongbao">
                                        <span>` + jsUcfirst(item.name) + `</span>
                                        <span>` + item.content + `:</span>
                                        <span class="id_bai_viet">` + item.id_bai_viet +`</span>
                                        <span>` + jsUcfirst(item.tieu_de) + `</span>
                                    </div>`;
                    } else {
                        html_con += `<div class="content-thongbao">
                                        <span>` + jsUcfirst(item.name) + `</span>
                                        <span>` + item.content + `:</span>
                                        <span class="id_bai_viet">` + item.id_bai_viet +`</span>
                                        <span>` + jsUcfirst(item.tieu_de) + `</span>
                                        <span>(` + jsUcfirst(item.more_cont) + `)</span>
                                    </div>`;
                    }
                    
                    
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
        if ($(this).find('i').hasClass('far')) {
            $(this).children('a').empty();
            $(this).children('a').append('<i class="fas fa-bell"></i>')
        } else {
            $(this).children('a').empty();
            $(this).children('a').append('<i class="far fa-bell"></i>')
        }
        $('.list-thongbao').fadeToggle(200);
        load_thong_bao();
    });

    // khi click vào logo thì về trang home
    $('.logo .col-4 img').click(function(event) {
        /* Act on the event */
        location.assign('trotot.com/home');
    });

    // khi click vào thông báo
    $("body").on("click", ".list-thongbao .content-thongbao", function(){
        
        location.assign('./trotot.com/post/' + $(this).children('.id_bai_viet').text())
    });

    // khi click vào trang cá nhân
    $('.info-me-header').click(function(event) {
        /* Act on the event */
        // lấy id người đăng nhập
        event.preventDefault();
        var link = $(this);
        $.ajax({
            url : 'module/function/chi_tiet_user.php',
            type : 'post',
            dataType : 'json',
            data : {
            },
            success : function (result){
                location.assign("trotot.com/user/" + result['id-user']);
            },
            error : function (result) {
                //alert("lỗi");
            }
        });
    });
    
});