(function () {
  var windowEl = $(window);
  var browserTipInited = windowEl.data('browserTipInited');
  if (browserTipInited) {
    return;
  }
  windowEl.data('browserTipInited', true);

  var userAgent = navigator.userAgent;
  var lcUserAgent = userAgent.toLowerCase();

  var isIE = 'ActiveXObject' in window;
  var ieVersion = 0;
  if (isIE) {
    ieVersion = +(lcUserAgent.match(/msie (\d+)/) && RegExp.$1);
    if (!ieVersion && lcUserAgent.indexOf('rv:11.0') > -1) {
      ieVersion = 11;
    }
  }

  var BROWSER_INFO = (function () {
    // appCode(浏览器类型):
    // 0: unknown
    // 1: 搜狗浏览器
    // 2: qq浏览器
    // 3: 2345王牌浏览器
    // 4: 2345加速浏览器
    // 5: uc浏览器
    // 6: 猎豹浏览器
    // 7: 遨游浏览器
    // 8: 百度浏览器
    // 9: 世界之窗浏览器
    // 10: 360安全浏览器
    // 11: 360极速浏览器
    // 101: chrome
    // 102: firefox
    // 103: safari
    // 104: ie
    // 105: edge

    // kernelCode(内核类型):
    // 0: unknown
    // 1: chrome
    // 2: ie
    // 3: edge

    var appInfoMap = {
      // 搜狗浏览器
      metasr: {
        appCode: 1,
        appName: '搜狗浏览器'
      },
      // qq浏览器
      qqbrowser: {
        appCode: 2,
        appName: 'qq浏览器'
      },
      // 2345王牌浏览器
      '2345explorer': {
        appCode: 3,
        appName: '2345王牌浏览器'
      },
      // 2345加速浏览器
      '2345chrome': {
        appCode: 4,
        appName: '2345加速浏览器'
      },
      // uc浏览器
      ubrowser: {
        appCode: 5,
        appName: 'uc浏览器'
      },
      // 猎豹浏览器
      lbbrowser: {
        appCode: 6,
        appName: '猎豹浏览器'
      },
      // 遨游浏览器
      maxthon: {
        appCode: 7,
        appName: '遨游浏览器'
      },
      // 百度浏览器
      bidubrowser: {
        appCode: 8,
        appName: '百度浏览器'
      },
      // 世界之窗浏览器
      theworld: {
        appCode: 9,
        appName: '世界之窗浏览器'
      },
      // 360安全浏览器
      '360se': {
        appCode: 10,
        appName: '360安全浏览器'
      },
      // 360极速浏览器
      '360ee': {
        appCode: 11,
        appName: '360极速浏览器'
      },
      // chrome
      chrome: {
        appCode: 101,
        appName: 'chrome'
      },
      // firefox
      firefox: {
        appCode: 102,
        appName: 'firefox'
      },
      // safari
      safari: {
        appCode: 103,
        appName: 'safari'
      },
      // ie
      ie: {
        appCode: 104,
        appName: 'ie'
      },
      // edge
      edge: {
        appCode: 105,
        appName: 'edge'
      }
    };

    var result = {
      isShell: false,
      appCode: 0,
      appName: 'unknown',
      appVersion: 0,
      kernelCode: 0,
      kernelName: 'unknown',
      kernelVersion: 0
    };

    var edgeVersion = 0;
    if (/edge\D+(\d[\d.]*)/.test(lcUserAgent)) {
      edgeVersion = RegExp.$1;
    }

    var chromeVersion = 0;
    if (!edgeVersion && /chrome\D+(\d[\d.]*)/.test(lcUserAgent)) {
      chromeVersion = RegExp.$1;
    }

    var isShell = result.isShell;
    var appCode = result.appCode;
    var appName = result.appName;
    var appVersion = result.appVersion;
    var kernelCode = result.kernelCode;
    var kernelName = result.kernelName;
    var kernelVersion = result.kernelVersion;

    // 判断国内套壳浏览器
    if (/(metasr|qqbrowser|2345explorer|2345chrome|ubrowser|lbbrowser|maxthon|bidubrowser|theworld|360se|360ee)/.test(lcUserAgent)) {
      var key = RegExp.$1;
      var appInfo = appInfoMap[key];
      isShell = true;
      appCode = appInfo.appCode;
      appName = appInfo.appName;
      if (/(qqbrowser|ubrowser|maxthon|bidubrowser|theworld)\D+(\d[\d.]*)/.test(lcUserAgent)) {
        appVersion = RegExp.$2;
      }
    } else if (/(firefox)\D+(\d[\d.]*)/.test(lcUserAgent)) {
      var key = RegExp.$1;
      var appInfo = appInfoMap[key];
      appCode = appInfo.appCode;
      appName = appInfo.appName;
      appVersion = RegExp.$2;
    } else if (/version\D+(\d[\d.]*).*(safari)/.test(lcUserAgent)) {
      var key = RegExp.$2;
      var appInfo = appInfoMap[key];
      appCode = appInfo.appCode;
      appName = appInfo.appName;
      appVersion = RegExp.$1;
    } else if (chromeVersion) {
      var key = 'chrome';
      var appInfo = appInfoMap[key];
      appCode = appInfo.appCode;
      appName = appInfo.appName;
      appVersion = chromeVersion;
    } else if (ieVersion) {
      var key = 'ie';
      var appInfo = appInfoMap[key];
      appCode = appInfo.appCode;
      appName = appInfo.appName;
      appVersion = ieVersion;
    } else if (edgeVersion) {
      var key = 'edge';
      var appInfo = appInfoMap[key];
      appCode = appInfo.appCode;
      appName = appInfo.appName;
      appVersion = edgeVersion;
    }

    if (chromeVersion) {
      kernelCode = 1;
      kernelName = 'chrome';
      kernelVersion = chromeVersion;
    } else if (ieVersion) {
      kernelCode = 2;
      kernelName = 'ie';
      kernelVersion = ieVersion;
    } else if (edgeVersion) {
      kernelCode = 3;
      kernelName = 'edge';
      kernelVersion = edgeVersion;
    }

    $.extend(result, {
      isShell: isShell,
      appCode: appCode,
      appName: appName,
      appVersion: appVersion,
      kernelCode: kernelCode,
      kernelName: kernelName,
      kernelVersion: kernelVersion
    });

    return result;
  })();
  window.BROWSER_INFO = BROWSER_INFO;

  var appCode = BROWSER_INFO.appCode;
  var appVersion = BROWSER_INFO.appVersion;
  var kernelCode = BROWSER_INFO.kernelCode;
  var kernelVersion = BROWSER_INFO.kernelVersion;

  var staticDomainMap = {
    // dev: '//static.cli.me/cli',
    dev: '//static-develop.clewm.net/cli',
    net: '//static-develop.clewm.net/cli',
    com: '//static-test.clewm.net/cli',
    online: '//static.clewm.net/cli'
  };
  /*var logApiDomainMap = {
    // dev: '//log.api.cli.me',
    dev: '//log-api.cliim.net',
    net: '//log-api.cliim.net',
    com: '//log-api.cliim.com',
    online: '//log.api.cli.im'
  };*/
  var domain = location.hostname.split('.').slice(-2).join('.');
  var envMap = {
    'cli.me': 'dev',
    'cliim.net': 'net',
    'cliim.com': 'com',
    'cli.im': 'online'
  };
  var env = envMap[domain] || 'online';
  var staticDomain = staticDomainMap[env];
  // var logApiDomain = logApiDomainMap[env];
  var logApiDomain = '//log.api.cli.im';
  if (!$('#has_browserTip_css').length) {
    var autoVersion = document.documentElement.getAttribute('auto_version') || '';
    document.write([
      '<link rel="stylesheet" href="', staticDomain, '/css/browserTip.css?v=', autoVersion, '">'
    ].join(''));
  }
  var render = function () {
    var host = location.host;
    var pathname = location.pathname;
    if (envMap[host] && pathname.indexOf('/user/') !== 0) {
      if (appCode === 1) {
        if (pathname !== '/files' && pathname !== '/img' && pathname !== '/multimedia') {
          return;
        }
      } else if (pathname !== '/img' && pathname !== '/multimedia') {
        return;
      }
    }
    var euc = window.encodeURIComponent;
    var browser_shell = appCode;
    var browser_shell_version = appVersion;
    var browser_kernel = kernelCode;
    var browser_kernel_version = kernelVersion;
    var page_url = location.href;
    var logApiUrl = [
      logApiDomain, '/index/Browser',
      '?browser_shell=', euc(browser_shell),
      '&browser_shell_version=', euc(browser_shell_version),
      '&browser_kernel=', euc(browser_kernel),
      '&browser_kernel_version=', euc(browser_kernel_version),
      '&page_url=', euc(page_url)
    ].join('');
    var html = [
      '<div id="__browserTip" class="x-browser-tip" style="border:1px solid #faf2cc;background-color:#fcf8e3;height:40px;line-height:40px;text-align:center;font-size:14px;">',
      /**/'你当前的浏览器版本过低，无法正常使用草料二维码完整功能，建议升级你的浏览器&nbsp;&nbsp;',
      /**/'<a href="https://www.google.cn/chrome" target="_blank" style="color:#357bb3;" title="升级Google Chrome浏览器">',
      /**//**/'<span style="display:inline-block;width:18px;height:18px;vertical-align:text-bottom;background:url(', staticDomain, '/images/browserChrome.png) no-repeat center center;background-size:16px 16px;"></span>',
      /**//**/'&nbsp;chrome',
      /**/'</a>',
      /**/'&nbsp;&nbsp;',
      /**/'<a href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads" target="_blank" style="color:#357bb3;" title="升级IE浏览器">',
      /**//**/'<span style="display:inline-block;width:18px;height:18px;vertical-align:text-bottom;background:url(', staticDomain, '/images/browserIE.png) no-repeat center center;background-size:18px 18px;"></span>',
      /**//**/'&nbsp;IE',
      /**/'</a>',
      '</div>'
    ].join('');
    $('body').prepend(html);
    document.documentElement.setAttribute('has_browser_tip', true);
    if (!envMap[host] || pathname !== '/img') {
      $('<img />').attr('src', logApiUrl);
    }
  };
  window.__createBrowserTip = function () {
    var browserTipEl = $('#__browserTip');
    if (browserTipEl.length) {
      return;
    }
    render();
  };
  var nKernelVersion = parseFloat(kernelVersion);
  if (isNaN(nKernelVersion)) {
    nKernelVersion = 0;
  }
  var nAppVersion = parseFloat(appVersion);
  if (isNaN(nAppVersion)) {
    nAppVersion = 0;
  }
  if (ieVersion) {
    if (ieVersion < 10 || appCode === 1
      || lcUserAgent.indexOf('ubrowser/4.') > -1 || lcUserAgent.indexOf('ubrowser/5.') > -1) {
      render();
    }
  } else if (kernelCode === 1) {
    // chrome
    if (nKernelVersion < 40) {
      render();
    }
  } else if (appCode === 102) {
    // firefox
    if (nAppVersion < 49) {
      render();
    }
  } else if (appCode === 103) {
    // safari
    if (nAppVersion < 11) {
      render();
    }
  }
})();
