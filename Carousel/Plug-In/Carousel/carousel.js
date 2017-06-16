var Carousel = function (elm,imgs){
	this.elm = elm;
	this.imgs = imgs || [];
	this.timmer=null,
	this.if_clock=false,
	this.current_show_index = 0,
	this.img_list_ul = null,
	this.btn_list = null,
	this.img_width = 0;
}

Carousel.prototype = {
	init:function(){
		if (this.elm) {
			this.initCaroluselBox(this.elm,this.imgs);
			this.btn_list = document.getElementById('btn-list').getElementsByTagName('li');
			var box = document.getElementById('item-list').getElementsByTagName('ul');
			this.img_list_ul = !box || box.length <= 0 ?  null : box[0];
			if (this.img_list_ul) {
				var imgs = this.img_list_ul.getElementsByTagName('li');
				this.img_width = imgs && imgs.length > 0 ? imgs[0].offsetWidth : 0;
				this.img_list_ul.style.width = this.img_width * (this.btn_list.length || 0) + 'px'
			}
			this.switchClick(this);
			this.buttonHover(this);
			this.interval = new this.handelInterval(this);
			this.interval.start();
		}

	},
	initCaroluselBox:function(elm,img_url_list){
		var box = '<div class="carousel-box">{Item}{Btn}{Switch}</div>',
			item_template = '<li><img src="{Src}"></li>',
			btn_template = '<li data-index="{Index}" {Class}><div></div></li>';

		var	item_div = '<div id="item-list" class="carousel-item-list"><ul>{Li}</ul></div>',
			btn_div = '<div id="btn-list" class="carousel-btn-list"><ul>{Li}</ul></div>',
			switch_div = '<div id="btn-switch" class="carousel-btn-switch"><div class="carousel-switch switch-prev" data-switch="-1"><div class="switch-icon switch-icon-prev"></div></div><div class="carousel-switch switch-next" data-switch="1"><div class="switch-icon switch-icon-next"></div></div></div>';
		if (elm) {
			var item_li = '',
				btn_li = '';
			for (var i = 0; i < img_url_list.length; i++) {
				item_li += item_template.replace('{Src}',img_url_list[i]);
				btn_li += btn_template.replace('{Index}',i).replace('{Class}', !i ? 'class="carousel-btn-active"' : '');
			}
			item_div = item_div.replace('{Li}',item_li);
			btn_div = btn_div.replace('{Li}',btn_li);
			box = box.replace('{Item}',item_div).replace('{Btn}',btn_div).replace('{Switch}',switch_div);
			elm.innerHTML = box;
		}
	},
	move: function (btn){
		if (this.img_list_ul) {
			this.handelClass.addclass(btn,'carousel-btn-active');
			this.handelClass.siblings(btn);
			this.current_show_index = parseInt(btn.getAttribute('data-index'));
			this.img_list_ul.style.left = (-this.current_show_index * this.img_width) + 'px';
		}
	},
	buttonHover: function(box){
		for (var i = 0 ; i < box.btn_list.length; i++) {
			box.btn_list[i].onmouseover = function(){
				box.interval.stop();
				box.move(this);
			};
			box.btn_list[i].onmouseout = function(){
				box.interval.start();
			};
		}
	},
	switchClick : function(box){
		var switch_list = document.getElementById('btn-switch').getElementsByTagName('div');
		if (switch_list) {
			for (var i = 0; i < switch_list.length; i++) {
				switch_list[i].onclick = function(e){
					if (box.btn_list) {
						box.current_show_index += parseInt(this.getAttribute('data-switch') || 0);
						box.current_show_index = box.current_show_index < 0 ? (box.btn_list.length - 1) : (box.current_show_index %= box.btn_list.length || 1);
						box.move(box.btn_list[box.current_show_index]);
						box.interval.stop();
						box.interval.start();
					}
					
				}
			}
		}
	},
	handelInterval:function(_carousel){
		this.intervalCarousel = function(){
			_carousel.current_show_index ++;
			_carousel.current_show_index %= _carousel.btn_list.length;
			_carousel.move(_carousel.btn_list[_carousel.current_show_index]);
		}
		//停止自动轮播
		this.stop = function(){
			clearInterval(_carousel.timmer);
			_carousel.timmer = null;
		}
		//重启自动轮播
		this.start = function(){
			_carousel.timmer = setInterval(this.intervalCarousel,1200);
		}
		return this;
	},
	handelClass:(function(_carousel){
		this.hasclass = function(obj,cls){
			return new RegExp(cls).test(obj.className);
		};
		this.addclass = function(obj,cls){
			obj.className += this.hasclass(obj,cls) ? '' : cls;
		}

		this.removeclass = function(obj,cls){
			if (this.hasclass(obj,cls)) {  
		        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
		        obj.className = obj.className.replace(reg, ' ');  
		    } 
		}
		this.siblings = function(elm) {        
	        var p = elm.parentNode.children;
	        for(var i =0,pl= p.length;i<pl;i++) {
	            if(p[i] !== elm){   
					this.removeclass(p[i],'carousel-btn-active');
	            }       
	        }
	    }
	    return this;
	})()
}