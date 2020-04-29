(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.$Consult = factory());
}(this, (function () { 'use strict';

  if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) {

        if (target == null) {
          // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource != null) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
        return to;
      },
      writable: true,
      configurable: true
    });
  }

  if (!Array.isArray) {
    Array.isArray = function (arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }

  // Production steps of ECMA-262, Edition 6, 22.1.2.1
  // Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
  if (!Array.from) {
    Array.from = function () {
      var toStr = Object.prototype.toString;
      var isCallable = function isCallable(fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function toInteger(value) {
        var number = Number(value);
        if (isNaN(number)) {
          return 0;
        }
        if (number === 0 || !isFinite(number)) {
          return number;
        }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function toLength(value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };

      // The length property of the from method is 1.
      return function from(arrayLike /*, mapFn, thisArg */) {
        // 1. Let C be the this value.
        var C = this;

        // 2. Let items be ToObject(arrayLike).
        var items = Object(arrayLike);

        // 3. ReturnIfAbrupt(items).
        if (arrayLike == null) {
          throw new TypeError("Array.from requires an array-like object - not null or undefined");
        }

        // 4. If mapfn is undefined, then let mapping be false.
        var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        var T;
        if (typeof mapFn !== 'undefined') {
          // 5. else
          // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }

          // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }

        // 10. Let lenValue be Get(items, "length").
        // 11. Let len be ToLength(lenValue).
        var len = toLength(items.length);

        // 13. If IsConstructor(C) is true, then
        // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
        // 14. a. Else, Let A be ArrayCreate(len).
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);

        // 16. Let k be 0.
        var k = 0;
        // 17. Repeat, while k < len… (also steps a - h)
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        // 18. Let putStatus be Put(A, "length", len, true).
        A.length = len;
        // 20. Return A.
        return A;
      };
    }();
  }

  (function (root) {

    var previousJsonpClient = root.jsonpClient,
        is_browser = typeof process !== "undefined" ? process.browser : typeof window !== "undefined",
        getJsonpBrowser,
        getJsonp,
        CALLBACK_REGEXP = /[\\?|&]callback=([a-z0-9_]+)/i,
        jsonpClient = function jsonpClient() {
      var args = Array.prototype.slice.apply(arguments),
          callback,
          urls = args.slice(0, -1),
          i = 0,
          error,
          results = [],
          addUrl,
          returnResult;
      try {
        callback = args.slice(-1)[0];
        if (typeof callback !== "function") {
          throw new Error("Callback not found");
        }
      } catch (e) {
        throw new Error("jsonpClient expects a callback");
      }
      if (typeof urls[0] !== "string") {
        urls = urls[0];
      }
      returnResult = function returnResult() {
        var i = 0;
        results = results.sort(function (a, b) {
          return a.position > b.position;
        });
        for (i = 0; results.length > i; i = i + 1) {
          results[i] = results[i].data;
        }
        results.unshift(null);
        callback.apply(null, results);
      };
      addUrl = function addUrl(url, position) {
        getJsonp(urls[i], function (err, data) {
          if (error) {
            return;
          }
          error = err;
          if (err) {
            return callback(err);
          }
          results.push({
            data: data,
            position: position
          });
          if (results.length === urls.length) {
            returnResult();
          }
        });
      };
      for (i = 0; urls.length > i; i = i + 1) {
        addUrl(urls[i] + "", i);
      }
    };
    jsonpClient.noConflict = function () {
      root.jsonpClient = previousJsonpClient;
      return jsonpClient;
    };
    getJsonpBrowser = function getJsonpBrowser() {
      var getCallbackFromUrl,
          loadScript,
          head = document.getElementsByTagName("head")[0];
      loadScript = function loadScript(url, callback) {
        var script = document.createElement("script"),
            done = false;
        script.src = url;
        script.async = true;
        script.onload = script.onreadystatechange = function () {
          if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
            done = true;
            script.onload = script.onreadystatechange = null;
            if (script && script.parentNode) {
              script.parentNode.removeChild(script);
            }
            callback();
          }
        };
        head.appendChild(script);
      };
      getCallbackFromUrl = function getCallbackFromUrl(url, callback) {
        var matches = url.match(CALLBACK_REGEXP);
        if (!matches) {
          return callback(new Error("Could not find callback on URL"));
        }
        callback(null, matches[1]);
      };
      return function (url, callback) {
        getCallbackFromUrl(url, function (err, callbackName) {
          var data,
              originalCallback = window[callbackName];
          if (err) {
            return callback(err);
          }
          window[callbackName] = function (jsonp_data) {
            data = jsonp_data;
          };
          loadScript(url, function (err) {
            if (!err && !data) {
              err = new Error("Calling to " + callbackName + " did not returned a JSON response." + "Make sure the callback " + callbackName + " exists and is properly formatted.");
            }
            if (originalCallback) {
              window[callbackName] = originalCallback;
            } else {
              try {
                delete window[callbackName];
              } catch (ex) {
                window[callbackName] = undefined;
              }
            }
            callback(err, data);
          });
        });
      };
    };
    getJsonp = is_browser ? getJsonpBrowser() : require("./jsonp-node.js");
    if (typeof module !== "undefined" && module.exports) {
      module.exports = jsonpClient;
    } else {
      root.jsonpClient = jsonpClient;
    }
  })(window);

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var $ = function $(selector) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    return root.querySelector(selector);
  };

  var $$ = function $$(selector) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    return [].concat(toConsumableArray(root.querySelectorAll(selector)));
  };

  var $create = function $create(tagName) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var el = document.createElement(tagName);

    if ('class' in opts) {
      el.className = opts.class;
    }

    if ('id' in opts) {
      el.id = opts.id;
    }

    return el;
  };

  var obj2style = function obj2style(obj) {
    var arr = [];

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        arr.push(i + ':' + obj[i]);
      }
    }

    return arr.join(';');
  };

  /**
   * 显示
   * @param {*} el 
   */
  var $show = function $show(el) {
    el.style.display = 'block';
    el.style.opacity = '1';
  };

  /**
   * 隐藏
   * @param {*} el 
   */
  var $hide = function $hide(el) {
    el.style.display = 'none';
    el.style.opacity = '0';
  };

  /**
   * 淡出
   * @param {*} el 
   */
  var $fadeOutList = [];
  var $fadeOut = function $fadeOut(el, cb) {
    el.style.opacity = '0';

    $fadeOutList.forEach(function (_ref, index) {
      var el2 = _ref.el,
          timer2 = _ref.timer;

      if (el2 === el) {
        clearTimeout(timer2);
        el.style.display = 'block';
        el.style.opacity = '1';
        $fadeOutList.splice(index, 1);
      }
    });

    var timer = setTimeout(function () {
      el.style.display = 'none';
      cb && cb();

      $fadeOutList.forEach(function (_ref2, index) {
        var el2 = _ref2.el,
            timer2 = _ref2.timer;

        if (el2 === el) {
          $fadeOutList.splice(index, 1);
        }
      });
    }, 300);

    $fadeOutList.push({ el: el, timer: timer });
  };

  /**
   * 淡入
   * @param {*} el 
   */
  var $fadeIn = function $fadeIn(el, cb) {
    el.style.display = 'block';
    el.style.opacity = '0';

    setTimeout(function () {
      el.style.opacity = '1';
    }, 0);
  };

  /**
   * 子元素添加
   * @param {*} parent 
   * @param  {...any} children 
   */
  var $append = function $append(parent) {
    for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      children[_key - 1] = arguments[_key];
    }

    if (children.length === 0) return;

    children.forEach(function (el) {
      if (el) parent.appendChild(el);
    });
  };

  // 为clickLog增加callback
  var addCallback = function addCallback(url) {
    if (url.match(/callback=[a-z]/i)) {
      return url;
    }
    return url + ("&callback=cb" + Math.random()).replace('.', '');
  };

  /**
   * clickLog
   * @param {*} domain 
   * @param {*} data 
   * @param {*} cb 
   */
  var clickLog = function clickLog(domain, data) {
    var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    window.jsonpClient(addCallback(domain + '/Api/ClickLog/click?fir=' + data[0] + '&sec=' + data[1]), cb);
  };

  var deepMerge = function deepMerge(obj1, obj2) {
    for (var key in obj2) {
      obj1[key] = obj1[key] && obj1[key].toString() === "[object Object]" ? deepMerge(obj1[key], obj2[key]) : obj1[key] = obj2[key];
    }
    return obj1;
  };

  var Tpl = (function (items, title, closeBtn, bottomText, clickDomain, bodyStyle, column, style, instance) {
    var el = $create('div', { class: '__consult_wrapper' });

    el.setAttribute('style', obj2style(style));

    el.innerHTML = '\n    <div class="__consult_modal">\n      <div class="__consult_modal_header">\n        <div class="__consult_modal_header_title">\n          ' + title + '\n        </div>\n        <div class="__consult_modal_header_ops">\n          ' + (closeBtn ? '<img class="__consult_modal_header_ops_close" src="//static.clewm.net/cli/images/consult/close.png">' : '') + '\n        </div>\n      </div>\n      <div class="__consult_modal_body">\n        <ul>\n        </ul>\n\n        <span class="__consult_modal_body_work_time">' + bottomText + '</span>\n      </div>\n      <div class="__consult_modal_footer"></div>\n    </div>\n  ';

    $('.__consult_modal_body', el).setAttribute('style', obj2style(bodyStyle));

    // 拿到列表ul
    var listContainer = $('ul', el);

    // 根据个数计算宽度 最大一行三个
    var width = 100 / column + '%';

    items.forEach(function (item) {
      // 默认的类名
      var className = ['__consult_modal_body_way_item'];

      // 如果配置项里给了别的类名 坐合并
      if (item.className) {
        if (typeof item.className === 'string') item.className = item.className.split(' ');

        className = [].concat(toConsumableArray(className), toConsumableArray(item.className));
      }

      // 创建li
      var li = $create('li', {
        class: className.join(' '),
        id: item.id ? item.id : ''
      });

      // 设置宽度
      li.style.width = width;

      // 单独处理图标样式【提供微调图标的能力】
      var iconStyle = '';
      if (item.iconStyle) {
        if (typeof item.iconStyle === 'string') {
          // 如果是字符串 则直接赋值
          iconStyle = item.iconStyle;
        } else {
          var arr = [];
          for (var i in item.iconStyle) {
            if (item.iconStyle.hasOwnProperty(i)) {
              arr.push(i + ': ' + item.iconStyle[i]);
            }
          }

          iconStyle = arr.join(';');
        }
      }

      if (typeof item.icon === 'string') {
        item.icon = {
          default: item.icon,
          highlight: item.icon
        };
      }

      li.innerHTML = '\n      <span class="__consult_modal_body_way_item_icon">\n        <img style="' + iconStyle + '" src="' + item.icon.default + '" class="__consult_modal_body_way_item_icon_def">\n        <img style="' + iconStyle + '" src="' + (!!item.icon.highlight ? item.icon.highlight : item.icon.default) + '" class="__consult_modal_body_way_item_icon_hl">\n      </span>\n      <span class="__consult_modal_body_way_item_title">\n        ' + item.title + '\n      </span>\n      ' + function () {
        if (item.hoverContent) {
          var _item$hoverContent = item.hoverContent,
              img = _item$hoverContent.img,
              txt = _item$hoverContent.txt,
              _item$hoverContent$im = _item$hoverContent.imgStyle,
              imgStyle = _item$hoverContent$im === undefined ? {} : _item$hoverContent$im,
              _item$hoverContent$tx = _item$hoverContent.txtStyle,
              txtStyle = _item$hoverContent$tx === undefined ? {} : _item$hoverContent$tx;


          return '\n              <div class="__consult_modal_body_way_item_down">\n                ' + (img ? '\n                        <span class="__consult_modal_body_way_item_down_img" style="' + obj2style(imgStyle) + '"><img src="' + img + '"></span>\n                      ' : '') + '\n                ' + (txt ? '<p style="' + obj2style(txtStyle) + '">' + txt + '</p>' : '') + '\n              </div>\n            ';
        }

        return '';
      }() + '\n    ';

      // 绑事件
      li.addEventListener('click', function (e) {
        /**
         * 根据clickLog项做埋点
         */
        if (item.clickLog) {
          if (Array.isArray(item.clickLog)) {
            item.clickLog = {
              open: true,
              data: item.clickLog
            };
          }


          if (item.clickLog.open) {
            var _data = item.clickLog.data;
            clickLog(item.clickLog.clickDomain || clickDomain, _data);
          }
        }

        /**
         * 根据clickFlag做统计
         */
        if (item.clickFlag || typeof item.clickFlag === 'undefined') {
          if (!instance.clickCount[item.title]) {
            instance.clickCount[item.title] = 0;
          }

          instance.clickCount[item.title] += 1;
        }

        item.cb && item.cb.call(instance, {
          event: e,
          instance: instance
        });
      });

      li.addEventListener('mouseover', function (_ref) {
        var currentTarget = _ref.currentTarget;

        var el = $('.__consult_modal_body_way_item_down', currentTarget);

        if (!el) return;
        $show(el);
      });

      li.addEventListener('mouseleave', function (_ref2) {
        var currentTarget = _ref2.currentTarget;

        var el = $('.__consult_modal_body_way_item_down', currentTarget);

        if (!el) return;
        $hide(el);
      });

      $append(listContainer, li);
    });

    return el;
  });

  var Overlay = (function (maskStyle) {
    var overlay = $create('div', { class: '__consult_overlay' });

    overlay.setAttribute('style', obj2style(maskStyle));

    return overlay;
  });

  var Consult = function () {
    function Consult() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, Consult);

      var defaultOpts = {};
      if (opts.useLocalDefaultConfig) {
        // 如果使用本地的默认配置
        defaultOpts = this.getLocalConfig();
      } else if (opts.onlineConfig) {
        // 如果有线上默认配置
        defaultOpts = this.getOnlineConfig(opts.onlineConfig);
      }
      opts = deepMerge(defaultOpts, opts);

      var _opts = opts,
          _opts$maskClosable = _opts.maskClosable,
          maskClosable = _opts$maskClosable === undefined ? true : _opts$maskClosable,
          _opts$showMask = _opts.showMask,
          showMask = _opts$showMask === undefined ? true : _opts$showMask,
          _opts$clickDomain = _opts.clickDomain,
          clickDomain = _opts$clickDomain === undefined ? '//cli.im' : _opts$clickDomain,
          _opts$title = _opts.title,
          title = _opts$title === undefined ? '选择咨询方式' : _opts$title,
          _opts$bottomText = _opts.bottomText,
          bottomText = _opts$bottomText === undefined ? '工作日：09:00-20:00&emsp;双休节假日：09:00-17:30' : _opts$bottomText,
          _opts$items = _opts.items,
          items = _opts$items === undefined ? [] : _opts$items,
          _opts$created = _opts.created,
          created = _opts$created === undefined ? function () {} : _opts$created,
          _opts$mounted = _opts.mounted,
          mounted = _opts$mounted === undefined ? function () {} : _opts$mounted,
          _opts$closed = _opts.closed,
          closed = _opts$closed === undefined ? function () {} : _opts$closed,
          _opts$beforeClose = _opts.beforeClose,
          beforeClose = _opts$beforeClose === undefined ? function () {} : _opts$beforeClose,
          _opts$closeBtn = _opts.closeBtn,
          closeBtn = _opts$closeBtn === undefined ? true : _opts$closeBtn,
          _opts$column = _opts.column,
          column = _opts$column === undefined ? 3 : _opts$column,
          _opts$bodyStyle = _opts.bodyStyle,
          bodyStyle = _opts$bodyStyle === undefined ? { padding: '0 20px' } : _opts$bodyStyle,
          _opts$style = _opts.style,
          style = _opts$style === undefined ? {} : _opts$style,
          _opts$maskStyle = _opts.maskStyle,
          maskStyle = _opts$maskStyle === undefined ? {} : _opts$maskStyle;


      this.visible = false; // 标记隐藏状态
      this.maskClosable = maskClosable; // 标记是否点击遮罩层隐藏
      this.closeBtn = closeBtn; // 是否显示关闭按钮
      this.showMask = showMask; // 是否显示遮罩层
      this.createdFn = created; // dom生成后触发的回调
      this.mountedFn = mounted; // dom挂载后触发的回调
      this.beforeClose = beforeClose; // 框子关闭前的钩子
      this.closed = closed; // 框子关闭后的钩子
      this.clickDomain = clickDomain; // 默认的clickLog域名
      this.column = column; // 一行显示几个 默认为3
      this.clickCount = {}; // 点击统计
      this.hiding = false; // 标记是否正在隐藏

      // 设定属性描述符
      this.setAttrDesc();

      this.dom = Tpl(items, title, closeBtn, bottomText, clickDomain, bodyStyle, column, style, this); // dom
      this.overlay = Overlay(maskStyle); // 遮罩层dom

      // 绑定事件
      this.binds();

      // dom生成和事件绑定完毕后调用的生命周期
      this.created();

      // 渲染到页面
      this.render();

      // dom挂载后的生命周期调用
      this.mounted();
    }

    /**
     * 设定属性描述符
     * 规定枚举性
     */


    createClass(Consult, [{
      key: 'setAttrDesc',
      value: function setAttrDesc() {
        // 在这个数组里的属性都会被枚举
        var attrMap = ['clickCount', 'visible', 'show', 'hide', 'toggle', 'clickLog'];

        for (var i in this) {
          if (~attrMap.indexOf(i)) continue;

          Object.defineProperty(this, i, {
            enumerable: false
          });
        }
      }

      /**
       * 从localStorage中拿config
       */

    }, {
      key: 'getLocalConfig',
      value: function getLocalConfig() {
        var data = localStorage.getItem('__CONSULT_DEFAULT_CONFIG__');
        return typeof data === 'string' && data !== '' ? eval(data) : {};
      }

      /**
       * 绑定事件入口
       */

    }, {
      key: 'binds',
      value: function binds() {
        this.toggleIconEvent();
        this.closeEvent();
      }

      /**
       * 悬停按钮切换图标事件
       */

    }, {
      key: 'toggleIconEvent',
      value: function toggleIconEvent() {
        $$('li', this.dom).forEach(function (li) {
          li.addEventListener('mouseover', function () {
            $('.__consult_modal_body_way_item_icon_def', li).style.display = 'none';
            $('.__consult_modal_body_way_item_icon_hl', li).style.display = 'block';
          });

          li.addEventListener('mouseleave', function () {
            $('.__consult_modal_body_way_item_icon_def', li).style.display = 'block';
            $('.__consult_modal_body_way_item_icon_hl', li).style.display = 'none';
          });
        });
      }

      /**
       * 关闭事件
       */

    }, {
      key: 'closeEvent',
      value: function closeEvent() {
        var _this = this;

        var fn = function fn(type) {
          return function (e) {
            if (_this.hiding) return;
            _this.dispatch(_this.beforeClose, { event: e, instance: _this, type: type });
            _this.hide(function () {
              _this.dispatch(_this.closed, { event: e, instance: _this, type: type });
            });
          };
        };

        if (this.maskClosable) {
          this.overlay.addEventListener('click', fn('mask'));
        }

        if (this.closeBtn) {
          $('.__consult_modal_header_ops_close', this.dom).addEventListener('click', fn('closeBtn'));
        }
      }

      /**
       * 派发回调 修改回调的this
       * @param {*} fn 
       * @param  {...any} args 
       */

    }, {
      key: 'dispatch',
      value: function dispatch(fn) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        fn.apply(this, args);
      }

      /**
       * 切换显示隐藏状态
       */

    }, {
      key: 'toggle',
      value: function toggle() {
        this.visible ? this.hide() : this.show();

        this.visible = !this.visible;

        return this.visible;
      }

      /**
       * 显示
       */

    }, {
      key: 'show',
      value: function show() {
        $fadeIn(this.dom);
        $fadeIn(this.overlay);
        this.visible = true;
      }

      /**
       * 隐藏
       * @param {*} cb 
       */

    }, {
      key: 'hide',
      value: function hide(cb) {
        var _this2 = this;

        this.hiding = true;
        $fadeOut(this.dom, function () {
          cb && cb();
          _this2.hiding = false;
        });
        $fadeOut(this.overlay, function () {
          _this2.hiding = false;
        });
        this.visible = false;
      }

      /**
       * 渲染
       * 其实就是挂载dom到body上
       */

    }, {
      key: 'render',
      value: function render() {
        $append($('body'), this.dom);
        if (this.showMask) {
          $append($('body'), this.overlay);
        }
      }
    }, {
      key: 'created',
      value: function created() {
        this.createdFn && this.createdFn.call(this, this.dom);
      }
    }, {
      key: 'mounted',
      value: function mounted() {
        this.mountedFn && this.mountedFn.call(this, this.dom);
      }

      /**
       * 辅助的click方法
       * @param {*} data 
       * @param {*} domain 
       * @param {*} cb 
       */

    }, {
      key: 'clickLog',
      value: function clickLog$$1(data, domain) {
        var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

        if (typeof domain === 'function') {
          cb = domain;
          domain = undefined;
        }

        clickLog(domain || this.clickDomain, data, cb);
      }

      /**
       * 获取线上的配置文件
       * @param {*} name 
       */

    }, {
      key: 'getOnlineConfig',
      value: function getOnlineConfig(name) {
        // ..TODO:
        //  ajax请求

        return {};
      }
    }]);
    return Consult;
  }();

  /**
   * 加载script
   * @param {*} src 
   * @param {*} id 
   * @param {*} cb 
   */


  Consult.loadScript = function (src, id, cb) {
    if (typeof id === 'function') {
      cb = id;
      id = '';
    }

    var script = $create('script');

    script.type = 'text/javascript';
    script.id = id;
    script.src = src;
    script.onload = cb;

    $append($('body'), script);
  };

  /**
   * 设定本地的默认配置
   * @param {*} config 
   */
  Consult.setLocalDefaultConfig = function (config) {
    if (typeof window.localStorage === 'undefined') {
      return false;
    }

    if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
      config = JSON.stringify(config);
    }

    window.localStorage.setItem('__CONSULT_DEFAULT_CONFIG__', '(' + config + ')');
  };

  /**
   * 清空本地的默认配置
   */
  Consult.clearLocalDefaultConfig = function () {
    window.localStorage.setItem('__CONSULT_DEFAULT_CONFIG__', '');
  };

  /**
   * 合并两个config 其实就是一个对象的深合并
   * @param {*} conf1 
   * @param {*} conf2 
   */
  Consult.merge = function (conf1, conf2) {
    return deepMerge(conf1, conf2);
  };

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = "@charset \"UTF-8\";\n.__consult_wrapper {\n  position: fixed;\n  left: 50%;\n  top: 30%;\n  z-index: 1050;\n  width: 494px;\n  transform: translate(-50%);\n  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);\n  border-radius: 4px;\n  background: white;\n  transition: all .3s;\n  display: none;\n  opacity: 0; }\n  .__consult_wrapper .__consult_modal .__consult_modal_header {\n    padding: 17px 20px;\n    padding-bottom: 15px;\n    border-bottom: 1px solid #f1f2f3; }\n    .__consult_wrapper .__consult_modal .__consult_modal_header .__consult_modal_header_title {\n      float: left;\n      font-size: 18px;\n      color: rgba(0, 0, 0, 0.87); }\n    .__consult_wrapper .__consult_modal .__consult_modal_header .__consult_modal_header_ops {\n      float: right;\n      position: relative;\n      top: 2px; }\n      .__consult_wrapper .__consult_modal .__consult_modal_header .__consult_modal_header_ops img {\n        width: 12px;\n        height: 12px;\n        display: inline-block;\n        cursor: pointer; }\n    .__consult_wrapper .__consult_modal .__consult_modal_header::after {\n      content: ' ';\n      clear: both;\n      height: 0;\n      overflow: hidden;\n      display: block; }\n  .__consult_wrapper .__consult_modal .__consult_modal_body ul {\n    list-style-type: none;\n    margin: 0;\n    padding: 50px 0; }\n    .__consult_wrapper .__consult_modal .__consult_modal_body ul .__consult_modal_body_way_item {\n      color: #666;\n      float: left;\n      width: 33.333%;\n      cursor: pointer;\n      position: relative;\n      text-align: center; }\n      .__consult_wrapper .__consult_modal .__consult_modal_body ul .__consult_modal_body_way_item .__consult_modal_body_way_item_icon {\n        display: block;\n        width: 100%;\n        height: 40px; }\n        .__consult_wrapper .__consult_modal .__consult_modal_body ul .__consult_modal_body_way_item .__consult_modal_body_way_item_icon img {\n          display: block;\n          width: 44px;\n          margin: 0 auto;\n          position: relative; }\n        .__consult_wrapper .__consult_modal .__consult_modal_body ul .__consult_modal_body_way_item .__consult_modal_body_way_item_icon .__consult_modal_body_way_item_icon_hl {\n          display: none; }\n      .__consult_wrapper .__consult_modal .__consult_modal_body ul .__consult_modal_body_way_item .__consult_modal_body_way_item_title {\n        font-size: 14px;\n        padding-top: 10px;\n        display: block; }\n      .__consult_wrapper .__consult_modal .__consult_modal_body ul .__consult_modal_body_way_item .__consult_modal_body_way_item_down {\n        position: absolute;\n        left: 50%;\n        transform: translate(-50%);\n        top: -120%;\n        width: 100%;\n        opacity: 0;\n        transition: all .3s;\n        margin-top: 10px;\n        display: none; }\n        .__consult_wrapper .__consult_modal .__consult_modal_body ul .__consult_modal_body_way_item .__consult_modal_body_way_item_down .__consult_modal_body_way_item_down_img {\n          position: relative;\n          width: 70%;\n          margin: 0 auto;\n          border: 4px solid #f9f9f9;\n          display: inline-block;\n          border-radius: 4px;\n          background: #f9f9f9; }\n          .__consult_wrapper .__consult_modal .__consult_modal_body ul .__consult_modal_body_way_item .__consult_modal_body_way_item_down .__consult_modal_body_way_item_down_img img {\n            width: 100%;\n            display: block; }\n          .__consult_wrapper .__consult_modal .__consult_modal_body ul .__consult_modal_body_way_item .__consult_modal_body_way_item_down .__consult_modal_body_way_item_down_img::after {\n            position: absolute;\n            content: ' ';\n            display: block;\n            margin-top: 4px;\n            border-width: 8px 8px 0;\n            border-style: solid;\n            left: 50%;\n            transform: translateX(-50%);\n            border-color: #f9f9f9 transparent transparent; }\n        .__consult_wrapper .__consult_modal .__consult_modal_body ul .__consult_modal_body_way_item .__consult_modal_body_way_item_down p {\n          position: relative;\n          margin: 0;\n          color: rgba(33, 33, 33, 0.87);\n          font-size: 14px;\n          margin: 0 auto;\n          min-width: 118px;\n          line-height: 30px;\n          background: #f9f9f9;\n          border-radius: 4px; }\n          .__consult_wrapper .__consult_modal .__consult_modal_body ul .__consult_modal_body_way_item .__consult_modal_body_way_item_down p::after {\n            position: absolute;\n            content: ' ';\n            display: block;\n            border-width: 8px 8px 0;\n            border-style: solid;\n            left: 50%;\n            transform: translateX(-50%);\n            border-color: #f9f9f9 transparent transparent;\n            /*灰 透明 透明 */ }\n      .__consult_wrapper .__consult_modal .__consult_modal_body ul .__consult_modal_body_way_item:hover {\n        color: rgba(76, 175, 80, 0.87); }\n    .__consult_wrapper .__consult_modal .__consult_modal_body ul::after {\n      content: ' ';\n      clear: both;\n      height: 0;\n      overflow: hidden;\n      display: block; }\n  .__consult_wrapper .__consult_modal .__consult_modal_body .__consult_modal_body_work_time {\n    color: rgba(153, 153, 153, 0.87);\n    display: block;\n    text-align: center;\n    font-size: 12px;\n    margin-top: 16px;\n    margin-bottom: 20px; }\n\n.__consult_overlay {\n  position: fixed;\n  z-index: 1049;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.3);\n  transition: all .3s;\n  display: none;\n  opacity: 0; }\n";
  styleInject(css);

  return Consult;

})));
