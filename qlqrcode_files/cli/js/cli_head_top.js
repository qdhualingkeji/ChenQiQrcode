$(function() {
    /**
	 * editionType
	 * type: Number
	 * case 1: 免费版 正常
	 * case 2: 基础版/高级版 正常
	 * case 3: 基础版/高级版 容量超标
	 * case 4: 基础版/高级版 流量超标
	 * case 5: 基础版/高级版 即将到期
	 * case 6: 旗舰版 正常
	 * case 7: 旗舰版 容量超标
	 * case 8: 旗舰版 流量超标
	 * case 9: 旗舰版 即将到期
	 * case 10: 行业专属 正常
	 * case 11: 行业专属 容量超标
	 * case 12: 行业专属 流量超标
	 * case 13: 行业专属 即将到期
	 * case 14: 已到期
	 * case 15: 免费版 容量超标
	 * case 16: 免费版 流量超标
	 */
	var getEditionType = function(edition_id, file_status, av_status, time_status) {
		// 免费版 按钮显示
		if (edition_id === '1') {
            if (time_status === 3) {
                return 14;
            }
			if (file_status !== 1) {
				return 15;
			}
			if (av_status !== 1) {
				return 16;
            }
			return 1;
		}

		// 基础版/高级版 按钮显示
		if (edition_id === '2' || edition_id === '3') {
			if (file_status === 1 && av_status === 1 && time_status === 1) {
				return 2;
			}
			if (file_status !== 1) {
				return 3;
			}
			if (av_status !== 1) {
				return 4;
			}
			if (time_status === 2) {
				return 5;
			}
			return 14;
		}

		// 旗舰版 按钮显示
		if (edition_id === '15') {
			if (file_status === 1 && av_status === 1 && time_status === 1) {
				return 6;
			}
			if (file_status !== 1) {
				return 7;
			}
			if (av_status !== 1) {
				return 8;
			}
			if (time_status === 2) {
				return 9;
			}
			return 14;
		}

		// 行业专属版 按钮显示
		if (edition_id === '4' || edition_id === '44') {
			if (file_status === 1 && av_status === 1 && time_status === 1) {
				return 10;
			}
			if (file_status !== 1) {
				return 11;
			}
			if (av_status !== 1) {
				return 12;
			}
			if (time_status === 2) {
				return 13;
			}
			return 14;
		}
	}


    if (typeof _capacity_info != 'undefined') {
        if (_capacity_info && _capacity_info != null) {

            var user_id = window.tokenId;

            if (!user_id) {
                var user_id = '';
            }


            if (_capacity_info.edition_id != 1) {
                if ($('.cli-normal-main .account_icon').length > 0) {
                    $('.cli-normal-main .account_icon').attr('src', '//'+STATIC_SERVICE+'/images/shoufei-icon@2x.png');
                } else {
                    $('.cli-normal-main').prepend('<img src="//'+STATIC_SERVICE+'/images/shoufei-icon@2x.png" class="account_icon fl">');
                }
            } else {
                if ($('.cli-normal-main .account_icon').length > 0) {
                   $('.cli-normal-main .account_icon').attr('src', '//'+STATIC_SERVICE+'/images/free-icon@2x.png');
                } else {
                   $('.cli-normal-main').prepend('<img src="//'+STATIC_SERVICE+'/images/free-icon@2x.png" class="account_icon fl">');
                }
            }

            if (typeof window.CapacityNavInfo !== 'undefined' && typeof window.CapacityNavInfo === 'function') {
                window.CapacityNavInfo({
                    capacityInfo: _capacity_info,
                    isCenter: 0,
                    user_id: user_id
                });
            }

            var fromEditionId = _capacity_info.from_edition_id;
            var editionType = getEditionType(_capacity_info.edition_id, _capacity_info.file_capacity.state, _capacity_info.av_flow.state, _capacity_info.time_status);
            var editionTargetUrl = 'javascript:;';
            var editionTargetText = '';
            var file_capacity_state = _capacity_info.file_capacity.state;
            var editionOldId = _capacity_info.edition_old ? _capacity_info.edition_old.edition_id : '2';
            var popContent = '付费升级获取更多容量及专享功能';
            var remainDay = _capacity_info.remain_day || 0;
            var sec = '';
            if (editionType === 3) {
                popContent = '补差价升级获取更多容量';
            } else if (editionType === 4) {
                popContent = '补差价升级获取更多流量';
            } else if (editionType === 8 || editionType === 12) {
                popContent = '购买扩容包获取更多流量';
            } else if (editionType === 7 || editionType === 11) {
                popContent = '购买扩容包获取更多容量';
            } else if (editionType === 6 || editionType === 10) {
                popContent = '购买扩容包获取更多容量/流量/成员数量';
            } else if (editionType === 14) {
                popContent = '续费可恢复付费版容量及专享功能';
            }
            if (editionType === 14) {
                editionTargetUrl = '//' + USER_DOMAIN + '/buy?create_from=116&version=' + editionOldId;
                editionTargetText = '续费';
                $('.activeUpdate').removeClass('none');
                sec = '1'
            } else if (editionType === 1 || editionType === 15 || editionType === 16) {
                editionTargetUrl = '/price?create_from=116'; 
                editionTargetText = '升级';
                $('.activeUpdate').removeClass('none');
                sec = '1';
            } else if (editionType === 3 || editionType === 4) {
                editionTargetUrl = '//' + USER_DOMAIN + '/buy?create_from=117&version=' + fromEditionId === '2' ? '3' : '15';
                editionTargetText = '升级';
                $('.activeUpdate').removeClass('none');
                sec = '2'
            } else if (editionType === 7 || editionType === 8) {
                var version = file_capacity_state > 1 ? 'file_capacity' : 'av_flow';
                editionTargetUrl = '//' + USER_DOMAIN + '/buy?packet?create_from=16&version=' + version;
                editionTargetText = '扩容';
                sec = '4';
                $('.activeUpdate').removeClass('none');
            } else if (editionType === 5 || editionType === 9 || editionType === 13) {
                editionTargetUrl = '//' + USER_DOMAIN + '/buy?create_from=118&version=' + fromEditionId;
                editionTargetText = '续费';
                $('.activeUpdate').removeClass('none');
                sec = '3';
                popContent = '剩余' + remainDay + '天到期，续费继续享受该版本功能及服务';
            } else {
                $('.activeUpdate').addClass('none');
            }
            $('.activeUpdate').attr('data-sec', sec).attr('title', '').attr('data-original-title', popContent).attr('href', editionTargetUrl).text(editionTargetText).tooltip();
        }   else {
            var user_plugins_arrow_box_append = $('#header-capacity');
            var tpl =   '<div class="user_plugins_arrow_box" id="user_plugins_arrow_box" user_plugins_arrow_box_common style="width:110px;padding:5px 0;"><div>'+
                            '<a href="//user.cli.im/center/userinfo" class="user_plugins_arrow_link">账户详情</a>'+
                            '<a href="//user.cli.im/password/edit" class="user_plugins_arrow_link">修改密码</a>'+
                            '<a href="//user.cli.im/login/out" class="user_plugins_arrow_link">安全退出</a></div>'+
                        '</div>';

            var _tpl = $(tpl);

            _tpl.find('.user_plugins_arrow_link').each(function(i, item) {
                var item = $(item);
                item.css("cssText", "height:27px;line-height:24px!important;padding-left:15px!important;");
            })

            user_plugins_arrow_box_append.append(_tpl[0].outerHTML);
        }
    }

    // 海南岛logo
    if (typeof nav_data != 'undefined' && nav_data != null) {
        if (nav_data._user_logo_json.logo_custom && nav_data._user_logo_json.logo_custom != null) {
            if (nav_data._user_logo_json.path && nav_data._user_logo_json.path != null) {
                $('.top-menu-item').find('#top-nav-home').hide();
                $('.cli_head_container').find('.logo').css({
                    'backgroundImage': 'url('+ nav_data._user_logo_json.path +')',
                    'width': '340px',
                    'cursor': 'default'
                });
                $('.cli_head_container').find('.logo').attr('href','javascript:;');
                $('.cli_head_container').find('.logo').removeClass('none').show();
            }
        } else {
            $('.cli_head_container').find('.logo').removeClass('none').show();
        }
    } else {
        $('.cli_head_container').find('.logo').removeClass('none').show();
    }

    //检测用户是否登录
    var checkLogin = function() {
        if (account) { //account 需要在外部声明
            $("#myqr_out").show();
            $("#login_join").hide();
            return true;
        } else {
            $("#myqr_out").hide();
            $("#login_join").show();
            return false;
        }
    };
    $('.user_account').html(account);
    // news下，account值要去请求另外的接口； 否则，就不用请求
    if (window.location.pathname.indexOf('/news') > -1 || window.location.pathname.indexOf('/help/') > -1) {
        $.ajax({
            url: "/news/wp-admin/admin-ajax.php",
            data: {
                action: 'show_account'
            },
            async: true,
            success: function(ret) {
                if (ret == 0) {
                    account = false;
                } else {
                    account = ret;
                    $('.user_account').html(account);

                }
                checkLogin();
                loginClick();
            }
        });
    } else {
        checkLogin();
        loginClick();
    }

    //点击登录时判断是否登录，未登录则绑定登录注册事件，已登录则跳转到用户中心
    function loginClick() {
        var $login_join = $('#login_join');
        var $traffic_use_now = $('#traffic_use_now');
        $('#login_join, [needLogin]').find('a').click(function(e) {
            var data_type = $(this).attr('data-type');
            if (!checkLogin()) {
                if ($login_join.data("hasClickJoin") == "lock") { //请求开始加锁
                    e.preventDefault();
                    return false;
                } else {
                    if ($('.login_plugins_bg').length == 0) { // 点击注册/登录，弹出多个弹窗bug
                        StatisticsData(110, 51);

                        if (data_type == 'login') { // 登录埋点
                            StatisticsData(121, 1);
                        } else if (data_type == 'manage') { // 注册埋点
                            StatisticsData(121, 6);
                        } else if (data_type == 'manage-admin') { // 注册埋点
                            StatisticsData(121, 7);
                        }

                        var type = $(this).attr('data');
                        seajs.use('//' + STATIC_SERVICE + '/js/login_plugin.js?v=20190610', function(cli) {
                            if (data_type == 'login') {
                                cli.login_plugin(type, 10);
                            } else if (data_type == 'manage') {
                                cli.login_plugin(type, 13); // 我的二维码
                            } else if (data_type == 'manage-admin') {
                                cli.login_plugin(type, 14); // 管理后台
                            } else {
                                cli.login_plugin(type, 10);
                            }
                            var $close_login = $('#close_login');
                            $close_login.click(function() {
                                $login_join.data("hasClickJoin", "unlock");
                            })
                        });
                    };
                    $login_join.data("hasClickJoin", "lock");
                }
                return false;
            } else {
                window.location.href = "/user"; //跳转到用户中心
            }
        });
        $('#traffic_use_now').click(function(e) {
            if (!checkLogin()) {
                if ($traffic_use_now.data("hasClickJoin") == "lock") { //请求开始加锁
                    e.preventDefault();
                    return false;
                } else {
                    if ($('.login_plugins_bg').length == 0) { // 点击注册/登录，弹出多个弹窗bug
                        var type = $(this).attr('data');
                        seajs.use('//' + STATIC_SERVICE + '/js/login_plugin.js?v=20190610', function(cli) {
                            cli.login_plugin(type, 20);
                            var $close_login = $('#close_login');
                            $close_login.click(function() {
                                $traffic_use_now.data("hasClickJoin", "unlock");
                            })
                        });
                    };
                    $traffic_use_now.data("hasClickJoin", "lock");
                }
                return false;
            } else {
                window.location.pathname = "/case"; //案例页面
            }
        })
    }


    /*摄像头*/
    $('#camera').bind('click', function() {
        seajs.use('m/cameraindex', function(cameraopen) {
            cameraopen();
        });
    });


    //点击 展开or收起 用户操作框
    // $('.logpart .cli-normal-main').on('click', function(e) {
    //     if($('.user_plugins_arrow_box').is(':hidden')) {
    //         $('.user_plugins_arrow_box').show();
    //     } else {
    //         $('.user_plugins_arrow_box').hide();
    //     }
    //     e.stopPropagation();
    // })
    // $(window).on('click', function() {
    //     $('.user_plugins_arrow_box').hide();
    // })
    // 2016-01-20
    $('.cli_head .top-menu-item').mouseenter(function() {
        var _this = $(this);
        var has_dropdown = _this.attr('has-dropdown');
        if (has_dropdown == 'true') {
            var menu_dropdown = _this.find('.menu-dropdown');
            var menu_hd = _this.find('.menu-hd');
            var angle = _this.find('.fa-angle-down');
            // menu_hd.addClass('active');
            menu_dropdown.addClass('animate');
            angle.removeClass('fa-angle-down').addClass('fa-angle-up');
        }
    }).mouseleave(function() {
        var _this = $(this);
        var has_dropdown = _this.attr('has-dropdown');
        if (has_dropdown == 'true') {
            var menu_dropdown = _this.find('.menu-dropdown');
            var menu_hd = _this.find('.menu-hd');
            var angle = _this.find('.fa-angle-up');
            // menu_hd.removeClass('active');
            menu_dropdown.removeClass('animate');
            angle.removeClass('fa-angle-up').addClass('fa-angle-down');
            // 默认展开第一个
            menu_dropdown.find('.menu-dropdown-sidebar').find('li:eq(' + 0 + ')').addClass('active').siblings().removeClass('active');
            menu_dropdown.find('.menu-dropdown-content').find('li:eq(' + 0 + ')').addClass('active').siblings().removeClass('active');
        }
    });

    // if ($('.user_plugins_capacitytips').length > 0) {
    //     var _up_tpl = $('.user_plugins_capacitytips').html();
    //     $('.notice-tip-tpl').append(_up_tpl);
    // }

    var navDomain = window.location.host.replace(/(biz\.)|(user\.)/, "");

    $(document).on("click",".close-notise-tip",function(){
        SetCookievar('nav-close-notise-tip', 1, navDomain);
        $(this).parent().parent().hide();
    })

    //写入cookie
    var SetCookievar = function(name, value, domain) {
        document.cookie = name + "=" + escape(value) + ";domain=" + domain + "; path = /";
    }

});

