// hàm cho xem ảnh khi chọn ảnh 
function previewFiles() {
    $('.preview').empty();

    var preview = document.querySelector('.preview');
    var files   = document.querySelector('input[type=file]').files;

    function readAndPreview(file) {

        var html = "";

        // Make sure `file.name` matches our extensions criteria
        if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
            var reader = new FileReader();

            reader.addEventListener("load", function () {

                html = `<div class="img">
                            <img src="`+ this.result + `">
                        </div>`;
                preview.innerHTML += html;
            }, false);

            reader.readAsDataURL(file);
    }

  }

  if (files) {
    [].forEach.call(files, readAndPreview);
  }
}

// hàm lấy các quận huyện của 1 tỉnh và selected vào quận huyện
function getDistrict (thisProvince, thisDistrict) {
    // body... 
    $.ajax({
        url : 'module/function/getdistrict.php',
        type : 'post',
        dataType : 'json',
        data : {
            province : thisProvince
        },
        success : function (result){
            var district = '<option value="Chưa chọn">-- Chưa chọn --</option>';
            $.each(result, function (key, item){
                district += '<option value="' + item.prefix + ' ' + item.name + '">' + item.prefix + ' ' + item.name + '</option>';
            });

            $('#quan_huyen').html(district);
            $('#quan_huyen').val(thisDistrict);
        },
        error : function (result) {
            alert("lỗi");
        }
    });
}

// hàm load tỉnh thành phố và selected vào tỉnh thành của bài viết
function getProvince(thisProvince) {
    // body... 
    $.ajax({
        url : 'module/function/getprovince.php',
        type : 'post',
        dataType : 'json',
        data : {
        },
        success : function (result){
            var province = '<option value="Chưa chọn">-- Chưa chọn --</option>';
            $.each(result, function (key, item){
                province += '<option value="' + item.name + '">' + item.name + '</option>';
            });

            $('#tinh_thanh_pho').html(province);
            $('#tinh_thanh_pho').val(thisProvince);
        },
        error : function (result) {
            alert("lỗi");
        }
    });
}

// hàm lấy dữ liệu của bài viết
function load_data(idPost) {
    // body... 

    // load các nội dung của bài viết
    $.ajax({
        url : 'module/function/chi_tiet.php',
        type : 'post',
        dataType : 'json',
        data : {
            id : idPost 
        },
        success : function (result){
            var province = result['province'];
            var district = result['district'];
            $('#dia_chi_chi_tiet').val(result['spe-add']);
            $('#loai_phong').val(result['loai-phong']);
            $('#so_luong_phong').val(result['so-phong']);
            $('#dien_tich').val(result['dien-tich']);
            $('input:radio[name="chung_chu"][value="' + result['chung-chu'].toUpperCase() +'"]').prop('checked', true);
            $('#bathroom').val(result['phong-tam']);
            $('input:radio[name="nong_lanh"][value="' + result['nong-lanh'].toUpperCase() +'"]').prop('checked', true);
            $('#kitchen').val(result['phong-bep']);
            $('input:radio[name="dieu_hoa"][value="' + result['dieu-hoa'].toUpperCase() +'"]').prop('checked', true);
            $('input:radio[name="ban_cong"][value="' + result['ban-cong'].toUpperCase() +'"]').prop('checked', true);
            $('#tien_ich_khac').val(result['khac']);
            $('#gia_dien').val(result['gia-dien']);
            $('#gia_nuoc').val(result['gia-nuoc']);
            $('#Prices').val(result['gia']);
            $('#postTitle').val(result['tieu-de']);
            $('#descriptionPost').val(result['mo-ta'].replaceAll('<br />', ''));
            $('#thoi_gian_dang_bai').val(result['time_hien_thi']);
            let phithuebai = result['time_hien_thi'] * 2000;
            $("#phi_thue_bai").val(phithuebai);

            getProvince(province);
            getDistrict(province, district);

            
        },
        error : function (result) {
            alert("alo");
        }
    });

    // load các ảnh của bài viết
    $.ajax({
        url : 'module/function/img.php',
        type : 'post',
        dataType : 'json',
        data : {
            id : idPost 
        },
        success : function (result){
            var html = '';
            $.each(result, function (key, item){
                html += `<div class="img">
                            <img src="./upload/`+ item.images + `">
                        </div>`;
            });

            $('.preview').html(html);
            
        },
        error : function (result) {
            alert("alo");
        }
    });
}


