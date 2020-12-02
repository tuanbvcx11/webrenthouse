function loaduser () {
    // body... 
    $.ajax({
        url : "module/function/approved-host.php",
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
                html += '</tr>';
            });

            

            $('#bodyuser').html(html);
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


});