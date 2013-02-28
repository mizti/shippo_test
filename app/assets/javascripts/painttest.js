$(function() {
	$( "#slidertest" ).slider();
	var offset = 5;
	var startX;
	var startY;
	var brushSize = 1;
	var alphaSize = 1;
	var brushColor = '#000000';
	var flag = false;
	var canvas = $('canvas').get(0);

	if (canvas.getContext){
		var context = canvas.getContext('2d');
	}
	context.fillStyle = "#FFFFFF";
	context.fillRect(0, 0, canvas.width, canvas.height);
	var picker = $.farbtastic('#colorpicker');
	picker.linkTo($('#color'));

	$('#slider1').slider({
		min: 1,
		max: 100,
		value: 1,
		slide: function(evt, ui){
			brushSize = ui.value;
			$("#bw").val(brushSize);
		}
	});
	$('#slider2').slider({
		min: 1,
		max: 100,
		value : 100,
		slide : function(evt, ui){
			alpha = ui.value;
			$('#alpha').val(alpha);
			if(alpha == 100){
				alphaSize = 1;
			}else if(alpha <= 9){
				alphaSize = '0.0' + alpha;
			}else if(alpha >= 10){
				alphaSize = '0.' + alpha;
			}
		}
	});
	
	$('#bw').val($('#slider1').slider('value'));
	$('#alpha').val($('#slider2').slider('value'));
	$('#slider2').css({'background-image':'url(/assets/draw/alpha.gif)','background-position':'0px -2px'});

	$('.color-cell').addClass('ofclick');
	$('.color-cell').click(function() {
		clic_color = new RGBColor($(this).css('background-color'));

		picker.setColor(clic_color.toHex());
		$('.color-cell').removeClass('clicked');
		$(this).addClass('clicked');
	});

	$('#main_canvas').click(function(e) {
		var getspuit = $('#spuit').is(':checked');
		if(getspuit == true){
			spuitImage = context.getImageData(startX, startY, 1, 1);
			r = spuitImage.data[0];
			g = spuitImage.data[1];
			b = spuitImage.data[2];
			spuit_color = new RGBColor('rgb(' + r +','+ g + ',' + b +')');
			picker.setColor(spuit_color.toHex());
		}
	});
	$('#main_canvas').mousedown(function(e) {
		undoImage = context.getImageData(0, 0, $('#main_canvas').width(), $('#main_canvas').height());
		flag = true;
		startX = e.pageX - $(this).offset().left - offset;
		startY = e.pageY - $(this).offset().top - offset;
		return false; // for chrome
	});

	$('canvas').mousemove(function(e) {
		if (flag) {
			var endX = e.pageX - $('canvas').offset().left - offset;
			var endY = e.pageY - $('canvas').offset().top - offset;
			var brushColor = picker.color;

			if($('#brush1').is(':checked')){ //通常
				drawLine(startX, startY, endX,endY, context, alphaSize, brushSize, brushColor, 0, null,'round', 'round', 'source-over');
			}else if($('#brush2').is(':checked')){ //ぼかし1
				drawLine(startX, startY, endX,endY, context, alphaSize, brushSize , brushColor, brushSize, brushColor,'round', 'round', 'source-over');
			}else if($('#brush3').is(':checked')){ //ぼかし2
				drawLine(startX, startY, endX,endY, context, alphaSize, brushSize * 2, brushColor, brushSize * 2, brushColor, 'round', 'round', 'source-over');
			}else if($('#brush4').is(':checked')){ //パステル
				drawLine(startX, startY, endX,endY, context, 0.1, brushSize * 2, '#ffffff', brushSize * 2, brushColor,'miter', 'butt', 'source-over');
			}else if($('#miter').is(':checked')){ //四角
				drawLine(startX, startY, endX,endY, context, alphaSize, brushSize , brushColor, 0, null, 'miter', 'butt', 'source-over');
			}else if($('#eraser').is(':checked')){ //消しゴム
				drawLine(startX, startY, endX,endY, context, alphaSize, brushSize, '#FFFFFF', 0, null, 0,'round', 'round', 'destination-out');
			}
			startX = endX;
			startY = endY;
		}
	});
	$('#main_canvas').on('mouseup', function() {
		getImage = context.getImageData(0, 0, $('#main_canvas').width(), $('#main_canvas').height());
		flag = false;
	});
	$('#main_canvas').on('mouseleave', function() {
		getImage = context.getImageData(0, 0, $('#main_canvas').width(), $('#main_canvas').height());
		flag = false;
	});
	$('#undo').click(function(e) {
		context.putImageData(undoImage,0,0);
	});
	$('#restore').click(function(e) {
		context.putImageData(getImage,0,0);
	});
	$('#clear').click(function(e) {
		e.preventDefault();
		context.clearRect(0, 0, $('#main_canvas').width(), $('#main_canvas').height());
	});
	$('#save').click(function() {
		var d = canvas.toDataURL('image/png');
		
		//d = d.replace('image/png', 'image/octet-stream');
		//window.open(d, 'save');
	});

	//TODO:
	//無限Undo
	//アップロードできるように
	//一旦モーダルを開くようにしたい
	//ドットで描画される線をなめらかにしたい
});

function drawLine(startX, startY, endX, endY, context, alpha, brushSize, brushColor, shadowSize, shadowColor, lineJoin, lineCap, method){
	context.globalAlpha = alpha;
	context.beginPath();
	context.globalCompositeOperation = method;
	context.strokeStyle = brushColor;
	context.lineWidth = brushSize;
	context.lineJoin= lineJoin;
	context.lineCap = lineCap;
	context.shadowBlur = shadowSize;
	context.shadowColor = shadowColor;
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.moveTo(startX, startY);
	context.lineTo(endX, endY);
	context.stroke();
	context.closePath();
}
