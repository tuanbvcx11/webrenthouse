// hàm load tin nhắn
function loadMessage () {
	// body... 
	$.ajax({
        url : "module/function/load-message.php",
        type : 'post',
        dataType : 'json',
        data : {
        },
        success : function (result){
            var html = "";
            $.each(result, function (key, item){
                if (item.action ==  "receive") {
                	html += `<div class="admin-message">
			                    
			                    <div>` + item.message +`</div>
			                </div>  
			                <div class="clear"></div>`;
                } else {
                	html += `<div class="user-message">
			                    
			                    <div>` + item.message +`</div>
			                </div>  
			                <div class="clear"></div>`;
                }
            });

            $('.contain-message').html(html);
            $('.contain-message').scrollTop($('.contain-message').prop("scrollHeight"),1);
        },
        error : function (result) {
            // alert("lỗi");
        }
    });
}

// hàm gửi tin nhắn
function send() {
	// body... 
	var message = $('.send-message input').val();
	if (message == '') {

	} else {
		// gửi tin nhắn lên server
		$.ajax({
	        url : "module/function/send-message.php",
	        type : 'post',
	        dataType : 'text',
	        data : {
	        	message : message
	        },
	        success : function (result){
	            
	        },
	        error : function (result) {
	            alert("lỗi");
	        }
	    });

		$('.send-message input').val('');
	}
		
}


$('.send-message i').click(function(event) {
	/* Act on the event */
	send();
	loadMessage();
});

$('.send-message input').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        send(); 
        loadMessage();
    }
});

$(document).ready(function() {
	// check session
	$.ajax({
        url : 'module/function/checkss-header.php',
        type : 'post',
        dataType : 'text',
        data : {
        },
        success : function (result){
            if (result == 'host') {
            	
            } else {
            	alert("bạn không phải chủ trọ");
            	location.assign("home.html");
            }
        },
        error : function (result) {
            //alert("lỗi");
        }
    });

	$('.contain-message').scrollTop($('.contain-message').height(),1);
	loadMessage();


    var pusher = new Pusher('7b20795b600d93a462e2', {
      cluster: 'ap1'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
        loadMessage();
    });

});