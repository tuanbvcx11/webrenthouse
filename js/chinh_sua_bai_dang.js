$(document).ready(function() {
    $("#formPost").submit(function() {
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
            let phithuebai = timePost * 20000;
            $("#phi_thue_bai").val(phithuebai);
        } else {
            $("#phi_thue_bai").val("");
        }

    });

});