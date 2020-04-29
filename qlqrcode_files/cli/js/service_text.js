/**
 * 用于根据时间动态修改页面上的电话与qq链接
 * 
 * Methods
 * - get404() : string  获取404电话
 * - getQQLink(name : string) : string  获取手机
 */
(function(window) {
  var year = 2018; // 这个变量没用 纯粹为了醒目标记今年几几年

  var holidaysMap = {
    2018: {
      holidays: [
        ['1.1'],
        ['2.15', '2.16', '2.17', '2.18', '2.19', '2.20', '2.21'],
        ['4.5', '4.6', '4.7'],
        ['4.29', '4.30', '5.1'],
        ['6.18'],
        ['9.24'],
        ['10.1', '10.2', '10.3', '10.4', '10.5', '10.6', '10.7'],
        ['12.30', '12.31', '1.1']
      ],
      needWordWeekend: ['2.11', '2.24', '4.8', '4.28', '9.29']
    },
    2019: {
      holidays: [
        ['1.1'],
        ['2.4', '2.5', '2.6', '2.7', '2.8', '2.9', '2.10'],
        ['4.5', '4.6', '4.7'],
        ['5.1', '5.2', '5.3', '5.4'],
        ['6.7', '6.8', '6.9'],
        ['9.13', '9.14', '9.15'],
        ['10.1', '10.2', '10.3', '10.4', '10.5', '10.6', '10.7'],
      ],
      needWordWeekend: ['2.2', '2.3', '4.28', '5.5', '9.29', '10.12']
    }
  }

  /**
   * 为了解决年份交界处上线的尴尬 改成提前写好文件 然后自动根据年份读取节日配置
   */
  function getHolidays() {
    var curYear = new Date().getFullYear();

    return holidaysMap[curYear].holidays;
  }

  /**
   * 为了解决年份交界处上线的尴尬 改成提前写好文件 然后自动根据年份读取节日配置
   */
  function getNeedWordWeekend() {
    var curYear = new Date().getFullYear();

    return holidaysMap[curYear].needWordWeekend;
  }

  var holidays = getHolidays(); // 节假日
  var needWordWeekend = getNeedWordWeekend(); // 需要工作的周末

  // 电话映射表
  var serviceTel = {
    'mkl': '0574-55330934',   // 马康丽
    'tms': '0574-55330932',   // 汤咪莎
    'shb': '0574-55330934',   // 孙红波
    'jg': '蒋工：134 2929 0979'
  };

  var specialPageLinkMap = {
    '/solution/building': '//q.url.cn/CDCCtH', // 建筑施工营销页
    '/solution/inspection_electricity': '//q.url.cn/ABtqHH', // 电力设备营销页
    '/solution/property_fire': '//q.url.cn/abUMUH', // 物业消防营销页
    '/solution/railway_inspection': '//q.url.cn/CDZCtH', // 铁路巡更营销页
    '/solution/electricity': '//q.url.cn/ABqqHH', // 巡检通用营销页
    '/news/fupin': '//q.url.cn/cdiU3H', // 巡检通用营销页
    '/news/education': '//q.url.cn/ablMUH', // 学生管理营销页
    '/origin/home': '//q.url.cn/abPMUH', // 溯源管理营销页
    '/solution/books': '//q.url.cn/CDFCtH', // 图书出版社营销页
    '/news/2025wuliu': '//q.url.cn/CDICtH', // 单证流转营销页
    '/news/2025qc': '//q.url.cn/CDkCtH', // 质量追溯营销页
    '/news/2025sc': '//q.url.cn/CDxCtH', // 生产管理营销页
    '/center': '//q.url.cn/ABL0vU', // 生产管理营销页
  };

  /**
   * 判断当前页面是不是行业案例下的页面
   * 判断规则 url的path是不是'/news/client'开头
   */
  function isClientArticle() {
    var pathNameArr = window.location.pathname.split('/');

    pathNameArr.shift();

    return ['', pathNameArr.shift(), pathNameArr.shift()].join('/') === '/news/client';
  }

  /**
   * 判断今年是不是闰年
   */
  function isLeapYear() {
    var year = new Date().getFullYear();
    return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
  }

  // 每月第一天对应的前一天映射表
  var holidayPrevDayMap = [
    '11.30', 
    '12.31', 
    '1.31', isLeapYear() ? '2.29' : '2.28', 
    '3.31', 
    '4.30', 
    '5.31', 
    '6.30', 
    '7.31', 
    '8.31', 
    '9.30', 
    '10.31'
  ];

  /**
   * 判断今天是不是休息日的最后一天的17:30之后
   */
  function theLastDayOffHoliday() {
    var date = new Date();
    var day = date.getDay();
    var today = (date.getMonth() + 1) + '.' + date.getDate();

    /**
     * 如果今天是需要工作的日子
     */
    if (~needWordWeekend.indexOf(today)) {
      return false;
    }

    
    var isLastDay = holidays.some(function(arr) {
      return today === arr[arr.length - 1];
    });

    /**
     * 如果是假日最后一天
     */
    if (isLastDay) {
      return inTimeSection('17:30-24:00');
    }

    /**+
     * 如果是周日
     */
    if (day === 0) {
      return inTimeSection('17:30-24:00');
    }
  }

  // cvid
  function getCookie(name) {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
  }

  function _cvid_is_conditions() {
    // cvid (尾号双数)
    var _cvid = getCookie("cvid");
    if (_cvid && _cvid != null) {
      if (/0|2|4|6|8/.test(_cvid.substr(-1))) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  function dutyBranchQQ() {
    if (_cvid_is_conditions()) {
      return '//q.url.cn/abtRMe?_type=wpa&qidian=true';
    } else {
      return '//q.url.cn/cdAR5l?_type=wpa&qidian=true';
    }
  }

  /**
   * 判断今天是不是休息日(双休日 + 节假日)
   */
  function todayIsDayOff() {
    var date = new Date();
    var day = date.getDay();
    var today = (date.getMonth() + 1) + '.' + date.getDate();

    // 拍平数组
    var flatHolidays = holidays.toString().split(',');

    // 如果是需要工作的周末
    if (~needWordWeekend.indexOf(today)) {
      return false;
    }

    // 如果是节假日
    if (~flatHolidays.indexOf(today)) {
      return true;
    }

    // 如果是周末
    if (day === 0 || day === 6) {
      return true;
    }

    return false;
  }

  /**
   * 判断当前时间是不是在传入的时间区间内
   * 调用方式: inTimeSection('9-17:30', '13-20')
   */
  function inTimeSection() {
    var date = new Date();
    var now = date.getHours() * 3600 + date.getMinutes() * 60;
    var section = [].slice.call(arguments);

    return section.some(function(time) {
      var start = time.split('-')[0];
      var end = time.split('-')[1];

      var startSeconds = parseInt(start.split(':')[0]) * 3600 + parseInt(start.split(':')[1]) * 60;
      var endSeconds = parseInt(end.split(':')[0]) * 3600 + parseInt(end.split(':')[1]) * 60;

      return now > startSeconds && now < endSeconds;
    });
  }

  /**
   * 验证是否在节假日附近（节假日最后一天与前一天）
   */
  function checkNearHoliday() {
    var date = new Date();
    var day = date.getDay();
    var today = (date.getMonth() + 1) + '.' + date.getDate();
    
    var pl = '';

    // 去节假日中判断
    if (holidays.some(function(arr) {
      var lastDay = arr[arr.length - 1]; // 这次节假日的前一天
      var prevDay = ''; // 这次节假日的后一天

      var month = parseInt(arr[0].split('.')[0]); 
      var date = parseInt(arr[0].split('.')[1]);

      // 如果是1号
      if (date === 1) {
        // 去映射表里找前一天
        prevDay = holidayPrevDayMap[month];
      } else {
        // 否则 日-1 拼接月
        prevDay = month.toString() + '.' + (date - 1).toString();
      }
      
      // 判断今天是不是前一天或者这次节假日的最后一天
      if (today === prevDay) {
        pl = 'p';
        return true;
      }
      if (today === lastDay) {
        pl = 'l';
        return true;
      }
      
      return false;
    })) {
      if (pl === 'p') {
        if (inTimeSection('20:00-24:00')) return true;
      }

      if (pl === 'l') {
        if (inTimeSection('00:00-17:30')) return true;
      }
    }

    // 如果今天是要工作的休息日
    if (~needWordWeekend.indexOf(today)) {
      return false;
    }

    // 判断今天是不是周五或者周日
    if (day === 5 && inTimeSection('20:00-24:00')) {
      return true;
    }
    
    if (day === 0 && inTimeSection('00:00-17:30')) {
      return true;
    }

    return false;
  }

  /**
   * 构造函数
   */
  function ServiceTextGetter() {

  }

  ServiceTextGetter.fn = ServiceTextGetter.prototype;
  
  /**
   * 获取400电话
   */
  ServiceTextGetter.fn.get400 = function(name) {
    // 如果在工作时间内
    if (!todayIsDayOff() && inTimeSection('9:00-17:30')) {
      return serviceTel[name];
    }
  
    return '400-002-0232';
  };

  /**
   * 获取qq客服链接
   * 
   * slide_top_index_v2.js
   * page-price.html
   */
  ServiceTextGetter.fn.getQQLink = function() {
    var capacity_info = window._capacity_info || {};
    var edition_id = capacity_info.edition_id;
    var pathname = window.location.pathname;
    // 免费版用户
    if (!edition_id || edition_id === '1') {
      var domain = '';
      var hostArr = location.hostname.split('.');
      if (hostArr.length === 3) {
        domain = hostArr[0];
      }
      if (
        !domain && (
          pathname === '/batch'
          || pathname === '/user/active/newcode' && location.search.indexOf('type=batch') > -1
        )
      ) {
        return '//q.url.cn/ab9gkl?_type=wpa&qidian=true';
      }
    }

    var defaultLink = specialPageLinkMap[pathname] || '//q.url.cn/s/at6ueXm';

    /**
     * 如果是行业案例
     */
    if (isClientArticle()) {
      return 'http://q.url.cn/cdWl5H?_type=wpa&qidian=true';
    }

    // 判断是否在节假日前一天或者节假日在最后一天 并且在时间段内
    if (checkNearHoliday()) {
      return dutyBranchQQ();
    }

    // 如果今天不是休息日
    if (!todayIsDayOff() && inTimeSection('17:30-20:00')) {
      return '//q.url.cn/ab7RMe?_type=wpa&qidian=true';
    }

    if (theLastDayOffHoliday()) {
      return defaultLink;
    }

    // 如果是休息日
    if (todayIsDayOff()) {
      return dutyBranchQQ();
    }

    return defaultLink;
  };


  /**
   * 为特定场景提供的方法
   */
  ServiceTextGetter.fn.special = {};
  /**
   * 为slide_top_index_v2文件中的电话提供判断
   * 为工具码和场景生码下的电话提供判断 (include-isdisplay.html)
   * 为名片码题提供电话的判断 (page-vcard-nc.html)
   * 为价格页面提供电话的判断 (page-price.html)
   * 
   * user项目 page-center-index-new.tpl
   */
  ServiceTextGetter.fn.special.useHaveSupportPhone = function() {
    // 如果在工作时间内
    if (!todayIsDayOff() && inTimeSection('9:00-17:30')) {
      return true;
    }
  
    return '400-002-0232';
  };

  /**
   * 为include-isdisplay.html提供qq的判断
   * include-isdisplay.html
   * 
   * user项目 page-center-index-new.tpl
   */
  ServiceTextGetter.fn.special.useHaveSupportQQ = function() {
    return ServiceTextGetterFactory().getQQLink() === '//q.url.cn/s/at6ueXm' 
            ? true 
            : ServiceTextGetterFactory().getQQLink();
  }

  ServiceTextGetter.fn.special.isWorkTime = function() {
    // 判断是不是休息日 如果是则肯定不是工作日
    if (todayIsDayOff()) {
      return false;
    }

    // 判断当前时间是不是在上班区间内 如果不是则不再工作时间
    if (!inTimeSection('9:00-17:30')) {
      return false;
    }

    return true;
  }

  ServiceTextGetter.fn.special.isWorkTimeFull = function() {
    // 判断是不是休息日 如果是则肯定不是工作日
    if (todayIsDayOff()) {
      if (inTimeSection('9:00-17:30')) {
        return true;
      }
      return false;
    }
    // 判断当前时间是不是在上班区间内 如果不是则不再工作时间
    if (inTimeSection('9:00-20:00')) {
      return true;
    }

    return false;
  }

  ServiceTextGetter.fn.special.todayIsDayOff = todayIsDayOff;

  /**
   * 包装成工厂
   */
  function ServiceTextGetterFactory() {
    return new ServiceTextGetter();
  }

  // 暴露给全局
  window.$ServiceTextGetter = ServiceTextGetterFactory;
})(window);
