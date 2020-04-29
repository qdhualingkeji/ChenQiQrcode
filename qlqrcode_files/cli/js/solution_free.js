var FreeDialogDocument = {
	'OpenFreeInfo': ['<div class="JoinFree-common-bg" OpenFreeInfo>',
		'    <div class="free-info-content">',
		'        <h4 class="text-green text-center p-b">开通解决方案版（16800元/年）15天免费试用</h4>',
		'        <h5 class="text-grey text-center p-b">超过3200个大中型建筑施工项目 正在使用</h5>',

		'        <div class="free-info-content-col m-b p-b p-t clearfix">',
		'            <div class="pull-left _l m-r-sm">',
		'                <p class="_l_title p-t p-b">轻量化云平台</p>',
		'                <p class="_l_body"><i class="fa fa-check check_yes text-green m-r-xs"></i>信息共享</p>',
		'                <p class="_l_body"><i class="fa fa-check check_yes text-green m-r-xs"></i>移动办公</p>',
		'                <p class="_l_body"><i class="fa fa-check check_yes text-green m-r-xs"></i>统计报表</p>',
		'            </div>',
		'            <div class="pull-left _l m-r-sm" style="padding: 20px 28px;text-align: left;">',
		'                <p class="_l_title p-t p-b" style="text-align: center;">精细化管理</p>',
		'                <p class="_l_body"><i class="fa fa-check check_yes text-green m-r-xs"></i>现场扫码记录</p>',
		'                <p class="_l_body"><i class="fa fa-check check_yes text-green m-r-xs"></i>人员权限管理</p>',
		'                <p class="_l_body"><i class="fa fa-check check_yes text-green m-r-xs"></i>异常情况短信通知</p>',
		'                <p class="_l_body"><i class="fa fa-check check_yes text-green m-r-xs"></i>支持3D及CAD文件</p>',
		'            </div>',
		'            <div class="pull-left _l">',
		'                <p class="_l_title p-t p-b">专属顾问服务</p>',
		'                <p class="_l_body"><i class="fa fa-check check_yes text-green m-r-xs"></i>行业场景模版</p>',
		'                <p class="_l_body"><i class="fa fa-check check_yes text-green m-r-xs"></i>行业应用培训</p>',
		'                <p class="_l_body"><i class="fa fa-check check_yes text-green m-r-xs"></i>全程技术支持</p>',
		'            </div>',
		'        </div>',
		'        <div class="JoinStep-common-footer text-center">',
		'            <button class="btn btn-outline b-green text-green m-r" id="noFree" solution-free-data-statistics="noFree">暂不开通</button>',
		'            <button class="btn green" id="openFree" solution-free-data-statistics="openFree">开始体验</button>',
		'        </div>',
		'    </div>',
		'</div>'
	].join(""),
	'ExpiredFreeBack': ['<div class="JoinFree-common-bg" ExpiredFreeBack>',
		'    <div class="free-expired-content">',
		'        <div class="expired-close" expired-close>',
		'            <span aria-hidden="true">×</span>',
		'        </div>',
		'        <h3 class="text-green text-center p-b">你的解决方案版试用已到期</h3>',
		'        <h6 class="text-grey text-center p-b"><span>试用时间：   </span><span startTime>  2017-11-11  </span><span>  至  </span><span endTime>  2017-12-12</span></h6>',
		'        <div class="free-expired-content-col m-b clearfix">',
		'            <p class="_l_title p-b">账号已恢复为试用前版本，无法继续使用解决方案版的高级功能。<br />如需开通正式版本，或延长试用，可直接咨询行业顾问：姜工 18268566648</p>',
		'            <a class="btn green" href="//q.url.cn/CDsY7l?_type=wpa&qidian=true" style="margin-top:6px;" target="_blank" need-ask solution-free-data-statistics="openQQ1">QQ咨询</a>',
		'        </div>',
		'        <h6 class="text-grey text-center p-t p-b">你仍然可以  <a class="text-green" style="font-weight:bold;" id="more">使用活码</a>  制作项目信息展示、技术交底等场景的二维码</h6>',
		'    </div>',
		'</div>'
	].join(""),
	'ExpiredBack': ['<div class="JoinFree-common-bg" ExpiredBack>',
		'    <div class="free-expired-content">',
		'        <div class="expired-close" expired-close>',
		'            <span aria-hidden="true">×</span>',
		'        </div>',
		'        <h3 class="text-green text-center p-b">你的解决方案版已到期</h3>',
		'        <div class="free-expired-content-col m-b clearfix" style="height:170px;">',
		'            <p class="_l_title p-b">账号已恢复为免费版，图片文件容量降为50M，且无法继续使用解决方案版的高级功能，为不影响你的正常使用，请及时续费。<br />有任何问题可咨询售后支持：姜工  18268566648</p>',
		'            <a class="btn green" href="//q.url.cn/CDsY7l?_type=wpa&qidian=true" target="_blank"  style="margin-top:6px;" need-ask solution-free-data-statistics="openQQ1">QQ咨询</a>',
		'        </div>',
		'        <h6 class="text-grey text-center p-t p-b">你仍然可以  <a class="text-green" style="font-weight:bold;" id="more">使用活码</a>  制作项目信息展示、技术交底等场景的二维码</h6>',
		'    </div>',
		'</div>'
	].join(""),
	'ExpiredFreeFront': ['<div class="JoinFree-common-bg" ExpiredFreeFront>',
		'    <div class="free-expired-front-content">',
		'        <div class="expired-close" expired-close>',
		'            <span aria-hidden="true">×</span>',
		'        </div>',
		'        <h3 class="text-green text-center p-b">你的解决方案版试用已到期</h3>',
		'        <h5 class="text-grey text-center"><span>试用时间：   </span><span startTime>  2017-11-11  </span><span>  至  </span><span endTime>  2017-12-12</span></h5>',
		'        <p class="_l_title p-t p-b" style="color+#666;font-size: 15px;text-align: left;">账号已恢复为试用前版本，无法继续使用解决方案版的高级功能。<br />如需开通正式版本，或延长试用，可直接咨询行业顾问：姜工 18268566648</p>',
		'        <a class="btn green" href="//q.url.cn/CDsY7l?_type=wpa&qidian=true" target="_blank" need-ask solution-free-data-statistics="openQQ">QQ咨询</a>',
		'    </div>',
		'</div>'
	].join("")

}