$(document).ready(function() {

    // biến kiểm tra xem có chỉnh sửa ảnh hay ko
    var check_update_img = false;
    var total_img = 0;

    // lấy id bài viết
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
    var idPost = getUrlParameter('post');
    $('#idPost').val(idPost);
    
    // kiểm tra user đang đăng nhập và bài viết
    $.ajax({
        url : 'module/function/check-update-post.php',
        type : 'post',
        dataType : 'text',
        data : {
            idPost : idPost 
        },
        success : function (result){
            if (result == 'ok') {
                
            } else {
                alert("Không được chỉnh sửa bài viết");
                location.assign("home.html");
            }
        },
        error : function (result) {
            alert("lỗi");
        }
    });
    
    load_data(idPost);    


    
    //XỬ LÍ QUÁ TRÌNH CHỈNH SỬA

    // khi chọn 1 tỉnh thì sẽ hiện các huyện của tỉnh đó
    $("body").on("change", "#tinh_thanh_pho", function(){
        var tmpDistrict = "Chưa chọn";
        var tmpProvice = $(this).val();
        getDistrict(tmpProvice, tmpDistrict);
    });

    //kiểm tra xem có chỉnh sửa hình ảnh hay không
    
    $('.inputs').change(function(){
        var files = this.files;
        if(files.length < 3){
            alert("Vui lòng nhập tối thiểu 3 ảnh");
        }
        check_update_img = true;
        total_img = files.length;
        console.log(total_img);
        console.log(check_update_img);
    });

    // $('body').on("submit", "#formPost", function(){
    $("#formPost").submit(function() {
        // alert($('#tinh_thanh_pho').val());
        // return false;
        let announce = "";

        if ($("#tinh_thanh_pho").val() == "Chưa chọn") {
            announce += "bạn chưa chọn tỉnh thành phố \n";
            $("#tinh_thanh_pho").addClass("_focus");
        }

        if ($("#quan_huyen").val() == "Chưa chọn") {
            announce += "bạn chưa chọn quận huyện \n";
            $("#quan_huyen").addClass("_focus");
        }

        if ($("#phuong_thi_xa").val() == "Chưa chọn") {
            announce += "bạn chưa chọn phường(thị xã) \n";
            $("#phuong_thi_xa").addClass("_focus");
        }


        if ($("#loai_phong").val() == "Chưa chọn") {
            announce += "bạn chưa chọn loại phòng \n";
            $("#loai_phong").addClass("_focus");
        }


        if ($("#month_quarter_year").val() == "Chưa chọn") {
            announce += "bạn chưa chọn giá trọ tính theo \n";
            $("#month_quarter_year").addClass("_focus");
        }

        /* phòng tắm */
        if ($("#bathroom").val() == "Chưa chọn") {
            announce += "bạn chưa chọn loại phòng tắm \n";
            $("#bathroom").addClass("_focus");
        }

        /* phòng bếp */
        if ($("#kitchen").val() == "Chưa chọn") {
            announce += "bạn chưa chọn loại phòng bếp \n";
            $("#kitchen").addClass("_focus");
        }

        if ($("#so_luong_phong").val() <= 0) {
            announce += "số lượng phòng phải lớn hơn 0 \n";
        }
        if ($("#dien_tich").val() <= 0) {
            announce += "diện tích phải lớn hơn 0 \n";
        }
        if ($("#gia_dien").val() <= 0) {
            announce += "giá điện phải lớn hơn 0 \n";
        }
        if ($("#gia_nuoc").val() <= 0) {
            announce += "giá nước phải lớn hơn 0 \n";
        }
        if ($("#Prices").val() <= 0) {
            announce += "giá thuê phòng phải lớn hơn 0 \n";
        }
        if ($("#thoi_gian_dang_bai").val() <= 0) {
            announce += "thời gian đăng bài phải lớn hơn 0 \n";
        }

        if(total_img < 3 && check_update_img){
            announce += "Vui lòng chọn tối thiểu 3 ảnh \n";
        }

        if (announce !== "") {
            alert(announce);
            return false;
        } else {
            var city = $("#tinh_thanh_pho").val();
            var district = $("#quan_huyen").val();
            var detailAddress = $("#dia_chi_chi_tiet").val();
            var typeRoom = $("#loai_phong").val();
            var numberOfRoom = $("#so_luong_phong").val();
            var prices = $("#Prices").val();
            /* 
            var gia_ca_tinh_theo = $("#month_quarter_year").val(); */
            var area = $("#dien_tich").val();
            var chungchu = $('input[name=chung_chu]:checked', '.chungchu').val();
            var bathroom = $("#bathroom").val();
            var nonglanh = $('input[name=nong_lanh]:checked', '.nonglanh').val();
            var kitchen = $("#kitchen").val();
            var dieuhoa = $('input[name=dieu_hoa]:checked', '.dieuhoa').val();
            var bancong = $('input[name=ban_cong]:checked', '.bancong').val();
            var giadien = $("#gia_dien").val();
            var gianuoc = $("#gia_nuoc").val();
            var tienichkhac = $("#tien_ich_khac").val();
            var timePost = $("#thoi_gian_dang_bai").val();
            let phithuebai = $("#phi_thue_bai").val();
            var titlePost = $("#postTitle").val();
            var descriptionPost = $("#descriptionPost").val();
        }
    });


    $("#tinh_thanh_pho").change(function() {
        if ($("#tinh_thanh_pho").hasClass("_focus") && $("#tinh_thanh_pho").val() != "Chưa chọn") {
            $("#tinh_thanh_pho").removeClass("_focus");

        }
    });

    $("#quan_huyen").change(function() {
        if ($("#quan_huyen").hasClass("_focus") && $("#quan_huyen").val() != "Chưa chọn") {
            $("#quan_huyen").removeClass("_focus");
        }
    });

    $("#loai_phong").change(function() {
        if ($("#loai_phong").hasClass("_focus") && $("#loai_phong").val() != "Chưa chọn") {
            $("#loai_phong").removeClass("_focus");
        }
    });

    $("#month_quarter_year").change(function() {
        if ($("#month_quarter_year").hasClass("_focus") && $("#month_quarter_year").val() != "Chưa chọn") {
            $("#month_quarter_year").removeClass("_focus");
        }
    });

    $("#bathroom").change(function() {
        if ($("#bathroom").hasClass("_focus") && $("#bathroom").val() != "Chưa chọn") {
            $("#bathroom").removeClass("_focus");
        }
    });


    $("#kitchen").change(function() {
        if ($("#kitchen").hasClass("_focus") && $("#kitchen").val() != "Chưa chọn") {
            $("#kitchen").removeClass("_focus");
        }
    });

    $("#thoi_gian_dang_bai").change(function() {
        let timePost = $("#thoi_gian_dang_bai").val();
        if (timePost > 0) {
            let phithuebai = timePost * 2000;
            $("#phi_thue_bai").val(phithuebai);
        } else {
            $("#phi_thue_bai").val("");
        }

    });

});