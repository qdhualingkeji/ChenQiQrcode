var new_first_file_upload = false;
(function(){
	var _upload = {
		_kid : null,
		_index:0,
		_upurl : '//upload.api.cli.im/upload.php',
		_param : {},
		_new : function(obj,params){ //支持HTML5
			var size = this._newfsiize(obj);
			if(size._byte>params.maxsize){
				params.maxsizefun(size.format);
				return false;
			}
			//开始上传
			var $obj = $(obj);
			params.start(function($setAfter){
				$obj._obj = $("<kbd />").append($setAfter);
				$obj.after($obj._obj);
			});
			var fd = new FormData();
			fd.append($obj.attr("name"),obj.files[0]);
			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener("progress", function(evt){ //上传过程
				params.progress((evt.lengthComputable?Math.round(evt.loaded * 100 / evt.total):'unable to compute'),$obj._obj);
			},false);
			xhr.addEventListener("load", function(evt){ //成功
				var data = evt.target.responseText;
				if(data==''){
					alert("上传异常");
					return false;
				}
				try{
					data = eval('('+data+')');
				}catch(e){
					alert("上传异常\n"+data);
					return false;
				}
				var newobj=_upload._newdo($obj).reset();
				if(data.status!='1') params.failed(data.info);
				else params.complete.call(newobj,data.data,_upload._index);
			}, false);
			xhr.addEventListener("error", function(evt){ //失败
				_upload._newdo($obj).reset();
				params.failed('error');
			}, false);
			xhr.addEventListener("abort", function(evt){ //取消
				_upload._newdo($obj).reset();
				params.cancel();
			}, false);
			xhr.open("POST", this._upurl+"?kid="+this._kid);
			xhr.withCredentials = true;
			xhr.send(fd);
		},
		_newdo:function($obj,params){
			var kbd = $("<kbd />"); //占位元
			var $clone = $obj.clone(true);
			$obj.before(kbd);
			$obj._obj&&$obj._obj.remove();
			$obj.remove();
			kbd.reset = function(){ //重置上传控件
				kbd.before($clone);
				kbd.remove();
				return $clone;
			};
			return kbd;
		},
		_old : function(obj,params){ //不支持HTML5
			var $obj = $(obj);
			var kbd = $("<kbd />"); //占位元
			var $clone = $obj.clone(true);
			$obj.before(kbd);
			this._old.reset = function(){ //重置上传控件
				$obj.remove();
				kbd.before($clone);
				kbd.remove();
			};

			$obj.wrap('<form></form>');
			var $form = $obj.parent();
			var _form = $form.get(0);
			$form.append('<input type="hidden" name="_ieReferer" value="'+window.location+'" />');
			_form.action = this._upurl+"?kid="+this._kid+"&iframecallback="+params.iframecallback;
			_form.target = params.iframename;
			_form.method = 'post';
			_form.encoding = 'multipart/form-data';
			$form.submit();
		},
		_ckexts : function(obj,params){ //扩展名检查
			var one = obj.value.replace(/(\\+)/g,"#").split("#");
			var two = one[one.length-1].split(".");
			var exts = two[two.length-1].toLowerCase();
			if(params.exts.toLowerCase().indexOf(exts)==-1){
				params.extsfun(exts);
				return false;
			}else return true;
		},
		_newfsiize : function(obj){ //支持HTML5时获取文件大小
			var file = obj.files[0];
			var fileSize = "0KB";
			if(file.size>1024*1024) fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
			else fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
			return {
				'format' : fileSize,
				'_byte' : file.size
			};
		},
		_filesNum : function(params){ // 文件个数检查

			var file_tags = $("[file-tag]").length;

			if(file_tags > params.maxnum - 1 ) {
				alert('最多只能传三个附件');
				$('#wait').hide();
				$('#uploading').hide();
				return false;
			} else {
				return true;
			}
		},
		_pidSame: function(obj, params) {
			var $obj = $(obj);
			var cur_pid = $obj.attr('data-pid');

			if (cur_pid != params.pid) {
				return false;
			} else {
				return true;
			}
		}
	};
	var defaults={
		'exts' : 'jpg,jpeg,gif,png,bmp,pdf,doc,docx,ppt,pptx,vcf,pot,potx,xls,xlsx,txt,rtf,et,wps,dps,mp3,mp4,wma,mid', //支持的扩展名
		'extsfun' : function(nowexts){ //不支持的扩展名回调
			alert("不支持上传"+nowexts+"扩展名文件");
		},
		'maxsize' : 10485760, //最大10MB
		'maxnum' : 3, //最大个数
		'maxsizefun' : function(nowsize){ //超出大小回调
			alert("最大支持10MB，现在"+nowsize);
		},
		'pid' : 0, // 讨论区的pid
		'start' : function($setAfter){},
		'progress' : function(percentage,$objProgress){},
		'complete' : function(data,index){},
		'failed' : function(msg){},
		'cancel' : function(){}
	};
	var $upload = function(param,kid){
		if(kid) _upload._kid = kid;
		
		var now_url = window.location.host;
		if(now_url.indexOf('cli.im') > 0) {
			_upload._upurl = "//upload.api.cli.im/upload.php"
		}else if(now_url.indexOf('cliim.com') > 0) {
			_upload._upurl = "//upload.api.cliim.com/upload.php"
		}else if(now_url.indexOf('cli.me') > 0 || now_url.indexOf('cliim.net') > 0) {
			_upload._upurl = "//upload.api.cliim.net/upload.php"
		}


		this.each(function(i){

			var params=$.extend({},defaults,param);

			params.obj=this;
			if (typeof Worker==="undefined") {
				params.iframecallback="upload_api_callback"+_upload._index;
				params.iframename="cliuploadapisiframe"+_upload._index;
				setiframe(params);
			}

			if(!new_first_file_upload) {
				
				new_first_file_upload = true;

				if (!_upload._ckexts(this,params) || !_upload._filesNum(params)){
					return false;
				}

				if(!_upload._pidSame(this, params)) {
					return false;
				}
				
				if(typeof Worker!=="undefined") _upload._new(this,params);

				else {
					_upload._old(this,params);
				}
			}
			
			// 解绑上传元素的change事件
			$(this).unbind().change(function(){
				var file = this.files[0];
				if (!_upload._ckexts(this,params) || !_upload._filesNum(params)){
					return false;
				}
				if(!_upload._pidSame(this, params)) {
					return false;
				}
				if(typeof Worker!=="undefined") {
					_upload._new(this,params);
				} else {
					_upload._old(this,params);
				}
			});

			_upload._index++;
		});
	};
	if($.fn.upload){
		$.fn.upload2 = $upload;
	}else{
		$.fn.upload = $upload;
	}
	function setiframe(params){
		if(typeof Worker=="undefined"){
			$(document.body).append('<div style="display:none;"><iframe name="'+params.iframename+'" id="'+params.iframename+'" src="about:blank"></iframe></div>');
			window[params.iframecallback] = function(data){
				try{
					var ret = eval("("+decodeURIComponent(data.substr(1))+")");
					if(ret.status!='1') params.failed(ret.info);
					else params.complete.call(params.obj,ret.data,_upload._index);
				}catch(e){
					alert("与服务器通信发生未知错误！");
				}
			};
		}
	}
	(function(){
		if(typeof window._upload_api_kid=='undefined'){
			var obj = document.currentScript,src;
			if(typeof obj!='object'){ //ie,safari,opera
				var a = {}, stack;
				try{
					a.b();
				}catch(e){
					stack = e.stack || e.sourceURL || e.stacktrace;
				}
				if(typeof stack=='string'){ //ie10+,safari,opera9
					var rExtractUri = /(?:http|https|file):\/\/.*?\/.+?\:/, 
						absPath = rExtractUri.exec(stack);
					if(absPath[0].substr(-1)==':'){
						src = absPath[0].substring(0,absPath[0].length-1);
					}else{
						src = absPath[0];
					}
				}else{ //ie5.5~9
					var scripts = document.scripts;
					var isLt8 = ('' + document.querySelector).indexOf('[native code]') === -1;
					for(var i = scripts.length - 1, script; script = scripts[i--];){
						src = isLt8 ? script.getAttribute('src', 4) : script.src;
						break;
					}
				}
			}else{ //chrome,ff
				src = obj.src;
			}
			window._upload_api_kid = src.split('?kid=')[1];
		}
		_upload._kid = window._upload_api_kid;
	})();
})();