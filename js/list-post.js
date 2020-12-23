$(document).ready(function() {

	$("#myInput").on("keyup", function() {
	    var value = $(this).val().toLowerCase();
	    $("table tbody tr").filter(function() {
	      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	    });
	  });

	var idpost;
	var action;


	// hàm load các bài viết tùy theo loại bài viết
	function load_post () {
		// body... 
		$("#myInput").val('');
		var type = $('#type_post').val();
		// gửi type lên server để hiển thị các bài viết có loại đó
		$.ajax({
	        url : "module/function/list-post.php",
	        type : 'post',
	        dataType : 'json',
	        data : {
	        	type : $('#type_post').val()
	        },
	        success : function (result){

	        	if (type == "approved"){
	        		var html = `<table class="table table-striped table-bordered approved">
			                        <thead>
			                            <tr>
			                                <th id="id">ID</th>
			                                <th id="hoten">Tên chủ trọ</th>
			                                <th id="content-post">Tiêu đề bài viết</th>
			                                <th id="time">Thời gian đăng</th>
	                                		<th id="time-live">Hiển thị</th>
			                                <th id="status"></th>
			                            </tr>
			                        </thead>
			                        <tbody class="bodypost">`;
		            $.each(result, function (key, item){
		                html += `<tr>
	                                <td class="idpost">`+ item.id_post + `</td>
	                                <td>` + item.name +`</td>
	                                <td>` + item.tieu_de +`</td>
	                                <td>` + item.tg_dang_bai +`</td>
	                                <td>` + item.tg_hien_thi +` ngày</td>
	                                <td><button class="btn btn-primary xem">Xem</button></td>
	                            </tr>`;
		            });

		            html += `</tbody>
	                    </table>`;
	        	} 
	        	else if (type == "unapproved") {
	        		var html = `<table class="table table-striped table-bordered unapproved">
			                        <thead>
			                            <tr>
			                                <th id="id">ID</th>
			                                <th id="hoten">Tên chủ trọ</th>
			                                <th id="content-post">Tiêu đề bài viết</th>
			                                <th id="time">Thời gian đăng</th>
	                                		<th id="time-live">Hiển thị</th>
			                                <th id="status"></th>
			                            </tr>
			                        </thead>
			                        <tbody class="bodypost">`;
		            $.each(result, function (key, item){
		                html += `<tr>
	                                <td class="idpost">`+ item.id_post + `</td>
	                                <td>` + item.name +`</td>
	                                <td>` + item.tieu_de +`</td>
	                                <td>` + item.tg_dang_bai +`</td>
	                                <td>` + item.tg_hien_thi +` ngày</td>
	                                <td><button class="btn btn-primary xem">Xem</button><button class="btn btn-primary accept" data-toggle="modal" data-target="#duyet">Duyệt</button><button class="btn btn-secondary del"data-toggle="modal" data-target="#xoa">Xóa</button></td>
	                            </tr>`;
		            });

		            html += `</tbody>
	                    </table>`;
	        	} else if (type == "banned") {
	        		var html = `<table class="table table-striped table-bordered banned">
			                        <thead>
			                            <tr>
			                                <th id="id">ID</th>
			                                <th id="hoten">Tên chủ trọ</th>
			                                <th id="content-post">Tiêu đề bài viết</th>
			                                <th id="time">Thời gian đăng</th>
	                                		<th id="time-live">Hiển thị</th>
			                                <th id="status"></th>
			                            </tr>
			                        </thead>
			                        <tbody class="bodypost">`;
		            $.each(result, function (key, item){
		                html += `<tr>
	                                <td class="idpost">`+ item.id_post + `</td>
	                                <td>` + item.name +`</td>
	                                <td>` + item.tieu_de +`</td>
	                                <td>` + item.tg_dang_bai +`</td>
	                                <td>` + item.tg_hien_thi +` ngày</td>
	                                <td><button class="btn btn-primary" data-toggle="modal" data-target="#khoiphuc">Khôi phục</button></td>
	                            </tr>`;
		            });

		            html += `</tbody>
	                    </table>`;
	        	}
	            $('.each-post').html(html);


				if ($('.each-post .bodypost').html() == "") {
		        	html1 = '<tr>';
		        	html1 += '<td colspan="6" class="justify-content-center">' + '<h5>Không có bài viết nào</h5>' + "</td>";
		        	html1 += '<tr>';
		        	$('.each-post .bodypost').html(html1);
		        }
	            
	        },
	        error : function (result) {
	            alert("sai");
	        }
	    });
	}


	// hàm update status của từng bài viết
	function update_post (idpost, action) {
		// body... 
		// gọi ajax để update idpost với action
		$.ajax({
	        url : "module/function/update-post.php",
	        type : 'post',
	        dataType : 'text',
	        data : {
	        	idpost : idpost,
	        	action : action
	        },
	        success : function (result){
	        	var thongbao = "";
	        	if (action == "duyet") {
	        		thongbao = "Duyệt thành công";
	        	} else if (action == 'xoa') {
	        		thongbao = 'Xóa thành công';
	        	} else thongbao = "Khôi phục thành công";
	        	if (result == "ok") {
	        		alert(thongbao);
	        	}
	        	load_post();
	        },
	        error : function (result) {
	            alert("sai");
	        }
	    });
	}

	load_post();

	$('#type_post').change(function(event) {
		/* Act on the event */
		load_post();
		// load về trang 1
	});

	$("body").on("click", ".bodypost button", function(){
		/* Act on the event */
		idpost = $(this).parent().parent().children('.idpost').text();

		if ($(this).hasClass('xem')) {
			// đi đến trang thông tin bài viết
			alert(idpost);

		} else {
			$(".modal .modal-body").text('bài viết số ' + idpost + ' không?');
		}
		
	});

	$('#duyet .btn-primary').click(function(event) {
		/* Act on the event */
		action = 'duyet';
		update_post(idpost, action);
	});

	$('#xoa .btn-primary').click(function(event) {
		/* Act on the event */
		action = 'xoa';
		update_post(idpost, action);
	});

	$('#khoiphuc .btn-primary').click(function(event) {
		/* Act on the event */
		// alert($('#type_post').val());
		action = 'khoiphuc';
		update_post(idpost, action);
	});




	var pusher = new Pusher('b06168af2fefdf2d1ba2', {
      cluster: 'ap1'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      load_post();
    });

});