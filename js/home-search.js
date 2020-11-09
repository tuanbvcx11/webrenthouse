var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
 
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
    
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
var entity = getUrlParameter('entity');

var search = getUrlParameter('search').toLowerCase();

var page = getUrlParameter('page');


$(document).ready(function() {

    if (search != "null")
    $('#thanhtimkiem').val(search);

    var entityfocus = $('.entity');

    for (var i = entityfocus.length - 1; i >= 0; i--) {
        if ( entityfocus[i].value == entity) {
            entityfocus[i].classList.add("entityfocus");
            $('#thanhtimkiem').attr("placeholder", "tìm kiếm theo "+ entity );
        }
    };
    


    $.ajax({
        url : 'module/function/home-search.php',
        type : 'post',
        dataType : 'json',
        data : {
            entity : entity,
            search : search,
            page : page
        },

        success : function (result)
        {
            var html = "";
            $.each(result, function (key, item){
                html += '<div class="col-sm-4">';
                html += '<div class="card" style="height : 20rem">';
                html += '<div class="card-body">';
                html += '<h5 class="card-title">'+item.ten_thuoc+'</h5>';
                html += '<p class="card-text ">+ &nbsp;'+item.sdk+'</p>';
                html += '<p class="card-text" style="height : 8rem"> +  &nbsp;'+item.hoat_chat+'</p>';
                html += '<p class="card-text" style="height : 2rem"> +  &nbsp;'+item.cty+'</p>';
                html += '<p class="card-text">+ &nbsp;Giá bán buôn kê khai: '+item.gia+'</p>';
                html += '</div></div></div>';
            });

            $('.ketqua .row').html(html);
        },
        error : function (result) {
            alert("sai r bạn ơi");
        }
    });

    //lấy số tổng số trang, so sánh để disabled button khi trang tại 2 đầu mút
    $.ajax({
        url : 'module/function/count-thuoc-search.php',
        type : 'post',
        dataType : 'text',
        data : {
            entity : entity,
            search : search
        },
        success : function (result){
            var count  = result;
            if ($('.pagination .active').text() == "1") {
                $('.pagination .pre').addClass('disabled');
            };

            if ($('.pagination .active').text() == count) {
                $('.pagination .next').addClass('disabled');
            };
        },
        error : function (result) {
            alert("lỗi");
        }
    });

    $('.pagination .active a').text(page.toString());

    var pre = Number(page) - 1;
    $('.pagination .pre a').attr('href', "home-search.html" + "?entity=" + entity + "&search=" + search + '&page=' + pre.toString());

    var next = Number(page) + 1; 
    $('.pagination .next a').attr('href',"home-search.html" + "?entity=" + entity + "&search=" + search + '&page='+ next.toString());

});





// xử lý thanh tìm kiếm
$("#thanhtimkiem").keypress(function(event) {
    /* Act on the event */
    if ($(this).value != "")
    {
        $('#x').css("visibility",'visible');
    }
});

$("#x").click(function(event) {
    /* Act on the event */
    $("#thanhtimkiem").val("");
     $('#x').css("visibility",'hidden');
});

//xử lý chọn cách tìm kiếm
$(".entity").click(function(event) {
    $('#thanhtimkiem').attr("placeholder", "tìm kiếm theo "+ $(this).val() );
    /* Act on the event */
    if (!$(this).hasClass('entityfocus'))
    {
        $(this).parent().children().removeClass('entityfocus');
        $(this).addClass('entityfocus');
    }
});

// xử lý click vào 1 thuốc nào đó
$("body").on("click", ".ketqua .row .col-sm-4 .card", function(){
    var thuoc = $(this).find('.card-title').text();
    location.assign("info-thuoc.html?thuoc=" + thuoc);
});

// xử lý click vào search
$('.search').click(function(event) {
    /* Act on the event */
    var entity = $('.entityfocus').val();
    var search = $('#thanhtimkiem').val();
    if (search == '') search = 'null';
    location.assign("home-search.html" + "?entity=" + entity + "&search=" + search + "&page=1");
});