var _host = '',
	STATIC_SERVICE = '',
	now_host = window.location.host;
if (now_host.slice(-3) == '.me') {
	_host = 'cli.me';
	STATIC_SERVICE = 'static.cli.me/cli'; //测试--本地
} else if (now_host.slice(-4) == '.net') {
	_host = 'cliim.net';
	STATIC_SERVICE = 'static-develop.clewm.net/cli'; //测试--net
} else if (now_host.slice(-4) == '.com') {
	_host = 'cliim.com';
	STATIC_SERVICE = 'static-test.clewm.net/cli'; //测试--com
} else {
	_host = 'cli.im';
	STATIC_SERVICE = 'static.clewm.net/cli';
}
var STATIC_DOMAIN = "//" + STATIC_SERVICE + "/";

loadCss(STATIC_DOMAIN + "css/solution_free.css");
loadJs(STATIC_DOMAIN + "js/building_info_complete.js");

var RenderFreeDialogHtml = function(attr, status, ismodify) {
	var $Attr = $("[" + attr + "]");
	if (status == "hide") {
		$Attr.hide();
	} else if (status == "remove") {
		$Attr.remove();
	} else {
		if ($Attr.length == 0) {
			$("body").append(FreeDialogDocument[attr]);
			if (attr == "ExpiredFreeBack") {
				var MidObj = new ExpiredFreeBack(ismodify);
				MidObj.RequestData();
			}
		} else {
			$Attr.show();
		}
	}
}

var OpenFreeInfoObj, ExpiredFreeBackObj, ExpiredFreeFrontObj;
var is_front = 1; //是否前后台
var ViewFreeDialogInfo = function(type, from) {
	// 初始化步骤对象
	if (type == 'OpenFreeInfo') {
		OpenFreeInfoObj = FreeFactory("OpenFreeInfo", "modify");
		OpenFreeInfoObj.RenderDoc();
	} else if (type == 'ExpiredFreeBack') {
		ExpiredFreeBackObj = FreeFactory("ExpiredFreeBack", "modify");
		ExpiredFreeBackObj.RenderDoc();
	} else if (type == 'ExpiredFreeFront') {
		ExpiredFreeFrontObj = FreeFactory("ExpiredFreeFront", "modify");
		ExpiredFreeFrontObj.RenderDoc();
	} else if (type == 'ExpiredBack') {
		ExpiredFreeBackObj = FreeFactory("ExpiredBack", "modify");
		ExpiredFreeBackObj.RenderDoc();
	}

	is_front = from == 2 ? 0 : 1;
}

