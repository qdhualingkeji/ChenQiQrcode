//前台用--上传模块
var pd = false;

var Util = {
    getSuffix: function(file_name){
        var result = /[^\.]+$/.exec(file_name);
        return result;
    },
    isImgs: function(type) {
        if (type == 'jpg' || type == 'jpeg' || type == 'gif' || type == 'png' || type == 'bmp') {
            return 1;
        } else if (type == 'pptx' || type == 'pdf' || type == 'doc' || type == 'docx' || type == 'ppt' || type == 'xls' || type == 'xlsx') {
            return 2;
        } else {
            return 3;
        }
    }
}

function upload(type, is_vip, size_name, pid) {
    if (!pd) {
        pd = true;
        var img, file, suffix, size, file_new;
        img = 'jpg,jpeg,png,gif';
        file = 'jpg,jpeg,png,gif,txt,docx,doc,ppt,pptx,pdf,bmp,pot,potx,xls,xlsx,rtf,wps,dps,vcf,dwg';
        file_new = 'jpg,jpeg,gif,png,bmp,pdf,doc,docx,ppt,pptx,xls,xlsx';
        if (type == 'files' || type == 'file') { //文件
            suffix = file;
            size = 1024 * 1024 * 10; //10m
        } else if (type == 'imgs' || type == 'img' || type == 'deqr') {
            suffix = img;
            size = 1024 * 1024 * 2; //2m
        } else if (type == 'comments') {
            suffix = file_new;
            var is_img = Util.isImgs(size_name);

            if (is_img == 1) {
                size = 1024 * 1024 * 2; //2m
            } else if (is_img == 2) {
                size = 1024 * 1024 * 10; //10m
            }
            
        } else { //文件
            suffix = file;
            size = 1024 * 1024 * 2;
        }
        //基础版用户
        if (is_vip == 30) {
            size = 1024 * 1024 * 30;
        }
        //高级版用户
        if (is_vip == 0) {
            size = 1024 * 1024 * 300;
        };

        $(".uploadfile, [data-upload]").upload({
            'exts': suffix, //支持的扩展名
            'extsfun': function(nowexts) { //不支持的扩展名回调
                pd = false;
                if (type == 'comments') {
                    var alertContent = '<p>目前附件仅支持以下格式：</p><br>' +
                        '<p>文档类: pdf,doc,docx,ppt,pptx,xls,xlsx <br>' +
                        '图片类: jpg,jpeg,gif,png,bmp <br>';
                    var alertFooter = '<div class="modal-footer">' +
                        '<button class="btn dark-white" data-dismiss="modal">我知道了</button>' +
                        '</div>';
                    $('#modal-alert').modal('show').find('.modal-title').text('上传文件格式不支持')
                        .end().find('.modal-body').attr('data-pid',pid).empty().append(alertContent);

                    $('#modal-alert').find('.modal-footer').remove().end().find('.modal-body').after(alertFooter);

                } else {
                    alert("不支持" + nowexts + "该扩展名");
                }
            },
            'maxsize': size, //最大200MB
            'maxnum' : 3,
            'pid': pid,
            'maxsizefun': function(nowsize) { //超出大小回调
                var maxsizeMB = size / 1024 / 1024;
                if (type == 'files' || type == 'comments') {
                    if (is_vip != 0 && is_vip != 30) { //免费版 
                        var alertContent = '<div class="text-center"><p class="m-b">最大支持 ' + maxsizeMB + ' MB,现在为 ' + nowsize + '。';
                        $('#modal-alert').modal('show').find('.modal-title').text('上传的文件过大')
                            .end().find('.modal-body').attr('data-pid',pid).empty().append(alertContent)
                            .end().find('.modal-footer').remove();
                        $('[submit_box_id='+ pid +']').find('#wait').css('opacity', '0');
                        $('[submit_box_id='+ pid +']').find('#wait').hide();
                        $('[submit_box_id='+ pid +']').find('#uploading').hide();
                    } else {
                        var alertContent = '<p class="text-center"><i class="fa fa-exclamation-circle text-warn m-r"></i>您上传的文件过大，请<a class="text-green link text-u-l p-x-xs" href="javascript:open_qq();">联系我们</a>寻求帮助</p>';
                        $('#modal-alert').modal('show').find('.modal-title').text('上传的文件过大')
                            .end().find('.modal-body').empty().append(alertContent)
                            .end().find('.modal-footer').remove();
                        $('[submit_box_id='+ pid +']').find('#wait').css('opacity', '0');
                        $('[submit_box_id='+ pid +']').find('#wait').hide();
                        $('[submit_box_id='+ pid +']').find('#uploading').hide();
                    }
                    $('[submit_box_id='+ pid +']').find('#wait').css('opacity', '0');
                    $('[submit_box_id='+ pid +']').find('#wait').hide();
                    $('[submit_box_id='+ pid +']').find('#uploading').hide();
                } else if (type == 'imgs') {
                    if (is_vip != 0 && is_vip != 30) { //免费版 
                        var alertContent = '<div class="text-center"><p class="m-b">最大支持 ' + maxsizeMB + ' MB,现在为 ' + nowsize + '，付费用户拥有更高上传权限</p>' +
                            '<a href="//cli.im/news/price" target="_blank" class="btn btn-sm white m-r">查看版本比较</a>' +
                            '<a href="//' + USER_DOMAIN + '/buy" target="_blank" class="btn btn-sm green">购买</a>';
                        $('#modal-alert').modal('show').find('.modal-title').text('上传的图片过大')
                            .end().find('.modal-body').empty().append(alertContent)
                            .end().find('.modal-footer').remove();
                    } else {
                        var alertContent = '<p class="text-center"><i class="fa fa-exclamation-circle text-warn m-r"></i>您上传的文件过大，请<a class="text-green link text-u-l p-x-xs" href="javascript:open_qq();">联系我们</a>寻求帮助</p>';
                        $('#modal-alert').modal('show').find('.modal-title').text('上传的图片过大')
                            .end().find('.modal-body').empty().append(alertContent)
                            .end().find('.modal-footer').remove();
                    };
                } else if (type == 'deqr') {
                    $(".deqr_loading").hide();
                    alert("最大支持2MB，现在为" + nowsize);
                    $(".deqr_prompt").show();
                } else {
                    alert("最大支持2MB，现在为" + nowsize);
                }
                $('#wait').css('opacity', '0');
                $('#uploading').hide();
            },
            'start': function($setAfter) { //开始上传
                if (type == 'comments' || type == 'imgs') {
                    $('#filedatacodetest').attr('disabled', 'disabled'); // 禁止再次上传
                    $('#upload-before, #upload-success').addClass('none'); // 上传前div，上传成功div隐藏
                    // $('#uploading').removeClass('none'); //进度条 显示
                    if (type == 'comments') {
                        $('.annex-btn-input').attr('disabled', 'disabled');
                        $('.annex-btn-input').parent().css('cursor','not-allowed');
                        $('.annex-btn-input').parent().css('backgroundColor','#fafafa');
                    }
                } else if (type == 'deqr') {
                    $setAfter("<span>0%</span>");
                } else {
                    $setAfter("<span>0%</span>");
                }
            },
            'progress': function(percentage, $objProgress) { //上传过程 
                if (type == 'comments' || type == 'imgs') {
                    $('[submit_box_id='+ pid +']').find('#uploading').find(".progress-bar").html(percentage + '%').css('width', percentage + '%');
                }
            },
            'complete': function(data) { //上传成功

                var file_size = data.filesize.replace(/\s/g,"");
                var file_name = data.name.replace(/\s/g,"");

                var suffix_name = Util.getSuffix(data.name);
                var new_name = suffix_name[0].toLowerCase();

                var isImgs = Util.isImgs(new_name);

                if (type == "comments") {
                    $('#uploading').find(".progress-bar").html('0%').css('width', '0%'); //恢复进度条0
                    $('#filedatacodetest').removeAttr('disabled'); //允许再次上传
                    // $('#upload-success').removeClass('none'); // 上传成功div显示

                    $('.annex-btn-input').removeAttr('disabled');
                    $('.annex-btn-input').parent().css('cursor','pointer');
                    $('.annex-btn-input').parent().css('backgroundColor','#fff');

                    $('#filename').val(data.name);
                    
                    $('#imgfile').val(data.path);
                    $('[submit_box_id='+ pid +']').find('#upload-success').find('img').attr('src', data.path);

                    // file-tag 用于计算上传文件的个数

                    if (type == 'comments') {
                        if (isImgs == 1) {
                            var path = data.path + '?x-oss-process=image/resize,m_fill,w_150,h_150';
                            var tpl = '<div file-tag class="item">' +
                                        "<img file-info img-render src="+ path +" file-path="+ data.path + " file-name="+ file_name +" file-size="+ file_size +" file-size-byte="+ data.filesize_byte +" alt="+ data.name +" />"+
                                        "<span remove-close class='remove-close'>"+
                                            "<i class='close-icon'>×</i>"+
                                        "</span>"+
                                    "</div>";
                            $('[submit_box_id='+ pid +']').find('#wait').before(tpl);
                        } else if (isImgs == 2) {
                            $('[data-filename]').html(data.name);
                            $('#uploading').hide();
                            var tpl = "<div file-tag class='file-item'>"+
                                        "<i class='fa fa-paperclip' style='color: #666;'></i>"+
                                        "<h3 file-info file-render class='file-name m-x-sm' file-path="+ data.path +" file-name="+ file_name +" file-size="+ file_size +" file-size-byte="+ data.filesize_byte +">"+ data.name +"</h3>"+
                                        "<span delete-file class='delete-file text-blue link'>删除</span>"+
                                    "</div>";

                            $('[submit_box_id='+ pid +']').find('[uploading-file]').before(tpl);
                            $('[submit_box_id='+ pid +']').find('#uploading').addClass('none'); //进度条 隐藏
                        }
                        
                        // // 获取文件大小
                        // $('#filesize').html(data.filesize);
                        pd = false;
                        $('[submit_box_id='+ pid +']').find('#wait').css('opacity', '0');

                        var length = $('[file-tag]').length;

                        if (length >= 3 ) {
                            $('[submit_box_id='+ pid +']').find('[filedatacode-test]').attr('disabled','disabled');
                            $('[submit_box_id='+ pid +']').find('[filedatacode-test]').css('cursor','not-allowed');
                            $('[submit_box_id='+ pid +']').find('[filedatacode-test]').parent().css('cursor','not-allowed');
                            $('[submit_box_id='+ pid +']').find('[filedatacode-test]').parent().css('backgroundColor','#fafafa');
                        }
                    }
                } else {
                    type = $(this).attr('data-type'); //重新获取当前type值
                    $('#' + type).val(data.path);
                    $('#upload_input_' + type).html(data.name);
                    alert("上传成功！");
                    re_data = data.path;
                }
            },
            'failed': function(msg) { //上传失败
                if (type == "comments" || type == 'imgs') {
                    pd = false;
                    $('#filedatacode').removeAttr('disabled'); //允许再次上传
                    $('#uploading').addClass('none'); //进度条 隐藏

                    if (type == "comments") {
                        $('.annex-btn-input').removeAttr('disabled');
                        $('.annex-btn-input').parent().css('cursor','pointer');
                        $('.annex-btn-input').parent().parent().css('backgroundColor','#fff');
                    }

                    var alertContent = '<p class="text-center"><i class="fa fa-exclamation-circle text-warn m-r"></i>' + msg +
                        '<br>如有需要，请<a class="text-green link text-u-l p-x-xs" href="javascript:open_qq();">联系我们</a>，我们的工程师将协助你解决该问题！</p>';
                    $('#modal-alert').modal('show').find('.modal-title').text('上传错误')
                        .end().find('.modal-body').empty().append(alertContent);

                    // 判断当前是否有已上传的图片、文件，如有：显示上传成功页面，没有：显示上传前页面
                    if ($('#imgfile').val() == '') {
                        $('#upload-before').removeClass('none');
                        $('#uploading, #upload-success').addClass('none');
                    } else {
                        $('#upload-success').removeClass('none');
                        $('#uploading, #upload-before').addClass('none');
                    }
                } else if (type == 'deqr') {
                    $('.deqr_prompt').hide();
                    $(".deqr_loading").hide();
                    $("p#deqrresult").text(msg);
                    $("#deqr_result").show();
                }
            }
        }, 'cliim');
    }
}