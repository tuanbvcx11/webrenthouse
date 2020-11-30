
$('.titlePost').click(function(event){
	var id = $(this).parent().find('.idPost').text();
	alert(id);
});

$('.img-div').click(function(event){
	var id = $(this).parent().find('.idPost').text();
	alert(id);
});

/*yêu thích và lưu tin*/
$('.favorite').click(function(event){
	var id = $(this).parent().find('.idPost').text();
	var tim;
	if ($(this).children('i').hasClass("fas") ){
                $(this).children('i').removeClass("fas");
                tim = "hủy lưu";
            } else{
                $(this).children('i').addClass("fas");
                tim = "đã lưu";
            }
    alert(id+" "+tim);
    /*
    var id = $(this).parent().find('.idPost').text();
	alert(id);
	*/
});

/*tìm kiếm*/
$('#submit').click(function(event){
	
	//chọn tỉnh/thành phố
	var city = $('#city').find(":selected").val();
	
	//chọn quận/huyện
	var district = $('#district').find(":selected").val();
	
	//chọn loại phòng
	var type_room;
	var checkbox = $('[name=type_room]');
        
                 
        // Lặp qua từng checkbox để lấy giá trị
        for (var i = 0; i < checkbox.length; i++){
            if (checkbox[i].checked === true){
                type_room =checkbox[i].value;
            }
        }
    //chọn giá thấp nhất    
    var minprice = $('#minPrices').find(":selected").val();    

    //chọn giá cao nhất
    var maxprice = $('#maxPrices').find(":selected").val();     
                
    //in kết quả
    alert(city+" "+district+" "+type_room+" "+minprice+" "+maxprice);
	
});