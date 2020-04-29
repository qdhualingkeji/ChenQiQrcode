/** 一些字段的意思：
 *  edition_id : 1，免费；2，基础；3，高级；4，解决方案；15，旗舰
 *	file_status av_status : 1，正常；2，即将到期；3，已经到期
 *	is_test : 1，正在试用中；2，试用结束
 *  isCenter : 0，正常头部；1，概况页面
 *  time_status : 1，正常；2，即将到期；3，已经到期
 *  remain_day : 剩余天数
 *  from_edition_id: 真实的版本id
 **/

;
(function (global, $) {
  var CLI_DOMAIN = null;
  var USER_DOMAIN = null;
  var STATIC_SERVICE = null;
  var CONSOLE_DOAMIN = null;
  var hostname = location.hostname;
  var domain = hostname.split('.').slice(-2).join('.');
  var envMap = {
    'cli.me': 'dev',
    'cliim.net': 'net',
    'cliim.com': 'com',
    'cli.im': 'online'
  };
  var env = envMap[domain] || 'online';
  var documentElement = document.documentElement;
  var isDev = false;
  if (env === 'dev') {
    if (hostname === 'console.cli.me') {
      isDev = documentElement.getAttribute('is_dev') === 'true';
    } else {
      isDev = true;
    }
  }
  if (env === 'dev') {
    USER_DOMAIN = '//user.cli.me';
    CLI_DOMAIN = '//cli.me';
    STATIC_SERVICE = isDev ? '//static.cli.me/cli' : '//static-develop.clewm.net/cli';
    CONSOLE_DOAMIN = '//console.cli.me:8000';
  } else if (env === 'net') {
    USER_DOMAIN = '//user.cliim.net';
    CLI_DOMAIN = '//cliim.net';
    STATIC_SERVICE = '//static-develop.clewm.net/cli';
    CONSOLE_DOAMIN = '//console.cliim.net';
  } else if (env === 'com') {
    USER_DOMAIN = '//user.cliim.com';
    CLI_DOMAIN = '//cliim.com';
    STATIC_SERVICE = '//static-test.clewm.net/cli';
    CONSOLE_DOAMIN = '//console.cliim.com';
  } else if (env === 'online') {
    USER_DOMAIN = '//user.cli.im';
    CLI_DOMAIN = '//cli.im';
    STATIC_SERVICE = '//static.clewm.net/cli';
    CONSOLE_DOAMIN = '//console.cli.im';
  }
	// 不重复加载
	if ($('[user_plugins_arrow_box_common]').length == 0) {
		if (!$('#has_capacity_nav_info_common_css').length) {
			var autoVersion = document.documentElement.getAttribute('auto_version') || '';
			$([
				'<link rel="stylesheet" href="', STATIC_SERVICE, '/css/capacity-nav-info-common', isDev ? '' : '.min', '.css?v=', autoVersion, '">'
			].join('')).appendTo('head');
		}
	}

	var _user_id = '';

	var _quesiton_icon = '<i class="anticon anticon-question-circle _question_icon"><svg xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 1024 1024" data-icon="question-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 708c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm62.9-219.5c-18.5 7.1-30.9 25.1-30.9 44.8V620c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-21.5c0-23.1 6.7-45.9 19.9-64.9 12.9-18.6 30.9-32.8 52.1-40.9 34-13.1 56-41.6 56-72.7 0-44.1-43.1-80-96-80s-96 35.9-96 80v7.6c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V420c0-39.3 17.2-76 48.4-103.3C430.4 290.4 470 276 512 276s81.6 14.5 111.6 40.7C654.8 344 672 380.7 672 420c0 57.8-38.1 109.8-97.1 132.5z"></path></svg></i>';
	var _capacity_question_link = '<a class="_question_link" href="//cli.im/help/48183" title="所有二维码中上传的图片文件的总容量" target="_blank">' + _quesiton_icon + '</a>';
	var _avflow_quesiton_link = '';

	var capactiy_info = function (options) {
		var capacityInfo = options.capacityInfo,
			isCenter = options.isCenter || 0,
			user_id = options.user_id || '',
			needEditionType = options.need_edition_type || false;

		_user_id = user_id;


		// console.log('===capacityInfo===', capacityInfo);
		// console.log('===isCenter===', isCenter);
		// console.log('===user_id===', user_id);


		var edition_id = capacityInfo.from_edition_id,

			version_title = capacityInfo.title,
			version_name = capacityInfo.title,
			version_time = capacityInfo.end_time,
			capacity_packet = capacityInfo.capacity_packet || {
				idcode: 0
			},
			idcode = capacityInfo.idcode || 0,

			file_status = capacityInfo.file_capacity.state,
			file_used = capacityInfo.file_capacity.used,
			file_maxsize = capacityInfo.file_capacity.maxsize,
			file_bar_percent = capacityInfo.file_capacity.bar_percent,


			av_status = capacityInfo.av_flow.state,
			av_used = capacityInfo.av_flow.used,
			av_maxsize = capacityInfo.av_flow.maxsize,
			av_maxsize_byte = capacityInfo.av_flow.maxsize_byte || 0,
			av_bar_percent = capacityInfo.av_flow.bar_percent,


			time_status = capacityInfo.time_status,
			end_time = capacityInfo.end_time,

			edition_new = capacityInfo.edition_new,
			edition_old = capacityInfo.edition_old,

			codesCount = capacityInfo.codes_count || 0,
			lastWeekScanCount = capacityInfo.last_7day_scan_count || 0,

			remain_day = parseInt(capacityInfo.remain_day, 10) + 1,

			is_test = capacityInfo.is_test;
			_avflow_quesiton_link = edition_id > 1
				? '<a class="_question_link" href="//cli.im/help/48183" title="音视频播放需要消耗的流量" target="_blank">' + _quesiton_icon + '</a>'
				: '<a class="_question_link" href="//cli.im/help/48183" title="付费可不限音视频播放人数" target="_blank">' + _quesiton_icon + '</a>';

		var headtpl = _render.renderHeadTpl(version_name, edition_id, file_status, av_status, time_status, is_test, isCenter, remain_day, capacity_packet, idcode, edition_old);
		var timetpl = _render.renderTimeTpl(version_name, edition_id, file_status, av_status, time_status, end_time, edition_new, edition_old, is_test);
		var progresstpl = _render.renderProgressTpl(edition_id, file_status, av_status, time_status, file_used, file_maxsize, file_bar_percent, av_used, av_maxsize, av_bar_percent, is_test, isCenter, av_maxsize_byte);
		var footertpl = _render.renderFooterTpl(isCenter);
		var UpVersiontpl = _render.renderUpVersion(isCenter);
		var EditionModaltpl = _render.renderEditionModal(isCenter, edition_id, remain_day, end_time, time_status, version_name, edition_old, codesCount, lastWeekScanCount, capacity_packet, idcode);

		if (!needEditionType) {
			_render.render(headtpl, timetpl, progresstpl, footertpl, isCenter, UpVersiontpl, EditionModaltpl); // 渲染模版
		} else {
			global.__capacity_edition_type = getEditionType(edition_id, file_status, av_status, time_status);
		}
	}

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

	var _render = {
		WrapBox: function () { // 外部的wrapper
			var info_tpl = '<div><div class="user_plugins_arrow_box" id="user_plugins_arrow_box" user_plugins_arrow_box_common></div></div>';
			return info_tpl;
		},
		renderHeadTpl: function (version_name, edition_id, file_status, av_status, time_status, is_test, isCenter, remain_day, capacity_packet, idcode, edition_old) { // 渲染头部
			var headertpl = _render.HandleHeaderTpl(version_name, edition_id, file_status, av_status, time_status, is_test, isCenter, remain_day, capacity_packet, idcode, edition_old);
			return headertpl;
		},
		HandleHeaderTpl: function (version_name, edition_id, file_status, av_status, time_status, is_test, isCenter, remain_day, capacity_packet, idcode, edition_old) { // 头部条渲染模版
			if (edition_id === '4' && is_test && is_test === '1') {
				var _version_name = version_name + '(试用)'
			} else {
				if (capacity_packet && edition_id === '15' && capacity_packet.idcode != 0) {
					var _version_name = version_name + '-' + idcode + '名成员';
				} else {
					var _version_name = version_name;
				}
			}

			var is_solution_user = (is_test && is_test === '1') ? 1 : 0; // 判断是否是解决方案 正在试用中

			var headertpl = '<div><div id="arrow_box_edition_box" class="arrow_box_edition_box line18 clearfix ' + (is_solution_user == 1 ? 'wrapper_solution_user' : '') + '"></div></div>';

			var _headerTpl = $(headertpl);

			var tpl = '<span class="title fl">' + _version_name + '</span>';

			// 剩余几天
			if (time_status == 2 && file_status == 1 && av_status == 1) {
				tpl += '<span class="version-remain-days" howManyDaysHave>剩余' + remain_day + '天</span>';
			}

			tpl += '<div class="fr" style="margin-top: 4px;">';


			if (isCenter) {
				// 容量不够用的样式
				if (edition_id !== '1') {
					((edition_id === '3' || edition_id === '2') && (file_status >= 2 && av_status >= 2)) ? (tpl += '<a class="not-enough text-blue ' + (is_solution_user == 1 ? 'is_solution_user' : '') + '" href="' + CLI_DOMAIN + '/price?create_from=18" target="_blank" onclick="_StatisticsData(83,24)">获取更多容量</a>') : '';
					((edition_id === '3' || edition_id === '2') && (file_status >= 2 && av_status < 2)) ? (tpl += '<a class="not-enough text-blue ' + (is_solution_user == 1 ? 'is_solution_user' : '') + '" href="' + CLI_DOMAIN + '/price?create_from=18" target="_blank" onclick="_StatisticsData(83,24)">获取更多容量</a>') : '';
					((edition_id === '3' || edition_id === '2') && (file_status < 2 && av_status >= 2)) ? (tpl += '<a class="not-enough text-blue ' + (is_solution_user == 1 ? 'is_solution_user' : '') + '" href="' + CLI_DOMAIN + '/price?create_from=18" target="_blank" onclick="_StatisticsData(83,24)">获取更多流量</a>') : '';
				} else {
					(file_status >= 2 && av_status >= 2) ? (tpl += '<a class="not-enough text-blue ' + (is_solution_user == 1 ? 'is_solution_user' : '') + '" href="' + CLI_DOMAIN + '/price?create_from=18" target="_blank" onclick="_StatisticsData(83,24)">获取更多容量</a>') : '';
					(file_status >= 2 && av_status < 2) ? (tpl += '<a class="not-enough text-blue ' + (is_solution_user == 1 ? 'is_solution_user' : '') + '" href="' + CLI_DOMAIN + '/price?create_from=18" target="_blank" onclick="_StatisticsData(83,24)">获取更多容量</a>') : '';
					(file_status < 2 && av_status >= 2) ? (tpl += '<a class="not-enough text-blue ' + (is_solution_user == 1 ? 'is_solution_user' : '') + '" href="' + CLI_DOMAIN + '/price?create_from=18" target="_blank" onclick="_StatisticsData(83,24)">获取更多流量</a>') : '';
				}
			} else {
				// 容量不够用的样式
				if (edition_id !== '1') {
					((edition_id === '3' || edition_id === '2') && (file_status >= 2 && av_status >= 2)) ? (tpl += '<span class="not-enough ' + (is_solution_user == 1 ? 'is_solution_user' : '') + '">获取更多容量</span>') : '';
					((edition_id === '3' || edition_id === '2') && (file_status >= 2 && av_status < 2)) ? (tpl += '<span class="not-enough ' + (is_solution_user == 1 ? 'is_solution_user' : '') + '">获取更多容量</span>') : '';
					((edition_id === '3' || edition_id === '2') && (file_status < 2 && av_status >= 2)) ? (tpl += '<span class="not-enough ' + (is_solution_user == 1 ? 'is_solution_user' : '') + '">获取更多流量</span>') : '';
				} else {
					(file_status >= 2 && av_status >= 2) ? (tpl += '<span class="not-enough ' + (is_solution_user == 1 ? 'is_solution_user' : '') + '">获取更多容量</span>') : '';
					(file_status >= 2 && av_status < 2) ? (tpl += '<span class="not-enough ' + (is_solution_user == 1 ? 'is_solution_user' : '') + '">获取更多容量</span>') : '';
					(file_status < 2 && av_status >= 2) ? (tpl += '<span class="not-enough ' + (is_solution_user == 1 ? 'is_solution_user' : '') + '">获取更多流量</span>') : '';
				}
			}

			var edition_id_num = parseInt(edition_id, 10);
			if (!isCenter) {
				// 免费版 按钮显示
				if (edition_id === '1' || edition_id === '25') {
					if (edition_old && edition_old.edition_id) {
						tpl += '<a buy_click_record iscenter=' + isCenter + ' target="_blank" href="' + USER_DOMAIN + '/buy?create_from=18&version=' + edition_old.edition_id + '" class="text-blue upgrade-edititon" onclick="_StatisticsData(127, '+ edition_id +')">续费</a>';
					} else {
						tpl += '<a buy_click_record iscenter=' + isCenter + ' target="_blank" href="' + CLI_DOMAIN + '/price?create_from=18" class="text-blue upgrade-edititon" onclick="_StatisticsData(127, '+ edition_id +')">升级</a>';
					}
				}

				// 基础版/高级版 按钮显示
				if (edition_id === '2' || edition_id === '3' || edition_id === '9' || (edition_id_num >= 5 && edition_id_num <= 8)
				|| (edition_id_num >= 11 && edition_id_num <= 14) || (edition_id_num >= 19 && edition_id_num <= 24)) {
					tpl += '<a buy_click_record iscenter=' + isCenter + ' target="_blank" href="' + USER_DOMAIN + '/buy?create_from=21&version=' + edition_id + '" class="text-blue upgrade-edititon" onclick="_StatisticsData(128, '+ edition_id +')">续费</a>';
					tpl += '<span class="xufeibefore"></span>'
					tpl += '<a href="' + USER_DOMAIN + '/buy?create_from=19&version=' + (edition_id == '2' ? '3' : '15') + '" target="_blank" class="text-blue upgrade-edititon" onclick="_StatisticsData(127, '+ edition_id +')">升级</a>';
				}

				// 旗舰版 按钮显示
				if (edition_id === '15' || (edition_id_num >= 16 && edition_id_num <= 18) || (edition_id >= 26 && edition_id <= 40)) {
					var auth_members_str = '';
					if (capacity_packet.idcode > 0) {
						auth_members_str = '&auth_members=' + (Number(idcode) / 5);
					}
					tpl += '<a buy_click_record iscenter=' + isCenter + ' target="_blank" href="' + USER_DOMAIN + '/buy?create_from=21&version=' + edition_id + auth_members_str + '" class="text-blue upgrade-edititon" onclick="_StatisticsData(128, '+ edition_id +')">续费</a>';
					tpl += '<span class="xufeibefore"></span>'
					tpl += '<a href="' + USER_DOMAIN + '/buy/packet?create_from=20&version=' + (file_status > 1 ? 'file_capacity' : 'av_flow') +'" target="_blank" class="text-blue upgrade-edititon" onclick="_StatisticsData(127, '+ edition_id +')">扩容</a>';
				}

				// 行业专属版 按钮显示
				if (edition_id === '4' || edition_id === '44') {
					tpl += '<a buy_click_record iscenter=' + isCenter + ' target="_blank" href="' + USER_DOMAIN + '/buy?create_from=21&version=' + edition_id + '" class="text-blue upgrade-edititon" onclick="_StatisticsData(128, '+ edition_id +')">续费</a>';
				}
			}



			tpl += '</div></div></div>';

			_headerTpl.find("#arrow_box_edition_box").append(tpl);

			return _headerTpl[0].innerHTML;

		},
		renderTimeTpl: function (version_name, edition_id, file_status, av_status, time_status, end_time, edition_new, edition_old, is_test) { // 渲染时间
			/* edition_old = {
				edition_id: 2,
			}; */
		var is_solution_user = (is_test && is_test === '1' && (file_status > 1 || av_status > 1)) ? 1 : 0; // 判断是否是解决方案 正在试用中

			var timetpl = '<div><div id="end-time" class="end-time ' + ((edition_id === '1' && edition_old && edition_old.edition_id && time_status === 3) ? 'text-blue' : '') + '"><span howManyDaysHave id="end-time-span" class="end-time-span ' + (is_solution_user == 1 ? 'is_time_solution_user' : '') + '" style="display:inline"></span></div></div>';

			var _timetpl = $(timetpl);

			var tplInfo = '';

			if (edition_id !== '1' || time_status === 3 || is_test == '1') {

				if (edition_old && time_status === 3) {
					var old_version_name = util.getVersionName(edition_old.edition_id);
					tplInfo += old_version_name + '于'
				}

				tplInfo += end_time;
				tplInfo += ' 到期';

				edition_new ? (tplInfo += '<span style="display: inline">，到期后新版本生效</span>') : ''

			}

			_timetpl.find('#end-time-span').append(tplInfo);

			return _timetpl[0].innerHTML;
		},
		renderProgressTpl: function (edition_id, file_status, av_status, time_status, file_used, file_maxsize, file_bar_percent, av_used, av_maxsize, av_bar_percent, is_test, isCenter, av_maxsize_byte) { // 渲染进度条
			var progressTpl = _render.HandleProgressTpl(edition_id, file_status, av_status, time_status, file_used, file_maxsize, file_bar_percent, av_used, av_maxsize, av_bar_percent, is_test, isCenter, av_maxsize_byte);

			return progressTpl;
		},
		HandleProgressTpl: function (edition_id, file_status, av_status, time_status, file_used, file_maxsize, file_bar_percent, av_used, av_maxsize, av_bar_percent, is_test, isCenter, av_maxsize_byte) { // 进度条模版
			var progressTpl = '<div><div id="progress-box" class="progress-box ' + (isCenter === 1 ? 'progress-box-center' : '') + '"></div></div>';

			var _progressTpl = $(progressTpl);

			var progressInfo = '';

			var file_progress_tpl_info = _render.file_avProgressTpl(1, file_status, time_status, file_used, file_maxsize, file_bar_percent, edition_id, is_test, av_maxsize_byte);

			progressInfo += file_progress_tpl_info;

			var av_progress_tpl_info = _render.file_avProgressTpl(0, av_status, time_status, av_used, av_maxsize, av_bar_percent, edition_id, is_test, av_maxsize_byte);

			progressInfo += av_progress_tpl_info;

			_progressTpl.find('#progress-box').append(progressInfo);

			return _progressTpl[0].innerHTML;
		},
		file_avProgressTpl: function (is_File, status, time_status, _used, _maxsize, _bar_percent, edition_id, is_test, av_maxsize_byte) { // 每一个容量的渲染模版
			var wrap_id = is_File === 1 ? 'user-capacity-box' : 'user-stream-box';

			var file_progeressTpl = '<div><div id=' + wrap_id + ' class=' + wrap_id + '></div></div>';

			var file_tpl = '';

			if (is_File === 1) {
				file_tpl += '<div class="progress user-capacity-progress"><div class="progress-bar green ' + (status === 1 ? '' : 'progress-red') + '" style="width: ' + (_bar_percent < 5 ? '1' : _bar_percent) + '%"></div></div>';
				file_tpl += '<div class="textLeft progress-info"><div class="user-capacity-info ' + (status === 1 ? '' : 'color-red') + '">容量 ' + _capacity_question_link + ' <span id="capacity-info-text">' + _used + ' / ' + _maxsize + '</span></div>';
				file_tpl += '<div class="inline" id="refresh-capaicity"><img id="refresh" class="m-x-sm" src="' + STATIC_SERVICE + '/images/refresh-icon@2x.png"></div>'; // refresh
				if (status > 1 && edition_id > 3 && (is_test && is_test !== '1')) {
					file_tpl += '<a href="' + USER_DOMAIN + '/buy/packet?version=file_capacity" target="_blank" class="text-blue text-xs buy-capacity">购买扩容包</a></div></div>'
				}
			} else {
				file_tpl += '<div class="progress user-capacity-progress"><div class="progress-bar green ' + (status === 1 ? '' : 'progress-red') + '" style="width: ' + (_bar_percent < 5 ? '1' : _bar_percent) + '%"></div></div>';
				file_tpl += '<div class="textLeft progress-info"><div class="user-stream-info ' + (status === 1 ? '' : 'color-red') + '">' + (edition_id !== '1' || av_maxsize_byte != 12884901888 ? '音视频流量' : '音视频限5人播放') + ' ' + _avflow_quesiton_link + ' ' + _used + ' / ' + _maxsize + '</div>';
				if (status > 1 && edition_id > 3 && (is_test && is_test !== '1')) {
					file_tpl += '<a href="' + USER_DOMAIN + '/buy/packet?version=av_flow" target="_blank" class="text-blue text-xs buy-stream" style="">购买流量包</a></div></div>';
				}
			}

			var _file_progeressTpl = $(file_progeressTpl);

			_file_progeressTpl.find('#' + wrap_id).append(file_tpl);

			return _file_progeressTpl[0].innerHTML;
		},
		renderFooterTpl: function (isCenter) { // 渲染底部
			var footerTpl = _render.HandleFooterTpl(isCenter);

			return footerTpl;
		},
		HandleFooterTpl: function (isCenter) { // 底部渲染模版
			if (isCenter == 0) { // 头部导航
				var footerInfoTpl = '<div><div class="divider-nav"></div>' +
					'<div class="user_nav_link_new">' +
					'<a statisticAnalyze sec-data="2" href="' + USER_DOMAIN + '/center/userinfo" class="user_plugins_arrow_link">账户详情</a>' +
					'<a href="' + CONSOLE_DOAMIN + '/company/business" class="user_plugins_arrow_link">企业信息</a>' +
					'</div>' +
					'<div class="divider-nav"></div>' +
					'<div class="user_nav_link_new_out">' +
					'<a href="' + util.LoginOutLink() + '" class="user_plugins_arrow_link">安全退出</a>' +
					'</div></div>';
			} else if (isCenter == 1) { // 概况页面
				var footerInfoTpl = '<div class="user_nav_link_new marginBottom10">' +
					'<a statisticAnalyze sec-data="2" href="' + USER_DOMAIN + '/center/userinfo" class="user_plugins_arrow_link_new">账户详情</a>' +
					'<a href="' + CONSOLE_DOAMIN + '/company/business" class="user_plugins_arrow_link_new" style="margin-left: 13px;">企业信息</a>' +
					'</div>';
			}

			return footerInfoTpl;
		},
		renderUpVersion: function (isCenter) {
			var tpl = '<div id="modal-up-version" class="modal fade modal-up-version capacity-nav-info-modal" data-backdrop="true">' +
				'<div class="modal-dialog">' +
				'<div class="modal-body white">' +
				'<button class="close modal-up-version-close" type="button" data-dismiss="modal">' +
				'<span aria-hidden="true">×</span>' +
				'<span class="sr-only">关闭</span>' +
				'</button>' +
				'<div class="modal-up-version-title">补差价升级</span></div>' +
				'<div class="modal-up-version-text">支付版本差额即可进行升级！联系客服为你计算所需金额，并生成升级订单，支付完成后即可生效。</div>' +
				'<div class="modal-explain">注：补差价升级后的版本到期时间不变，如需延长当前版本的到期时间，可点击<a buy_click_record iscenter=' + isCenter + ' href="' + USER_DOMAIN + '/buy?create_from=2" class="text-blue" target="_blank"> 续费</a></div>' +
				'<div class="modal-up-version-buttons">' +
				'<a class="modal-up-version-qq btn orange" href="//q.url.cn/cdqssU" target="_blank">立即升级</a>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>';
			return tpl;
		},
		renderEditionModal: function (isCenter, edition_id, remain_day, end_time, time_status, version_name, edition_old, codesCount, lastWeekScanCount, capacity_packet, idcode) {
			var EditionModaltpl = '<div id="modal-expired-new" class="modal fade modal-expired-new capacity-nav-info-modal" data-backdrop="true">' +
				'<div class="modal-dialog">' +
				'<div class="modal-body white">' +
				'<button class="close modal-expired-new-close" type="button" data-dismiss="modal" style="background-color: #fff!important;">' +
				'<span aria-hidden="true">×</span>' +
				'<span class="sr-only">关闭</span>' +
				'</button>';
			// 到期时间头部
			if (time_status == 3) {
				if (edition_old && edition_old.edition_id) {
					var old_version_name = util.getVersionName(edition_old.edition_id);
				} else {
					var old_version_name = '版本';
				}
				EditionModaltpl += '<div class="modal-expired_title text-center h4">' +
					'你的' + old_version_name + '<span class="text-danger" style="margin-left: 6px">已到期</span>' +
					'</div>' +
					'<p class="modal-expired_at text-darkgrey text-center">到期时间：' + end_time + '</p>';
			} else if (time_status == 2 || time_status == 1) {
				EditionModaltpl += '<div class="modal-expired_title text-center h4">' +
					'你的' + version_name + '<span class="text-danger" style="margin-left: 6px">剩余' + remain_day + '天</span>' +
					'</div>' +
					'<p class="modal-expired_at text-darkgrey text-center">到期时间：' + end_time + '</p>';
			}
			EditionModaltpl += time_status != 1 ? '<p class="modal_data_count">账号下二维码个数：'+codesCount+' 个，近七天总扫描量：'+lastWeekScanCount+' 次</p>' : '';
			// 到期与非到期文案修改
			EditionModaltpl += '<div class="modal-expired_text">' +
				'<div class="modal-expired_title">' + (time_status == 3 ? '现已' : '到期后将') + '恢复为免费版，账号下所有已生成的二维码依旧能正常扫描，但不再享受付费版高级功能：</div>';

			if (time_status == 3) {
				EditionModaltpl += '<ul class="modal-expired_advantage">' +
					'<li>二维码底部，将出现 草料底部标识；</li>' +
					'<li>网址活码，将出现 跳转中间页；</li>' +
					'<li>图片/文件容量，恢复为 50M，无法编辑更新二维码；</li>' +
					'<li>不再享受 删码找回、提前审核、1对1专属顾问等付费服务。</li>' +
					'</ul>';
			} else if (time_status == 2 || time_status == 1) {
				EditionModaltpl += '<ul class="modal-expired_advantage">' +
					'<li>二维码底部，将出现 草料底部标识；</li>' +
					'<li>网址活码，将出现 跳转中间页；</li>' +
					'<li>图片/文件容量，恢复为 50M，无法编辑更新二维码；</li>' +
					'<li>不再享受 删码找回、提前审核、1对1专属顾问等付费服务。</li>' +
					'</ul>';
			}

			EditionModaltpl += '</div>';
			var goVersion = time_status === 3 ? (edition_old ? (edition_old.edition_id > 1 ? edition_old.edition_id : '2') : edition_id) : edition_id;
			var auth_members_str = '';
			if (capacity_packet.idcode > 0) {
				auth_members_str = '&auth_members=' + (Number(idcode) / 5);
			}

			EditionModaltpl += '<div class="modal-expired_buttons">' +
				'<a statisticAnalyze sec-data="20" target="_blank" class="modal-expired_qq btn btn-outline b-green text-green btn-sm" href="//q.url.cn/s/wGb3v6m">在线咨询</a>' +
				'<a statisticAnalyze sec-data="21" href="' + USER_DOMAIN + '/buy?create_from=2&version=' + goVersion + auth_members_str +'" iscenter=' + isCenter + ' target="_blank" class="btn green b-green btn-sm">立即续费</a>' +
				'</div>' +
				'<p class="modal-expired_phone text-darkgrey text-center">专属电话：13454761701</p>' +
				'</div>' +
				'</div>' +
				'</div>';
			return EditionModaltpl;
		},
		render: function (headtpl, timetpl, progresstpl, footertpl, isCenter, UpVersiontpl, EditionModaltpl) { // 渲染模版到页面
			var wrapper = _render.WrapBox();
			var _wrapper = $(wrapper);

			_wrapper.find('#user_plugins_arrow_box').append(headtpl).append(timetpl).append(progresstpl).append(footertpl);

			if (isCenter === 0) {
				if ($('body').find('#header-capacity').length !== 0) {
					$('body').find('#header-capacity').append(_wrapper[0].innerHTML);
				}
			} else if (isCenter === 1) {
				if ($('body').find('#menu-center-nav').length != 0) {
					$('body').find('#menu-center-nav').append(_wrapper[0].innerHTML);
				}
			}
			// 高级版和初级版本 升级弹窗
			if ($('#modal-up-version').length == 0) {
				$('body').append(UpVersiontpl);
			}

			// 剩余时间弹窗
			if ($('#modal-expired-new').length == 0) {
				$('body').append(EditionModaltpl);
			}
		}
	}

	var util = {
		getVersionName: function (id) {
			switch (id) {
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
		},
		StatisticsData: function (fir, sec) {
			$.ajax({
				async: true,
				type: "get",
				url: CLI_DOMAIN + '/Api/ClickLog/click',
				data: {
					'fir': fir,
					'sec': sec
				},
				dataType: 'jsonp',
				jsonp: 'callback',
				success: function (ret) {}
			});
		},
		LoginOutLink: function () { // 退出链接,首页推出，停留在原页面
			var ToIndexPageLink = USER_DOMAIN + '/login/out?direct=index', // 返回到首页
				StaySameLink = USER_DOMAIN + '/login/out'; // 停留在原处

			var _host = window.location.href;

			if (_host.indexOf(CLI_DOMAIN) > -1 && _host.indexOf(CLI_DOMAIN + '/user') > -1) {
				return ToIndexPageLink;
			} else if (_host.indexOf(CLI_DOMAIN) > -1) {
				return StaySameLink;
			} else {
				return ToIndexPageLink;
			}
		},
		messageAlert: function (domId) { // 嫩草和老系统的 alert modal
			var _modal = $('#' + domId + '').modal || null;

			if (_modal && typeof _modal === 'function') {
				$('#' + domId + '').modal('show');
			} else {

				if ($('.modal-backdrop').length === 0) {
					$('body').append('<div class="modal-backdrop fade in"></div>');
				}

				$('#' + domId + '').css('display', 'block');

				setTimeout(function () {
					$('#' + domId + '').addClass('in');
				}, 100);
			}
		}

	}

	$(document).on('click', '.user_plugins_arrow_box [statisticAnalyze], .capacity-nav-info-modal [statisticAnalyze]', function (event) {
		var secData = $(this).attr('sec-data');
		util.StatisticsData(30, secData);
	});

	$(document).on('click', '#user_plugins_arrow_box #refresh', function (e) {
		e.stopPropagation();

		var flag = $(this).hasClass('active');
		var _this = this;

		if (!flag) {
			$(this).addClass('active');
			$.ajax({
				type: "POST",
				url: CLI_DOMAIN + '/Api/User/getCapacity',
				dataType: 'json',
				data: {
					user_id: _user_id,
				},
				success: function (res) {
					setTimeout(function () {
						$(_this).removeClass('active');
					}, 2000)

					if (res.status != -1) {
						var status = res.status;
						var img_file_state = res.data.file_capacity.state;
						var stream_state = res.data.av_flow.state;
						var img_file_used = res.data.file_capacity.used;
						var img_file_sum = res.data.file_capacity.maxsize;
						var stream_used = res.data.av_flow.used;
						var stream_sum = res.data.av_flow.maxsize;
						var time_end_status = res.data.time_status;
						var bar_present = res.data.file_capacity.bar_percent;

						$('.user-capacity-info').find('#capacity-info-text').html('' + img_file_used + ' / ' + img_file_sum + '');
						$('.user-capacity-box').find('.progress-bar').css('width', bar_present + '%');

						if (img_file_state > 1) {
							$('.user-capacity-box').find('.progress-bar').addClass('progress-red');
						}
					}
				}
			});
		}
	})

	// 升级的 modal 提示
	$(document).on('click', '[base-version-update]', function (e) {
		e.preventDefault();

		// var _modal = $('#modal-up-version').modal;

		// if (_modal && typeof _modal === 'function') {
		// 	$('#modal-up-version').modal('show');
		// } else {

		// 	if ($('.modal-backdrop').length === 0) {
		// 		$('body').append('<div class="modal-backdrop fade in"></div>');
		// 	}

		// 	$('#modal-up-version').css('display','block');

		// 	setTimeout(function(){
		// 		$('#modal-up-version').addClass('in');
		// 	}, 100);
		// }
		util.messageAlert('modal-up-version');
	})

	// 剩余多少天提示
	$(document).on('click', '[howManyDaysHave]', function (e) {
		e.preventDefault();

		// var _modal = $('#modal-expired-new').modal;

		// if (_modal && typeof _modal === 'function') {
		// 	$('#modal-expired-new').modal('show');
		// } else {

		// 	if ($('.modal-backdrop').length === 0) {
		// 		$('body').append('<div class="modal-backdrop fade in"></div>');
		// 	}

		// 	$('#modal-expired-new').css('display','block');

		// 	setTimeout(function(){
		// 		$('#modal-expired-new').addClass('in');
		// 	}, 100);
		// }
		util.messageAlert('modal-expired-new');
	})

	$(document).on('click', '.modal-up-version-close', function () {
		var _modal = $('#modal-up-version').modal;

		if (_modal && typeof _modal === 'function') {
			// 老系统
		} else {
			$('#modal-up-version').removeClass('in');
			setTimeout(function () {
				$('#modal-up-version').css('display', 'none');
				$('.modal-backdrop').removeClass('in');
				$('.modal-backdrop').remove();
			}, 300);
		}
	})

	$(document).on('click', '.modal-expired-new-close', function () {
		var _modal = $('#modal-up-version').modal;

		if (_modal && typeof _modal === 'function') {
			// 老系统
		} else {
			$('#modal-expired-new').removeClass('in');
			setTimeout(function () {
				$('#modal-expired-new').css('display', 'none');
				$('.modal-backdrop').removeClass('in');
				$('.modal-backdrop').remove();
			}, 300);
		}
	})

	$(document).on('click', '.modal-up-version, .capacity-nav-info-modal', function () {
		var tap = $(this).attr('data-backdrop');
		var _modal = $('#modal-up-version').modal;
		var _this = this;

		if (_modal && typeof _modal === 'function') {
			// 老系统
		} else {
			$('#modal-up-version').removeClass('in');
			$('#modal-expired-new').removeClass('in');

			setTimeout(function () {
				$('#modal-up-version').css('display', 'none');
				$('#modal-expired-new').css('display', 'none');
				$('.modal-backdrop').removeClass('in');
				$('.modal-backdrop').remove();
			}, 300);
		}
	})

	$(document).on('click', '.modal-up-version .modal-dialog, .capacity-nav-info-modal .modal-dialog', function (e) {
		var _modal = $('#modal-up-version').modal;

		if (_modal && typeof _modal === 'function') {
			// 老系统
		} else {
			e.stopPropagation();
		}
	})

	//这里确定了插件的名称
	global.CapacityNavInfo = capactiy_info;

	global._StatisticsData = util.StatisticsData;

})(this, this.jQuery);


// var tpl = '<div class="user_plugins_arrow_box" id="user_plugins_arrow_box">'+
// 			'<div class="arrow_box_edition_box line18 clearfix">'+
// 				'<span class="title fl">解决方案版</span>'+
// 				'<div class="fr" style="margin-top: 4px;">'+
// 					'<a href="//user.cliim.com/buy" class="text-blue up-edititon none" onclick="StatisticsData(71,2)">续费</a>'+
// 					'<span class="not-enough" style="margin-right: -5px;"><span capacity-name>容量</span>不够用？</span>'+
// 					'<a href="//cli.im/news/40202" target="_blank" class="text-blue upgrade-edititon">升级</a>'+
// 				'</div>'+
// 			'</div>'+
// 			'<div class="end-time">2027/06/20到期<span class="TimeEnd">已到期</span></div>'+
// 			'<div class="progress-box">'+
// 				'<div class="user-capacity-box">'+
// 					'<div class="progress user-capacity-progress">'+
// 						'<div class="progress-bar green progress-red" style="width: 5%"></div>'+
// 					'</div>'+
// 					'<div class="textLeft progress-info">'+
// 						'<div class="user-capacity-info">容量 239.88 M/500 G</div>'+
// 						'<div class="inline" id="refresh-capaicity">'+
// 							'<img id="refresh" class="m-x-sm" src="' + STATIC_SERVICE + '/images/refresh-icon@2x.png">'+
// 						'</div>'+
// 						'<a href="//user.cliim.com/buy/packet?version=file_capacity" target="_blank" class="text-blue text-xs buy-capacity none">购买扩容包</a>'+
// 					'</div>'+
// 				'</div>'+
// 				'<div class="user-stream-box">'+
// 					'<div class="progress user-capacity-progress">'+
// 						'<div class="progress-bar green" style="width: 5%"></div>'+
// 					'</div>'+
// 					'<div class="textLeft progress-info">'+
// 						'<div class="user-stream-info">音视频流量 293.94 M/36000 G</div>'+
// 						'<a href="//user.cliim.com/buy/packet?version=av_flow" onclick="StatisticsData(71,3)" target="_blank" class="text-blue text-xs buy-stream none" style="">购买流量包</a>'+
// 					'</div>'+
// 				'</div>'+
// 			'</div>'+
// 			'<div class="divider-nav"></div>'+
// 			'<div class="user_nav_link_new">'+
// 				'<a onclick="StatisticsData(30,2)" href="//user.cliim.com/center/userinfo" class="user_plugins_arrow_link">账户详情</a>'+
// 				'<a href="//user.cliim.com/password/edit" class="user_plugins_arrow_link">修改密码</a>'+
// 			'</div>'+
// 			'<div class="divider-nav"></div>'+
// 			'<div class="user_nav_link_new_out">'+
// 				'<a href="//user.cliim.com/login/out?direct=index" class="user_plugins_arrow_link">安全退出</a>'+
// 			'</div>'+
// 		'</div>';
