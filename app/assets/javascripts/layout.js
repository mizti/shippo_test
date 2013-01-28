$(document).ready(function(){
	var original_message = "";
	$('#already_login_button').mouseover(function(){
		$(this).removeClass('btn-primary');
		$(this).addClass('btn-danger');
		$(this).removeClass('icon-user');
		$(this).addClass('icon-off');
		
		original_message = $(this).html();
		$(this).html('ログアウトする');
	}).mouseout(function(){
		$(this).removeClass('btn-danger');
		$(this).addClass('btn-primary');
		$(this).removeClass('icon-off');
		$(this).addClass('icon-user');
		$(this).html(original_message);
	}).click(function(){
		document.location = "/signout";
	});

	$('#login_button').click(function(){
		document.location = "/auth/twitter";
	});
});
