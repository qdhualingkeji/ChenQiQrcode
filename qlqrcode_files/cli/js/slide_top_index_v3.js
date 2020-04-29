;(function($) {

    $.fn.supportPlugins = function() {
        // 加载样式
        if (typeof STATIC_SERVICE == 'undefined') STATIC_SERVICE = 'static.clewm.net/cli';
        if ($('#support-plugins-stylesheet-v3').length == 0) {   //不重复加载
            $('<link rel="stylesheet" id="support-plugins-stylesheet-v3" href="//'+STATIC_SERVICE+'/css/slide_top_index_v3.css?v=20190620">').appendTo('head');
        }
        // 读取 主域
        var documentDomain = document.domain.split('.').slice(-2).join('.');
        if (documentDomain == 'cli.me') {
            var CLI_DOMAIN = 'cli.me';
        } else if (documentDomain == 'cliim.net' || documentDomain == 'cliim.com') {
            var CLI_DOMAIN = documentDomain;
        } else if(documentDomain == 'cli.im') {
            var CLI_DOMAIN = documentDomain;
        }
        function getCookie(name){ 
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg)){
                return unescape(arr[2]); 
            } else {
                return null; 
            }
        }
        function StatisticsData(fir, sec) {
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
                success: function (ret) {}
            });
        }
        function getVersionName(type) {
            switch (Number(type)) {
                case 1:
                    return '免费版';
                case 2:
                    return '基础版';
                case 3:
                    return '高级版';
                case 15:
                    return '旗舰版';
                case 4:
                    return '解决方案版';
                case 44:
                    return '行业专属版';
                default:
                    return '付费版';
            }
        }

        // 判断在哪一个页面
        function from_where_page() {
            var parentLocation = window.location;

            if (/news\/service/.test(parentLocation)) {
                return 'NEWS';
            } else if (/text/.test(parentLocation)) {
                return 'TEXT';
            } else if (/url/.test(parentLocation)) {
                return 'URL';
            } else if (/files/.test(parentLocation)) {
                return 'FILES';
            } else if (/img/.test(parentLocation)) {
                return 'IMG';
            } else if (/multimedia/.test(parentLocation)) {
                return 'MULTIMEDIA';
            } else {
                return 'TEXT';
            }
        }
        /* 内容块 */
        // 基本客服内容块
        var referer = encodeURIComponent(window.location.origin + window.location.pathname);
        var helpUrl = '//' + CLI_DOMAIN + '/help?referer=' + referer;
        var _page_type = from_where_page();
        var mouseLeaveTimer;
        if (_page_type == 'NEWS') {
            var supportWrapper = $('<a class="support-wrapper-v3 none" href="' + helpUrl + '" id="support-wrapper-v3" target="_blank">帮助咨询</a>');
        } else {
            var supportWrapper = $('<a class="support-wrapper-v3" href="' + helpUrl + '" id="support-wrapper-v3" target="_blank">帮助咨询</a>');
        }
        if ($ServiceTextGetter) {
            var isWorkTime = $ServiceTextGetter().special.isWorkTime();
            var currentEditionId = getCookie('login_edition_id') || '1';
            var wxLink = '//static.clewm.net/cli/images/contact/order-pxq94.png';
            // var managerInfo = getCookie('climanager_v2');
            var QQLink = $ServiceTextGetter().getQQLink();
            // var logoPic = managerInfo ? JSON.parse(managerInfo).logo_pic : '//static.clewm.net/cli/images/contact/service-man@2x.png';
            var telephone = '400-002-0232';
            if (isWorkTime) {
                if (currentEditionId > 1) {
                    if (currentEditionId == 4) {
                        telephone = '18268566648';
                        QQLink = 'http://q.url.cn/CDsY7l?_type=wpa&qidian=true';
                        wxLink = '//static.clewm.net/cli/images/contact/order-jwy94.png';
                    } else {
                        telephone = '13454761701';
                        QQLink = 'http://q.url.cn/abYhOU?_type=wpa&qidian=true';
                        wxLink = '//static.clewm.net/cli/images/contact/order-pxq94.png';
                    }
                }
            }
            var _IS_NC_FRONT_PAGE = window._IS_NC_FRONT_PAGE;
            if (_IS_NC_FRONT_PAGE) {
              QQLink = 'http://q.url.cn/ABRleS?_type=wpa&qidian=true';
            }
            var isFreeUser = _IS_NC_FRONT_PAGE && currentEditionId <= 1;
            var feedbackModalArr = [
                '<div id="feedback-modal" class="modal fade" data-backdrop="true">\n',
                    '<div class="modal-dialog" style="width: 640px;margin-top: 100px">\n',
                        '<div class="modal-content">\n',
                            '<button type="button" id="feedback-modal-close" class="close feedback-modal-close" data-dismiss="modal" aria-label="Close">',
                                '<span aria-hidden="true">\xD7</span>',
                            '</button>',
                            '<div class="pay-support-title">',
                                '<h1 class="text-center text-green">', isFreeUser ? '帮助咨询' : '你的专属顾问', '</h1>',
                                '<p class="text-darkgrey text-center">', isFreeUser ? '你可以通过QQ反馈二维码使用中的问题和建议' : '你可以通过QQ、微信、电话随时咨询二维码使用中的任何问题', '</p>',
                            '</div>',
                            '<div class="p-a-md m-b-16 white">',
                                '<p class="f-16">顾问联系信息<span class="text-xs text-grey m-l-sm">工作日09:00-20:00，节假日09:00-17:30</span></p>',
                                '<p>',
                                    '<a href="' + QQLink + '" target="_blank" class="select-qq-button-inner m-r-md" id="qq-contact-link">',
                                        '<span class="select-qq-icon"></span>QQ咨询',
                                    '</a>',
                                    '<a style="', isFreeUser ? 'display:none;' : '', '" id="support-wechat-consult" href="javascript:;" class="select-qq-button-inner m-r-md" data-container="body" data-toggle="popover" data-content="<div class=\'common-popover-content\'><img src=\''+wxLink+'\' style=\'width: 150px;height: 150px\' /></a></div>">',
                                        '<span class="select-wechat-icon"></span>微信咨询',
                                    '</a>',
                                    '<a style="', isFreeUser ? 'display:none;' : '', '" href="javascript:;" class="select-qq-button-inner">',
                                        '<span class="select-telephone-icon"></span>' + telephone,
                                    '</a>',
                                '</p>',
                            '</div>',
                            '<div class="p-a-md m-b-16 white">',
                                '<p class="f-16">24小时自助搜索<span class="text-xs text-grey m-l-sm">提供建码操作、场景应用指导等各类教程</span></p>',
                                '<form role="search" method="get" target="_blank" class="input-group search-form" action="//'+CLI_DOMAIN+'/searchbd">',
                                    '<input class="form-control search-control" autocomplete="off" placeholder="&nbsp;输入问题搜索" value="" name="q" autofocus>',
                                    '<span class="input-group-btn" style="z-index: 2">',
                                        '<button type="submit" class="btn btn-outline b-green text-green" style="width: 80px;height: 32px;font-size: 12px;line-height: 1;">自助搜索</button>',
                                    '</span>',
                                '</form>',
                            '</div>',
                        '</div>\n',
                    '</div>\n',
                '</div>\n'
            ];
            var feedbackModal = feedbackModalArr.join('');
            var todayIsDayOff = $ServiceTextGetter().special.todayIsDayOff();
            var params = {
                referer: window.location.origin + window.location.pathname,
            };
            if (!isWorkTime) {
                params.contact_id = todayIsDayOff ? 10 : 9;
            }
            if ($('#feedback-modal').length == 0) {
                $(feedbackModal).appendTo('body');
                $('#support-wechat-consult')
                    .popover({
                        template: '<div class="popover price-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
                        trigger: "manual",
                        placement: "top",
                        html: true,
                        animation: false
                    })
                    .on("mouseenter", function() {
                        var _this = this;
                        clearTimeout(mouseLeaveTimer);
                        $(".popover").remove();
                        $(this).popover("show");
                        $(".popover").on("mouseleave", function() {
                            $(_this).popover("hide");
                        });
                    })
                    .on("mouseleave", function() {
                        var _this = this;
                        mouseLeaveTimer = setTimeout(function() {
                            if (!$(".popover:hover").length) {
                                $(_this).popover("hide");
                            }
                        }, 300);
                    });
            }
        }
        //不重复加载
        if ($('#support-wrapper-v3').length == 0) {
            supportWrapper.appendTo('body');
        }
        
        if ($('#nav_help').length) {
            $('#nav_help').attr('href', helpUrl);
        }
        $(document).on('click', '#support-wrapper-v3', function(e) {
            var _IS_NC_FRONT_PAGE = window._IS_NC_FRONT_PAGE;
            if (currentEditionId > 1 || _IS_NC_FRONT_PAGE) {
                e.preventDefault();
                $('#feedback-modal').modal('show');
                StatisticsData(125,17);
                return false;
            } else {
                if (window.location.search.indexOf('type=batch') > -1) {
                    var newHelpUrl = helpUrl + '&is_record=1';
                    $(this).attr('href', newHelpUrl);
                } else {
                    $(this).attr('href', helpUrl);
                }
                StatisticsData(125,18);
                return true;
            }
        });
        $(document).on('click', '#nav_help', function(e) {
            if (currentEditionId > 1) {
                e.preventDefault();
                $('#feedback-modal').modal('show');
                StatisticsData(125,21);
                return false;
            } else {
                StatisticsData(125,22);
                return true;
            }
        });
        $(document).on('click', '#feedback-modal-close', function(e) {
            $('#feedback-modal').modal('hide');
        });
        $(document).on('click', '#qq-contact-link', function(e) {
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

        // 帮助中心页面的咨询随滚动出现
        $(window).scroll(function() {
            var top = parseInt($(window).scrollTop());

            if (top == 0) {
                $('#support-wrapper-v3').addClass('none').hide();
            } else {
                $('#support-wrapper-v3').removeClass('none').show();
            }
        })
    };
})(jQuery);
/* 默认 */
$(function() {
    // function _has_contact() {
    //     var person_data = $('.contact').find('[contact-data-person]');
    //     if(person_data && 0==person_data.length) {
    //         return false;
    //     }
    //     return false;
    // }
        // 场景页面手机端，不显示咨询插件
    function _scenePage_mobile() {
        var pathname = window.location.pathname;
        var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
        var notNewHelp = window.location.pathname.indexOf('/news/help') > -1;
        var isInHelpPage = window.location.pathname.indexOf('/help') > -1 || window.location.pathname.indexOf('/news/service') > -1;
        var noNeedPlug = window.location.search.indexOf('no_need_help') > -1;
        if(((pathname.indexOf('/case/detail/') > -1) && isMobile) || (isInHelpPage  && !notNewHelp) || noNeedPlug) {
            return true;
        }
        return false;
    }

    // 如果没有参数，则默认初始化
    if (typeof supportPluginsWithParam == 'undefined') {
        if(!_scenePage_mobile()) {
            $.fn.supportPlugins();
        } else {
            var documentDomain = document.domain.split('.').slice(-2).join('.');

            if (documentDomain == 'cli.me') {
                var CLI_DOMAIN = 'cli.me';
                var CRM_API = 'crm-api';
                var CLI_DOMAIN_API = 'cli.me';
            } else if (documentDomain == 'cliim.net' || documentDomain == 'cliim.com') {
                var CLI_DOMAIN = documentDomain;
                var CRM_API = 'crm-api';
                var CLI_DOMAIN_API = documentDomain;
            } else if(documentDomain == 'cli.im') {
                var CLI_DOMAIN = documentDomain;
                var CRM_API = 'crm.api';
                var CLI_DOMAIN_API = documentDomain;
            } else {
                var CRM_API = 'crm.api';
                //为了兼容一些子域名页面
                var CLI_DOMAIN_API = 'cli.im';
            }

            $.post('//'+CRM_API+'.'+CLI_DOMAIN_API+'/api/mget/getmid',{'ua':navigator.userAgent, uid:tokenId || 0},function(res){
                if (res) {
                    $('body').append('<a id="support-data-url" data-url='+ res.contact_link_index +' style="display: none;"></a>');
                }
            },'jsonp');
        }
    }
});
