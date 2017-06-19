// (function(obj){
//     window.Popup = obj;
// })((function(){
// 	var Popup = {};
// 	Popup.defaultOpt={

// 	}
// 	var _last_win_index = 10000;
// 	var _tmp_variate_ishow = false;
// 	Popup = {
// 		msg:function(){
// 			var message = arguments && arguments.length ? arguments[0] : '';
// 			opt = {content : message,unique:new Date().getTime()};
// 			this.show(opt);
// 			_tmp_variate_ishow = true;
// 			$(window).resize(function() {
// 	            if (_tmp_variate_ishow) {
// 	                _resize(opt.unique);
// 	            }
// 	        });
// 		},
// 		show:function(opt){
// 			_render(opt);
// 			this.initBtnFun(this,opt);
// 			this.initShadeClick(this,opt);
// 		},
// 		close:function(unique){
// 			var popup_shade = _getUniqueElement('class','popup-win-shade','shade-unique',unique);
// 			var popup_content = _getUniqueElement('class','popup-win','content-unique',unique);
// 			if (popup_shade) {document.body.removeChild(popup_shade);}
// 			if (popup_content) {document.body.removeChild(popup_content);}
// 			_tmp_variate_ishow = false;
// 		},
// 		initBtnFun:function(popupwin,opt){
// 			var popup = document.getElementsByClassName('pup-btn');
// 			for (var i = 0; i < popup.length; i++) {
// 				popup[i].onclick = function(){
// 					popupwin.close(opt.unique);
// 				}
// 			}
// 		},
// 		initShadeClick:function(popupwin,opt){
// 			var popup = document.getElementsByClassName('popup-win-shade');
// 			for (var i = 0; i < popup.length; i++) {
// 				popup[i].onclick = function(){
// 					popupwin.close(opt.unique);
// 				}
// 			}
// 		}
// 	}

// 	function _render(opt){
// 		if (opt) {
// 			_bulidShade(opt);
// 			_buildPopup(opt);
// 			_resize(opt.unique||'');
// 		}
// 	}

// 	function _bulidShade(opt){
// 		if (opt) {
// 			var _shade = document.createElement('div') ;
// 			_shade.setAttribute('shade-unique',opt.unique);
// 			_shade.setAttribute('class','popup-win-shade');
// 			_shade.style.zIndex = _last_win_index ++;
// 			document.body.appendChild(_shade);
// 		}
// 	}

// 	function _buildPopup(opt){
// 		if (opt) {
// 			var _popup = document.createElement('div') ;
// 			_popup.setAttribute('content-unique',opt.unique);
// 			_popup.setAttribute('class','popup-win');
// 			_popup.style.zIndex = _last_win_index ++;
// 			document.body.appendChild(_popup);
// 			_popup.innerHTML = '<div class="win-title"></div><div class="win-content">'+opt.content+'</div><div class="win-bottom"><input type="button" class="pup-btn pup-btn-sure" value="确定"><input type="button" class="pup-btn pup-btn-cancel" value="取消"></div>'
// 		}
// 	}

// 	function _reposition(unique){
// 		var popup_win = _getUniqueElement('class','popup-win','content-unique',unique);
// 		var doc_width = window.innerWidth;
// 		var doc_height = window.innerHeight;
// 		if (popup_win) {
// 			doc_width = (doc_width - popup_win.offsetWidth) / 2;
// 			doc_height = (doc_height - popup_win.offsetHeight) / 2;
// 			popup_win.style.left = doc_width +'px';
// 			popup_win.style.top = doc_height +'px';
// 		}
// 	}
// 	function _resize(unique){
// 		var popup_content = _getUniqueElement('class','win-content');
// 		if (popup_content) {
// 			var popup_title = _getUniqueElement('class','win-title');
// 			var popup_bottom = _getUniqueElement('class','win-bottom');
// 			var doc_height = window.innerHeight * 0.8 - popup_title.offsetHeight - popup_bottom.offsetHeight;
// 			var _height = popup_content.offsetHeight > doc_height ? doc_height : popup_content.offsetHeight ;
// 			popup_content.style.height = _height + 'px';
// 		}
// 		_reposition(unique);
// 	}

