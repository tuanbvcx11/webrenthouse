// $(document).ready(function() {
//      $('.content-function').scrollTop($('.content-function')[0].scrollHeight);
// });

//hàm convert ngày sang form yyyy-mm-dd
function convert(){
    let current_datetime = new Date();
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
    return formatted_date;
}

//đặt max value cho input là ngày hiện tại
var today = convert();
$('.countpost .input-group input').attr('max', today);


//kiểm tra ngày nhập so với ngày hiện tại
$('.countpost .input-group input').blur(function(event) {
    /* Act on the event */
    var date = $(this).val();
    var today = convert();
    if (date > today) {
        alert('ngày không hợp lệ');
        this.focus();
    }
});


//kiểm tra khoảng cách ngày
$('.countpost .btn').click(function(event) {
    /* Act on the event */
    var pre = $('#start').val();
    var next = $('#end').val();

    if (pre > next) {
        alert('khoảng thời gian không hợp lệ');
    } else {
        //gửi lên server nè
    }
});