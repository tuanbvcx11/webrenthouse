$('.dislike').click(function(event){
	var id = $(this).parent().find('.idPost').text();
	alert(id);
});