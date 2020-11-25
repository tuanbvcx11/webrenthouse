$(document).ready(function() {
    var idPost;
    var action;
    var inputgiahan;

    /* tải dữ liệu vào bảng */
    function load_post_table() {
        action = $("#listingStatus").val();
        /* sử dụng ajax cập nhật bảng */
    }

    load_post_table();

    $("#listingStatus").change(function() {
        load_post_table();
    });

    /* sự kiện bấm vào nút chỉnh sửa */
    $(".editButton").click(function() {
        location.assign("http://localhost/BTLweb/webrenthouse/chinh_sua_bai_dang.html");
        return false;
    });

    /* sự kiện bấm nút xem */
    $(".bodyPost .detailButton").click(function(event) {
        idPost = $(this).parent().parent().children(".idPost").text();

        /* chuyển đén trang có id là idpost cần xem */
    });

    /* sự kiện khi bấm nút xóa */
    $(".bodyPost .eraseButton").click(function(event) {
        idPost = $(this).parent().parent().children(".idPost").text();
        $("#eraseModal .modal-body").text("Bạn xác nhận xóa bài đăng số " + idPost + " này?");
        action = 'xoa';
    });

    /* sự kiện bấm nút gia hạn */
    $(".bodyPost .validateButton").click(function(event) {
        idPost = $(this).parent().parent().children(".idPost").text();
        $("#validateModal .modal-title").text("Gia hạn bài đăng số " + idPost + ":");
        action = 'giahan';

    });

    // cập nhật thông báo lên database và xử lý ajax
    function update(idPost, action) {
        alert(action + idPost);
    }

    //cập nhật thông báo khi điền vào input gia hạn, xử lý ajax xóa rồi đưa bài vào bảng chưa duyệt
    function updateGiahan(idPost, action, inputgiahan) {
        alert(action + " " + idPost + " " + inputgiahan);
    }

    $("#eraseModal .btn-primary").click(function(event) {
        //gửi thông báo xóa post bằng ajax
        update(idPost, action);
        // load lại bảng
        load_post_table();
    });

    $("#validateModal .btn-primary").click(function(event) {
        action = "Chưa duyệt";
        inputgiahan = $("#thoi_gian_gia_han").val();
        // chuyển post sang bảng chưa duyệt rồi xóa post
        updateGiahan(idPost, action, inputgiahan);
        // load lại bảng
        load_post_table();
    });

});

/* nút gia hạn 
bấm xác nhận thì phải láy val của input và gửi ajax cập nhật input 
rồi đua baif viết lên phần chưa duyệt
load lại bảng
*/
/* nút xóa
xóa rồi load lại bảng */

/* bàn lại phần gia hạn */