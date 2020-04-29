/*
 * @about msgtip 提示框alert
 * @param {string} str alert的内容
 * @param {number =2} time  alert显示时长（可选，不填则为2秒）
 * @param {string} type alert类型（可选，有 info，ok，warn，danger4种类型，不填则默认为info）
 * @param {boolean} stay 是否会自动消失（可选，不填则会自动消失，为true则不会自动消失）
 */
function msgtip(str,time,type,stay){
	if(typeof time=='string'){
		type = time;
		time = 2;
	}

	var style = [];
	if(!msgtip.obj){
		style.push('left:0');
		style.push('top: 5px');
		style.push('z-index:9999999999');
		style.push('min-width:200px');
		style.push('min-height:35px');
		style.push('border-radius: 4px');
		style.push('font-size:12px');
		style.push('color:#FFF');
		style.push('box-sizing:border-box');
		style.push('position:fixed');
		style.push('line-height: 1.5em;');
		style.push('text-align: center;');
		style.push('padding: 8px 25px;');
		msgtip.obj = $('<div style="'+style.join(';')+'"></div>').appendTo("body");
	}

	if (type == 'ok') {
		var bgColor = '#dff0d8';
		var textColor = '#3c763d';
		var borderStyle = '1px solid #accaac';
	} else if (type == 'warn') {
		var bgColor = '#fcf8e3';
		var textColor = '#8a6d3b';
		var borderStyle = '1px solid #dcc8ad';
	} else if (type == 'danger') {
		var bgColor = '#f2dede';
		var textColor = '#a94442';
		var borderStyle = '1px solid #d8b3b2';
	} else if (type == 'white') {
		var bgColor = '#ffffff';
		var textColor = 'rgba(0,0,0,0.87)';
		var borderStyle = '1px solid rgba(120,130,140,0.25)';
		var boxShadow = '0 0 4px 0 rgba(120,130,140,0.13)';
		var borderRadius = "2px";
		var padding = "8px";
		var fontSize = "14px";
		var boxWidth = "300px";
	} else if (type == 'cli_white') {
		var bgColor = '#ffffff';
		var textColor = 'rgba(0,0,0,0.87)';
		var borderStyle = '1px solid rgba(120,130,140,0.25)';
		var boxShadow = '0 0 4px 0 rgba(120,130,140,0.13)';
		var borderRadius = "2px";
		var padding = "8px";
		var fontSize = "14px";
		var boxWidth = "200px";
	} else if (type == 'info' || typeof type =='undefined') {
		var bgColor = '#bcdff1';
		var textColor = '#31708f';
		var borderStyle = '1px solid #a0cad6';
	}
	if (type == 'cli_white') {
		var closeBtn = '<span id="alertPlugin-close" style="position: absolute;right: 10px;top: 4px; cursor: pointer; color:#bbb; font-size: 18px; display: none;">×</span>';
	} else {
		var closeBtn = '<span id="alertPlugin-close" style="position: absolute;right: 10px;top: 7px; cursor: pointer;">×</span>';
	}
	msgtip.obj.html(str+closeBtn);
	msgtip.obj.css({
		'left' : parseInt((document.documentElement.clientWidth/2)-(msgtip.obj.outerWidth()/2)),
		'background': bgColor,
		'color': textColor,
		'border': borderStyle,
		'border-radius': borderRadius,
		'box-shadow': boxShadow,
		'padding': padding,
		'font-size': fontSize,
		'width': boxWidth
	});
	msgtip.obj.fadeIn(500);
	if (msgtip.timer) clearTimeout(msgtip.timer);

	if (!stay) {
		msgtip.obj.hover(function(){
			clearTimeout(msgtip.timer);
		},function(){
			msgtip.timer = setTimeout(function(){
				msgtip.obj.fadeOut(500);
			},time?time*1000:2000);
		});
		msgtip.timer = setTimeout(function(){
			msgtip.obj.fadeOut(500);
		},time?time*1000:2000);
	} else {
		msgtip.obj.off();
		clearTimeout(msgtip.timer);
	}
	$('#alertPlugin-close').click(function(){
		msgtip.obj.fadeOut(500);
	})
}
function _alert(str){
	return confirm(str);
}
function alert(str,time,type,stay){
	msgtip(str,time,type,stay);
}