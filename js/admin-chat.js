//ham load message

$(document).ready(function() {
	//load(danh sach chat)
    //load(message)
    $('.contain-message').scrollTop($('.contain-message').height(),1);

});


$('.list-user .user').click(function(event) {
	/* Act on the event */
	$(this).parent().children().removeClass('active');
	$(this).addClass('active');
	console.log($(this).children('.name-user').children('span').text());
	//load lai(message)
});

$('.send-message button').click(function(event) {
	/* Act on the event */
	var tinnhan = $(this).parent().parent().children('input').val();
	//gui tin nhan
	//load lai(message)
});

