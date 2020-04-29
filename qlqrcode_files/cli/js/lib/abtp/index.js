(function () {
  /**
   * 获取cookie
   * @param name
   * @returns {string}
   */
  var getCookie = function (name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
      return unescape(arr[2]);
    } else {
      return "";
    }
  };
  /**
   * 获取指定版本
   * @param version_name
   * @returns {string}
   */
  var abtp = function (version_name) {
    //获取 cookie中的所有 ab测试数据 a1_1.c1_1
    var abtp_list_str = getCookie('claf');
    //有值,把数据处理成 { "a1": "1", "c1": "1" }
    var result = {};
    if (abtp_list_str) {
      var arr = abtp_list_str.split('.');
      for (var i = 0, len = arr.length; i < len; i++) {
        var keyValueArr = arr[i].split('_');
        var key = keyValueArr[0] || '';
        var value = keyValueArr[1] || '';
        result[key] = value;
      }
    }
    return version_name ? result[version_name] : result;
  };
  window.abtp = abtp;
})();
