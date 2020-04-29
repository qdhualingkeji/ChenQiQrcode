/**
*   getCapacityInfo 容量超标提示方法
*   @param fileSize 文件byte大小
*   @returns 如下
*/
// 数据统计
function StatisticsData(fir,sec){
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
}
var getVersionName = function(editionId) {
    switch (editionId) {
        case '1':
        return '免费版';
        case '2':
        return '基础版';
        case '3':
        return '高级版';
        case '15':
        return '旗舰版';
        case '44':
        return '行业专属版';
        case '4':
        return '解决方案版';
        default:
        return '';
    }
};

var nextVersionId = function(editionId) {
    switch (editionId) {
        case '1':
        return '2';
        case '2':
        return '3';
        case '3':
        return '15';
        case '15':
        return '44';
        case '44':
        return '44';
        case '4':
        return '4';
        default:
        return '3';
    }
};

$(document).on('hidden.bs.modal','#modal-alert', function () {
    $('#modal-alert .modal-header, #modal-alert .modal-footer').removeClass('none');
})
$(document).on("click", "[cli-data-statistics]", function(){
    var dataArr = $(this).attr("cli-data-statistics").split(",");
    StatisticsData(dataArr[0],dataArr[1]);
});
var getCapacityInfo = function(){
    var capacityCount = 0,  // 请求执行状态 1为执行完成有数据
        currentCapacity,
        maxCapacity;
    var currentCapacityFile,
        maxCapacityFile;
    var currentCapacityMiddle,
        maxCapacityMiddle;
    var editionId = '1';

        if (typeof nav_data != "undefined") {
            $.ajax({
                type: 'GET',
                url: '//' + USER_DOMAIN + '/api/edition/CapacityImgFile',
                data: {
                    token_user_id: nav_data._token_user_id_bs,
                    token: nav_data._capacityToken
                },
                dataType: 'jsonp',
                jsonp: 't',
                success: function(ret) {
                    currentCapacity = ret.data.file_capacity.used_byte;
                    maxCapacity = ret.data.file_capacity.maxsize_byte;
                    capacityCount++;
                }
            });
        } else if (typeof nav_data == "undefined") {
            $.ajax({
                type: 'GET',
                url: '/Api/User/get_user_capacity',
                dataType: 'json',
                success: function(ret) {
                    if (ret.status > 0) {
                        currentCapacity = ret.data.file_capacity.used_byte;
                        maxCapacity = ret.data.file_capacity.maxsize_byte;
                        // currentCapacityFile = ret.data.file.used_byte;
                        // maxCapacityFile = ret.data.file.maxsize_byte;
                        capacityCount++;
                        editionId = ret.data.edition_id;
                    }
                }
            });
          // mock数据
          /*(function(ret) {
            if (ret.status > 0) {
              currentCapacity = ret.data.file_capacity.used_byte;
              maxCapacity = ret.data.file_capacity.maxsize_byte;
              // currentCapacityFile = ret.data.file.used_byte;
              // maxCapacityFile = ret.data.file.maxsize_byte;
              capacityCount++;
              editionId = ret.data.edition_id;
            }
          })(
            {"status":2,"data":{"title":"\u514d\u8d39\u7248","end_time":"1970\/01\/01","edition_id":"1","from_edition_id":"1","remain_day":0,"is_test":"0","time_status":1,"edition_new":false,"edition_old":false,"capacity_packet":{"file_capacity":0,"origin_code":0,"idcode":0},"members_trial":{"start_time":0,"end_time":0,"status":0},"codes_count":0,"last_7day_scan_count":0,"idcode":0,"origin_code":200000,"file_capacity":{"used":"48.02M","maxsize":"50M","state":2,"used_byte":52420800,"maxsize_byte":52428800,"bar_percent":96},"av_flow":{"used":"0KB","maxsize":"12G","state":1,"used_byte":0,"maxsize_byte":12884901888,"bar_percent":0}},"msg":"ok"}
          );*/
        }

      var getExistingFileSize = function () {
          var sum = 0;
          $('#upload-pic-content').find('.upload-pic-item').each(function (index, dom) {
            var originSize = parseInt($(dom).attr('data-origin-size'), 10);
            if (isNaN(originSize)) {
              originSize = 0;
            }
            sum += originSize;
          });
          return sum;
      };

      var getFileSize = function (files) {
        files = files || [];
        var sum = 0;
        var len = files.length;
        for (var i = 0; i < len; i++) {
          var file = files[i];
          sum += file.size;
        }
        return sum;
      };

    /**
     * accumulationFileSize 容量超标状态判断
     * @param   fileType 默认为空（图片容量） file 文件容量
     * @param   files 文件列表
     * @returns 2 容量未超标，上传成功; 1 容量未超出(xx * _per)  _per=1.5 == 150%，提示升级; 0 容量超出150%，提示升级;
     */
    this.accumulationFileSize = function(fileType, files){
        var _per = 1;// _per == 1.5 表示1.5倍 即150%
        if (capacityCount > 0) {
            // if (fileType) {     //文件容量判断
            //     currentCapacityMiddle = currentCapacityFile;
            //     maxCapacityMiddle = maxCapacityFile;
            // }else{
            currentCapacityMiddle = currentCapacity;
            if (fileType === 'nc-imgs') {
              currentCapacityMiddle += getExistingFileSize() + getFileSize(files);
            }
            maxCapacityMiddle = maxCapacity;
            // }
            if (currentCapacityMiddle < maxCapacityMiddle * _per) {
                if (currentCapacityMiddle < maxCapacityMiddle) {
                    return 2;   //容量未超标，上传成功
                } else {
                    return 1;   //容量未超出150%，提示升级
                }
            } else {
                return 0;   //容量超出150%，提示升级
            }
        } else {
            return 2;   //数据未请求完毕，默认上传成功（冗余）
        }
    };

    /**
     * capacityOverproof 容量超标提示
     * @param type 超出类型 1为超出容量但未超出150% 0为超出150%
     * @returns
     */
    this.capacityOverproof = function(type, fileType, files){
        files = files || [];
        var filesLen = files.length;
        // if (fileType == "file") {
            // fileType = "文件";
        //     currentCapacityMiddle = currentCapacityFile;
        //     maxCapacityMiddle = maxCapacityFile;
        // } else {
        //     fileType = "图片";
        currentCapacityMiddle = currentCapacity;
        if (fileType === 'nc-imgs') {
          currentCapacityMiddle += getExistingFileSize();
        }
        maxCapacityMiddle = maxCapacity;
        // }
        var statisticsObj = {
            open: '',
            next: '',
            upVersion: '',
        };
        if (window.location.pathname.indexOf('user/active/edit') > -1 || window.location.pathname.indexOf('user/active/addActive') > -1) {
            if (fileType == 'file') {
                statisticsObj = {
                    open: 12,
                    next: '83,14',
                    versionPrice: '83,30',
                    upVersion: '83,16',
                };
            } else {
                statisticsObj = {
                    open: 18,
                    next: '83,20',
                    upVersion: '83,22',
                    versionPrice: '83,31',
                };
            }
        } else {
            if (fileType == 'file') {
                statisticsObj = {
                    open: 13,
                    next: '83,15',
                    upVersion: '83,17',
                    versionPrice: '83,32',
                };
            } else {
                statisticsObj = {
                    open: 19,
                    next: '83,21',
                    upVersion: '83,23',
                    versionPrice: '83,33',
                };
            }
        }
        if (capacityCount > 0) {
            if (type == 1 || type == 0) {
                var fileSize = (getFileSize(files)/1024/1024).toFixed(2);
                if (fileSize === '0.00') {
                  fileSize = '0.01';
                }
                var maxCapacityMB = parseFloat((maxCapacityMiddle/1024/1024).toFixed(2));
                var currentCapacityMB = parseFloat((currentCapacityMiddle/1024/1024).toFixed(2));
                var alertClose = '<button type="button" class="close" data-dismiss="modal" style="position: absolute;top: 20px;right: 20px;" cli-data-statistics="' + statisticsObj.next + '"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>';
                var alertTitle = '<h4 class="m-b"><i class="fa fa-exclamation-circle text-orange m-r" style="font-size: 22px"></i>容量超标，升级版本获得更多容量</h4>';
                var alertContent = '<p class="m-b-md" style="padding-left: 32px">你的' + getVersionName(editionId) + '总容量为<strong>' + maxCapacityMB + '</strong>MB，已使用<strong class="' + (filesLen ? '' : 'text-danger') + '">' + currentCapacityMB + '</strong>MB，' + (filesLen ? '上传' + (fileType === 'nc-imgs' ? '图片' : '文件') + '大小<strong class="text-danger">' + fileSize + '</strong>MB，' : '') +  '无法继续上传，付费升级可获取更多容量。<a href="//cli.im/help/48183" target="_blank" class="text-blue" cli-data-statistics="83,11">了解容量</a></p>';
                var alertFooter;
                if (editionId == '1') {
                    var alertFooter = '<div class="text-right"><a href="//'+CLI_DOMAIN+'/price?create_from=112" target="_blank" class="btn btn-sm btn-fw green m-l" cli-data-statistics="' + statisticsObj.versionPrice + '">查看价格</a></div>';
                } else {
                    var alertFooter = '<div class="text-right"><a href="//user.'+CLI_DOMAIN+'/buy?create_from=112&version=' + nextVersionId(editionId) + '" target="_blank" class="btn btn-sm btn-fw green m-l" cli-data-statistics="' + statisticsObj.upVersion + '">立即升级</a></div>';
                }
                var alertBody = alertClose + alertTitle + alertContent + alertFooter;
                StatisticsData(83, statisticsObj.open)
                $('#modal-alert')
                    .modal('show')
                    .find('.modal-header')
                    .addClass('none')
                    .end()
                    .find('.modal-footer')
                    .addClass('none')
                    .end()
                    .find('.modal-body')
                    .empty()
                    .append(alertBody);
            } else {
                return;
            }
        } else {
            return; //数据未请求完毕，默认无容量提示（冗余）
        }
    };
};
var getCapacityCommon = new getCapacityInfo();