// 	function _getUniqueElement(type,type_value,attr,attr_value){
// 		var elms = [],
// 			unique = null;
// 		switch(type){
// 			case 'class':elms = document.getElementsByClassName(type_value);break;
// 			case 'id' : elms.push(document.getElementById(type_value));break;
// 		}
// 		unique = elms.length ? elms[0] : null
// 		if (attr) {
// 			unique = null;
// 			for (var i = 0; i < elms.length; i++) {
// 				var attr = elms[i].getAttribute(attr);
// 				if (attr && attr == attr_value) {
// 					unique = elms[i];
// 					break;
// 				}
// 			}
// 		}
// 		return unique;
// 	}

// 	return Popup;
// })())

var Popup = function (){
	var Popup = {},
		defaultOpt={ShadeClose:true}
	var _last_win_index = 10000;
	var _tmp_variate_ishow = false;
	var _popup_unique = [];
	Popup = {
		msg:function(){
			var message = arguments && arguments.length ? arguments[0] : '';
			var user_opt = arguments && arguments.length ? arguments[1] : {};
			opt={ShadeClose: true,content: message,unique: new Date().getTime()}
			for (var o in user_opt) {
				opt[o] = user_opt[o];
			}
			_popup_unique.push(opt.unique);
			this.show(opt);
			_tmp_variate_ishow = true;
			$(window).resize(function() {
	            if (_tmp_variate_ishow) {
	            	for (var i = 0; i < _popup_unique.length; i++) {
	                	_resize(_popup_unique[i]);
	            	}
	            }
	        });
		},
		rewrite:function(){
			var message = arguments && arguments.length ? arguments[0] : '';
			var unique = arguments && arguments.length ? arguments[1] : {};
			var popup_content_con = _getUniqueElement('class','win-content','con-unique',unique);
			if (popup_content_con) {
				popup_content_con.style.height = '';
				popup_content_con.innerHTML = message;
	        	_resize(unique);
			}
		},
		show:function(opt){
			_render(opt);
			this.initBtnFun(this,opt);
			this.initShadeClick(this,opt);
		},
		close:function(unique){
			var popup_shade = _getUniqueElement('class','popup-win-shade','shade-unique',unique);
			var popup_content = _getUniqueElement('class','popup-win','content-unique',unique);
			if (popup_shade) {document.body.removeChild(popup_shade);}
			if (popup_content) {document.body.removeChild(popup_content);}
			if (!_popup_unique.length) {_tmp_variate_ishow = false;}
			_removevalue(_popup_unique,unique);
		},
		shock:function(unique){
			var popup_content = _getUniqueElement('class','popup-win','content-unique',unique);
			if (popup_content) {
				var left = parseInt(popup_content.style.left.replace('px',''));
				for (var i = 0; i < 10; i++) {
					setTimeout(function(pos){
						return function(){
							popup_content.style.left =left + 2*(pos % 2 ? 1 : -1) + 'px';
						}
					}(i),i * 50);
				}
			}
		},
		initBtnFun:function(popupwin,opt){
			var popup_content = _getUniqueElement('class','popup-win','content-unique',opt.unique);
			var popup = popup_content.getElementsByTagName('input');
			for (var i = 0; i < popup.length; i++) {
				popup[i].onclick = function(){
					popupwin.close(opt.unique);
				}
			}
		},
		initShadeClick:function(popupwin,opt){
			var popup_shade = _getUniqueElement('class','popup-win-shade','shade-unique',opt.unique);
			if (popup_shade) {
				if (opt.ShadeClose) {
					popup_shade.onclick = function(){
						popupwin.close(opt.unique);
					}
				} else {
					popup_shade.onclick = function(){
						popupwin.shock(opt.unique);	
					}
				}
			}
		}
	}

	function _removevalue(arr,value){
		if (arr.length) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] == value) {
					arr.splice(i,1);
					break;
				}
			}
		}
	}

	function _getWidth(){  
		return window.innerWidth||(document.documentElement&&document.documentElement.clientWidth)||document.body.clientWidth;
	}  

	function _getHeight(){  
		return window.innerHeight||(document.documentElement&&document.documentElement.clientHeight)||document.body.clientHeight;
	}  

	function _getClassNames(classStr,tagName){ 
		if (document.getElementsByClassName) { 
			return document.getElementsByClassName(classStr) 
		} else { 
			var nodes = document.getElementsByTagName(tagName),ret = []; 
			for(i = 0; i < nodes.length; i++) { 
				if(_hasClass(nodes[i],classStr)){ 
					ret.push(nodes[i]) 
				} 
			} 
			return ret; 
		} 
	}

	function _hasClass(tagStr,classStr){ 
		var arr=tagStr.className.split(/\s+/ ); //这个正则表达式是因为class可以有多个,判断是否包含 
		for (var i=0;i<arr.length;i++){ 
			if (arr[i]==classStr){ 
				return true ; 
			} 
		} 
		return false ; 
	} 

	function _render(opt){
		if (opt) {
			_bulidShade(opt);
			_buildPopup(opt);
			_resize(opt.unique||'');
		}
	}

	function _bulidShade(opt){
		if (opt) {
			var _shade = document.createElement('div') ;
			_shade.setAttribute('shade-unique',opt.unique);
			_shade.setAttribute('class','popup-win-shade');
			_shade.style.zIndex = _last_win_index ++;
			document.body.appendChild(_shade);
		}
	}

	function _buildPopup(opt){
		if (opt) {
			var _popup = document.createElement('div') ;
			_popup.setAttribute('content-unique',opt.unique);
			_popup.setAttribute('class','popup-win');
			_popup.style.zIndex = _last_win_index ++;
			document.body.appendChild(_popup);
			_popup.innerHTML = '<div class="win-title" title-unique="'+opt.unique+'">唯一标识：'+(_last_win_index - 10000) / 2+'</div><div class="win-content" con-unique="'+opt.unique+'">'+opt.content+'</div><div class="win-bottom" bottom-unique="'+opt.unique+'"><input type="button" class="pup-btn pup-btn-sure" value="确定"><input type="button" class="pup-btn pup-btn-cancel" value="取消"></div>'
		}
	}

	function _reposition(unique){
		var popup_win = _getUniqueElement('class','popup-win','content-unique',unique);
		var doc_width = _getWidth();
		var doc_height = _getHeight();
		if (popup_win) {
			doc_width = (doc_width - popup_win.offsetWidth) / 2;
			doc_height = (doc_height - popup_win.offsetHeight) / 2;
			popup_win.style.left = doc_width +'px';
			popup_win.style.top = doc_height +'px';
		}
	}

	function _resize(unique){
		var popup_content = _getUniqueElement('class','win-content','con-unique',unique);
		if (popup_content) {
			var popup_title = _getUniqueElement('class','win-title','title-unique',unique);
			var popup_bottom = _getUniqueElement('class','win-bottom','bottom-unique',unique);
			var doc_height = _getHeight() * 0.8 - popup_title.offsetHeight - popup_bottom.offsetHeight;
			var _height = popup_content.offsetHeight > doc_height ? doc_height : popup_content.offsetHeight ;
			popup_content.style.height = _height + 'px';
		}
		_reposition(unique);
	}

	function _getUniqueElement(type,type_value,attr,attr_value){
		var elms = [],
			unique = null;
		switch(type){
			case 'class':elms =_getClassNames(type_value,'div');break;
			case 'id' : elms.push(document.getElementById(type_value));break;
		}
		unique = elms.length ? elms[0] : null
		if (attr) {
			unique = null;
			for (var i = 0; i < elms.length; i++) {
				var _attrvalue = elms[i].getAttribute(attr);
				if (_attrvalue && _attrvalue == attr_value) {
					unique = elms[i];
					break;
				}
			}
		}
		return unique;
	}
	return Popup;
}