//步骤控制器
var FreeFactory = function(name, entrance) {
	switch (name) {
		case 'OpenFreeInfo':
			return new OpenFreeInfo(entrance);
		case 'ExpiredFreeBack':
			return new ExpiredFreeBack(entrance);
		case 'ExpiredFreeFront':
			return new ExpiredFreeFront(entrance);
		case 'ExpiredBack':
			return new ExpiredBack(entrance);
	}
}

var LoadingOperation = function(status) {
	if (status == "show") {
		if ($(".JoinStep-common-loading").length == 0) {
			$("body").append('<div class="JoinStep-common-loading" style="display:block;z-index: 999999;"><img src="//static.clewm.net/cli/images/user/userclickloading.gif"/><span class="JoinStep-common-loading-prompt">加载中...</span></div>');
		} else {
			$(".JoinStep-common-loading").show();
		}
	} else if (status == "hide") {
		$(".JoinStep-common-loading").hide();
	}
}

//开通试用的弹窗
var OpenFreeInfo = function(entrance) {
	this.entrance = entrance;
}
OpenFreeInfo.prototype = {
	RenderDoc: function() {
		RenderFreeDialogHtml("OpenFreeInfo", "show", this.entrance);
	},
	HideDoc: function() {
		RenderFreeDialogHtml("OpenFreeInfo", "hide");
	}
};

//试用到期的弹窗(后台)
var ExpiredFreeBack = function(entrance) {
	this.entrance = entrance;
}
ExpiredFreeBack.prototype = {
	RenderDoc: function() {
		RenderFreeDialogHtml("ExpiredFreeBack", "show", this.entrance);
	},
	HideDoc: function() {
		RenderFreeDialogHtml("ExpiredFreeBack", "hide");
	},
	RequestData: function() {
		$.ajax({
			type: "get",
			url: '//user.' + _host + '/api/index/get_probation_info',
			dataType: "jsonp",
			success: function(ret) {
				var start_time = ret.start_time,
					end_time = ret.end_time;
				if (start_time != 0) {
					start_time = getLocalTime(parseInt(start_time));
				}
				if (end_time != 0) {
					end_time = getLocalTime(parseInt(end_time));
				}
				$('[startTime]').html(start_time);
				$('[endTime]').html(end_time);
			}
		});
	}
};

//正式版本到期的弹窗(后台)
var ExpiredBack = function(entrance) {
	this.entrance = entrance;
}
ExpiredBack.prototype = {
	RenderDoc: function() {
		RenderFreeDialogHtml("ExpiredBack", "show", this.entrance);
	},
	HideDoc: function() {
		RenderFreeDialogHtml("ExpiredBack", "hide");
	}
};

//试用到期的弹窗(前台)
var ExpiredFreeFront = function(entrance) {
	this.entrance = entrance;
}
ExpiredFreeFront.prototype = {
	RenderDoc: function() {
		RenderFreeDialogHtml("ExpiredFreeFront", "show", this.entrance);
	},
	HideDoc: function() {
		RenderFreeDialogHtml("ExpiredFreeFront", "hide");
	},
	RequestData: function() {
		$.ajax({
			type: "get",
			url: '//user.' + _host + '/api/index/get_probation_info',
			dataType: "jsonp",
			success: function(ret) {
				var start_time = ret.start_time,
					end_time = ret.end_time;
				if (start_time != 0) {
					start_time = getLocalTime(parseInt(start_time));
				}
				if (end_time != 0) {
					end_time = getLocalTime(parseInt(end_time));
				}
				$('[startTime]').html(start_time);
				$('[endTime]').html(end_time);
			}
		});
	}
};

//转换时间戳
function getLocalTime(endTime, nosecond) {
	//return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
	var dateTime = new Date(parseInt(endTime) * 1000);
	Y = dateTime.getFullYear() + '-';
	M = (dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1) + '-';
	D = (dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate()) + ' ';
	h = (dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours()) + ':';
	m = (dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes()) + ':';
	s = dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds();
	var date_time = Y + M + D;
	return date_time;
};

//开始体验 （开通面试试用，并跳转到解决方案的目录）
$(document).on("click", "#openFree", function() {
	var _this = $(this);
	_this.html('开通中...').addClass('disabled');
	LoadingOperation("show");
	//先判断是否完善过信息  is_full=1表示已完善过信息，直接开通并跳转，否则完善信息
	$.ajax({
		type: "get",
		url: '//user.' + _host + '/api/index/get_biz_info',
		dataType: "jsonp",
		success: function(ret) {
			var is_full = ret.is_full;
			if (is_full == 1) {
				//开通解决方案版并跳转到列表页
				openSolution();
			} else {
				//弹出完善信息的框
				_this.html('开始体验').removeClass('disabled');
				LoadingOperation("hide");
				OpenFreeInfoObj.HideDoc();
				buildInfo.add_build_box_common('background');
			}
		}
	});

});

