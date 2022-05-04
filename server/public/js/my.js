// JavaScript Document
$(document).ready(function () {

	$('#product-button').click(function(){
		$('#service-hide').fadeOut();
		$('#product-hide').fadeIn();
		
		return false;
	});
	
	$('#service-button').click(function(){
		$('#product-hide').fadeOut();
		$('#service-hide').fadeIn();
		
		return false;
	});
	
});