// 顶部栏埋点

$(document).on('click', '.cli_head [statisticAnalyze]', function(event) {
    var secData = $(this).attr('sec-data');
    StatisticsData(42,secData);
});

// 顶部升级续费埋点
$(document).on('click', '.activeUpdate', function() {
    var secData = $(this).attr('data-sec');
    if (secData) {
        StatisticsData(148 ,secData);
    }
});

//数据统计
// function StatisticsData(fir,sec){
//     console.log('wojhahahahahahah ');
//     $.ajax({
//         async: true,
//         type: "get",
//         url: '/Api/ClickLog/click',
//         data: {
//             'fir': fir,
//             'sec': sec
//         },
//         dataType: 'jsonp',
//         jsonp: 'callback',
//         success: function(ret) {
//         }
//     });
// }

// suffix 音视频的不支持后缀名埋点
function StatisticsData(fir,sec, suffix){
    if (!suffix) {
        $.ajax({
            async: true,
            type: "get",
            url: '/Api/ClickLog/click',
            data: {
                'fir': fir,
                'sec': sec
            },
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function(ret) {
            }
        });
    } else {
        $.ajax({
            async: true,
            type: "get",
            url: '/Api/ClickLog/click',
            data: {
                'fir': fir,
                'sec': sec,
                'comment': suffix
            },
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function(ret) {
            }
        });
    }

}

/*qq咨询*/
function open_qq(i) {
    // if(0 == $('#cli-qq').length) {
    //     var qq_link = $('.contact').find('[contact-data-qq]').attr('href');

    //     if (!qq_link) {
    //         qq_link = $('#support-data-url').attr('data-url');
    //     }

    //     $('.open_qq_btn').attr('href', qq_link);

    //     $('.open_qq_btn').attr('target', '_blank');
    //     if($('.open_qq_btn').length > 0) {
    //         $('.open_qq_btn')[0].click();
    //     }
    // }else {
    //     $('#cli-qq')[0].click();
    // }
    // click_qq_server_2();
    window.open('//cli.im/help');
}

function click_qq_server_2() {
    // $.ajax({
    //     async: true,
    //     type: "get",
    //     url: '/Api/QqServer/add',
    //     data: {
    //         'data_from': 10
    //     },
    //     dataType: 'jsonp',
    //     jsonp: 'callback',
    //     success: function(ret) {}
    // });
}
