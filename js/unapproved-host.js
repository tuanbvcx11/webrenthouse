// hàm load các user chưa được phê duyệt
function loaduser () {
	// body... 
	$.ajax({
        url : "module/function/unapproved-host.php",
        type : 'post',
        dataType : 'json',
        data : {
        },
        success : function (result){
            var html = "";
            $.each(result, function (key, item){
                html += '<tr>';
                html += '<td>' + item.id_user + "</td>";
                html += '<td>' + item.name + "</td>";
                html += '<td>' + item.username + "</td>";
                html += '<td title="'+ item.password +'">' + item.password.substr(0, 20) + "..." + "</td>";
                html += '<td>' + item.dia_chi + "</td>";
                html += '<td>' + item.sdt + "</td>";
                html += '<td><button class="btn btn-primary">Duyệt</button></td>';
                html += '</tr>';
            });

            if (html == "") {
            	html += '<tr>';
            	html += '<td colspan="7" class="justify-content-center">' + 'không có tài khoản nào cần phê duyệt' + "</td>";
            	html += '<tr>';
            }

            $('#bodyuser').html(html);
        },
        error : function (result) {
            alert("sai");
        }
    });
}


//hàm khi admin phê duyệt tài khoản
function updateuser (id) {
	// body... 
	$.ajax({
        url : "module/function/update-host.php",
        type : 'post',
        dataType : 'text',
        data : {
        	id_user : id
        },
        success : function (result){
            if(result == 'ok') {
            	alert("duyệt thành công");
            } else {
            	alert("sai");
            }
        },
        error : function (result) {
            alert("lỗi");
        }
    });
}

$(document).ready(function() {
	loaduser();

    var pusher = new Pusher('12ea60284f12037878c4', {
        cluster: 'ap1'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
        loaduser();
    });

	$("body").on("click", ".tab button", function(){
        var id = $(this).parent().parent().children().first().text();
		updateuser(id);
		loaduser();
    });
});
