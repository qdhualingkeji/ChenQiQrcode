$(function() {
    var iframeWinAll = window.frames;
    var data_from_2 = 1;
    $(iframeWinAll).load(function(){
        if($('.services_use iframe').length>0) {
            $('.services_use iframe').attr('id','qq_server_win_1');
            // var iframeWin_3 = iframeWinAll[3];
            var iframeWin_3 = iframeWinAll['qq_server_win_1'].contentWindow;
            $(iframeWin_3.document).find('#launchBtn').on('click',function () {
                data_from_2 = 10;
                $.ajax({
                    async: true,
                    type: "get",
                    url: '/Api/QqServer/add',
                    data: {'data_from':1},
                    dataType: 'jsonp',
                    success: function(ret) {
                    }
                });
            });

        };
        // cli前台复杂版foot
        if($('.cli_foot iframe').length>0) {
            $('.cli_foot iframe').attr('id','qq_server_win_2');
            // var iframeWin_4 = iframeWinAll[4];
            var iframeWin_4 = iframeWinAll['qq_server_win_2'].contentWindow;
            $(iframeWin_4.document).find('#launchBtn').on('click',function () {
                data_from_2 = 20;
                $.ajax({
                    async: true,
                    type: "get",
                    url: '/Api/QqServer/add',
                    data: {'data_from':2},
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function(ret) {
                    }
                });

            });
        };
        // include-homehelp.html ， 只有首页和更多功能页有
        if($('.homehelp iframe').length>0) {
            $('.homehelp iframe').attr('id','homehelp-qq');
            var iframeWin_6 = iframeWinAll['homehelp-qq'].contentWindow;
            $(iframeWin_6.document).find('#launchBtn').on('click',function () {
                data_from_2 = 50;
                $.ajax({
                    async: true,
                    type: "get",
                    url: '/Api/QqServer/add',
                    data: {'data_from':5},
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function(ret) {
                    }
                });

            });
        }

        /*博客页qq咨询 jquery 1.11 没有 live*/
        if($('.qq_visit iframe').length>0) {
            $('.qq_visit iframe').attr('id','qq_server_win_3');
            var iframeWin_5 = iframeWinAll['qq_server_win_3'].contentWindow;
            $(iframeWin_5.document).find('#launchBtn').on('click',function () {
                data_from_2 = 30;
                $.ajax({
                    async: true,
                    type: "get",
                    url: '/Api/QqServer/add',
                    data: {'data_from':3},
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function(ret) {
                    }
                });

            });
        }

        /*监听[QQ账号聊天]点击事件*/
        $('#WPA3-SELECT-PANEL-AIO-CHAT').on('click',function() {
            $.ajax({
                async: true,
                type: "get",
                url: '/Api/QqServer/add',
                data: {'data_from':data_from_2+1},
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function(ret) {
                }
            });
        });
        
        /*监听[匿名聊天]点击事件*/
        $('#WPA3-SELECT-PANEL-ANONY-CHAT').on('click',function() {
            $.ajax({
                async: true,
                type: "get",
                url: '/Api/QqServer/add',
                data: {'data_from':data_from_2+2},
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function(ret) {
                }
            });
        });

        /*监听[关闭]选择聊天方式按钮*/
        $('#WPA3-SELECT-PANEL-CLOSE').on('click',function() {
            $.ajax({
                async: true,
                type: "get",
                url: '/Api/QqServer/add',
                data: {'data_from':data_from_2+3},
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function(ret) {
                }
            });
        });
    });

    $("[cli-data-statistics]").on("click",function(){
        var dataArr = $(this).attr("cli-data-statistics").split(",");
        $.ajax({
            async: true,
            type: "get",
            url: '/Api/ClickLog/click',
            data: {
                'fir': dataArr[0],
                'sec': dataArr[1]
            },
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function(ret) {
            }
        });
    });
    function click_qq_server_1() {
        $.ajax({
            async: true,
            type: "get",
            url: '/Api/QqServer/add',
            data: {'data_from':10},
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function(ret) {
            }
        });
    }
});

    /*点击巡检记录*/
    function recd_ck(from) {
        if(99==from) {
        } else if(98==from) {
        } else if(97==from) {
        } else {
            from = 99;
        }
        $.ajax({
            async: true,
            type: "get",
            url: '/Api/QqServer/add',
            data: {'data_from':from},
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function(ret) {
            }
        });
        return true;
    }