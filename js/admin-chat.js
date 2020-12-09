// hàm cắt chuỗi
function sub_str (str) {
    // body... 
    if (str.length > 30) {
        return str.substr(0, 30) + "...";
    } else {
        return str;
    }
}

// hàm lấy last name
function get_last_name(str) {
    // body... 
    var arr = str.split(" ");
    return arr[arr.length -1] + ': ';
}

//hàm update tin nhắn đã đọc khi click vào tin nhắn đó
function update_mess(idhost) {
    // body... 
    $.ajax({
        url : "module/function/update-message.php",
        type : 'post',
        dataType : 'text',
        data : {
            idhost : idhost
        },
        success : function (result){
            console.log(result);
        },
        error : function (result) {
            alert("lỗi");
        }
    });
}


// hàm load danh sach chat
function loadUser(idhost) {
	// body... 
	$.ajax({
        url : "module/function/list-host-chat.php",
        type : 'post',
        dataType : 'json',
        data : {
        },
        success : function (result){
            var html = "";
            $.each(result, function (key, item){
                if (item.action == 'receive') {
                    var last_name = 'Bạn: ';
                } else {
                    var last_name = get_last_name(item.name);
                }

                if (item.id_host == idhost) {
                    html += `<div class="user active">
                                <div class="name-user"><span class="name">` + item.name + `</span><span class="id-host">` + item.id_host + `</span></div>
                                <div class="sub-content-chat">` + last_name + sub_str(item.last_message) + `</div>
                            </div>`;
                } else {
                    if (item.status == '1') {
                        html += `<div class="user">
                                <div class="name-user"><span class="name">` + item.name + `</span><span class="id-host">` + item.id_host + `</span></div>
                                <div class="sub-content-chat">` + last_name + sub_str(item.last_message) + `</div>
                                <i class="fas fa-circle"></i>
                            </div>`;
                    } else {
                        html += `<div class="user">
                                    <div class="name-user"><span class="name">` + item.name + `</span><span class="id-host">` + item.id_host + `</span></div>
                                    <div class="sub-content-chat">` + last_name + sub_str(item.last_message) + `</div>
                                </div>`;
                    } 
                }
                
            });

            $('.list-user').html(html);
        },
        error : function (result) {
            // alert("lỗi");
        }
    });
}


//ham load tin nhan
function loadMessage (idhost) {
    // body... 
    $.ajax({
        url : "module/function/load-message.php",
        type : 'post',
        dataType : 'json',
        data : {
            id_host : idhost
        },
        success : function (result){
            var html = "";
            $.each(result, function (key, item){
                if (item.action ==  "receive") {
                    html += `<div class="admin-message">
                                <div></div>
                                <div>` + item.message +`</div>
                            </div>  
                            <div class="clear"></div>`;
                } else {
                    html += `<div class="user-message">
                                <div></div>
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
function send(idhost) {
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
                message : message,
                id_host : idhost
            },
            success : function (result){
                //load lại (user)
                loadUser(idhost);
                //load lai(message)
                loadMessage(idhost);
            },
            error : function (result) {
                alert("lỗi");
            }
        });

        $('.send-message input').val('');
    }
        
}

$(document).ready(function() {

    var idhost = 0;
    //load(danh sach chat)
	loadUser(idhost);
    //load(message)
    $('.contain-message').scrollTop($('.contain-message').prop("scrollHeight"),1);

    if (idhost == 0) {
        var pusher = new Pusher('7b20795b600d93a462e2', {
          cluster: 'ap1'
        });

        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
            //update lại tin nhắn đang active
            
             update_mess(idhost);
            //load lại (user)
            loadUser(idhost);
            //load lai(message)
            loadMessage(idhost);

            pusher.disconnect();
        });


    }    
    

});


$("body").on("click", ".list-user .user", function(){
    $('.content-chat-start').css('display', 'none');
    $('.content-chat').css('display', 'block');
	/* Act on the event */
	$(this).parent().children().removeClass('active');
	$(this).addClass('active');

    //xoa tag i
    $(this).children('i').remove();
	var name = $(this).children('.name-user').children('span:first-child').text();
    $('.chat-user h2 span').text(" (" + name + ")");

    idhost = $(this).children('.name-user').children('span:nth-child(2)').text();

    update_mess(idhost);
    //load message
    loadMessage(idhost);
});

$('.send-message i').click(function(event) {
	/* Act on the event */
	//gui tin nhan
    send(idhost);
	
});

$('.send-message input').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        //gui tin nhan
        send(idhost);
    }
});

var pusher2 = new Pusher('7b20795b600d93a462e2', {
  cluster: 'ap1'
});

var channel = pusher2.subscribe('my-channel');
channel.bind('my-event', function(data) {
    //update lại tin nhắn đang active
    update_mess(idhost);
    //load lại (user)
    loadUser(idhost);
    //load lai(message)
    loadMessage(idhost);
});