//暂不开通
$(document).on("click", "#noFree", function() {
	OpenFreeInfoObj.HideDoc();
});

// qq咨询
$(document).on('click', '[need-ask]', function() {
	var params = {
		referer: window.location.origin + window.location.pathname,
	};
	var isWorkTime = $ServiceTextGetter ? $ServiceTextGetter().special.isWorkTime() : true;
	var todayIsDayOff =  $ServiceTextGetter ? $ServiceTextGetter().special.todayIsDayOff() : false;
	if (!isWorkTime) {
		params.contact_id = todayIsDayOff ? 10 : 9;
	}
	$.ajax({
		type: "POST",
		url: "//" + USER_DOMAIN + '/api/ask/addAsk',
		data: params,
		dataType: "json",
		xhrFields: {
		  withCredentials: true
		},
		success: function() {}
	});
});

//关闭
$(document).on("click", "[expired-close]", function() {
	if (ExpiredFreeFrontObj) {
		ExpiredFreeFrontObj.HideDoc();
	} else if (ExpiredFreeBackObj) {
		ExpiredFreeBackObj.HideDoc();
	}
});

//跳转活码
$(document).on("click", "#more", function() {
	window.open('https://cli.im/case');
	$('html, body').animate({
		scrollTop: $("#all-case-content").offset().top
	}, 2000);
});

//开通解决方案
function openSolution() {
	$.ajax({
		type: "get",
		url: '//user.' + _host + '/join/save_solution_info',
		dataType: "jsonp",
		success: function(ret) {
			if (ret.status == 1) {
				window.location = ret.data;
			} else {
				OpenFreeInfoObj.HideDoc();
				LoadingOperation("hide");
				alert(ret.msg);
			}
		}
	});
}

function loadCss(url) {
	if (isInclude(url)) {
		return false;
	}
	var link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = url;
	document.getElementsByTagName("head")[0].appendChild(link);
};

function loadJs(url, callback) {
	if (isInclude(url)) {
		return false;
	}
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	head.appendChild(script);
	script.onload = script.onreadystatechange = function() {
		if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
			if (typeof callback == 'function') {
				callback();
			}
			script.onload = script.onreadystatechange = null;
		}
	};
}

function isInclude(name) {
	var js = /js$/i.test(name);
	var es = document.getElementsByTagName(js ? 'script' : 'link');
	for (var i = 0; i < es.length; i++)
		if (es[i][js ? 'src' : 'href'].indexOf(name) != -1) return true;
	return false;
}



// 数据统计 cxc
$(document).on('click', '[solution-free-data-statistics]', function() {
	var click_sec_conf = {
		'openFree': [40, 41, 42, 43, 44, 45, 46],
		'noFree': [50, 51, 52, 53, 54, 55, 56],
		'openQQ': [60],
		'openQQ1': [61]
	};
	var host = window.location.href,
		click_sec_type = 0,
		click_sec = 0,
		click_type = $(this).attr('solution-free-data-statistics');

	switch (click_type) {
		case 'openQQ':
		case 'openQQ1':
			click_sec_type = 0;
			break;
		default:
			if (is_front) {
				click_sec_type = 0;
			} else if (host.indexOf('/center') > 0) {
				click_sec_type = 1;
			} else if (host.indexOf('user/static') > 0) {
				click_sec_type = 4;
			} else if (host.indexOf('user/active') > 0) {
				click_sec_type = 5;
			} else if (host.indexOf('reclist') > 0) {
				click_sec_type = 3;
			} else if (host.indexOf('product/guide') > 0) {
				click_sec_type = 2;
			} else {
				click_sec_type = 6;
			}
			break;
	}

	click_sec = click_sec_conf[click_type][click_sec_type];
	StatisticsData(22, click_sec);

});


function StatisticsData(fir, sec) {
	var host = window.location.host;
	host = host.substr(host.indexOf('cli'));

	$.ajax({
		async: true,
		type: "get",
		url: '//' + host + '/Api/ClickLog/click',
		data: {
			'fir': fir,
			'sec': sec
		},
		dataType: 'jsonp',
		jsonp: 'callback',
		success: function(ret) {}
	});
}
