KISSY.ready(function(S){
   	S.config({
       	packages: [
           	{
               	name: 'tbc',
               	path: 'http://g.tbcdn.cn/',
               	ignorePackageNameInUri: true
           	}
       	]
   	});
	var E = S.Event, D = S.DOM, $ = S.all, BODY = S.one("body");

	S.use('tbc/mini-login/1.4.0/',function(S, Login){
		var isMouseInSideBar = false;

		var sideBar =  {
			init: function(){
				this._bind();
			},

			_hideSideBar: function(){
				var _self = this;
				var anim = new S.Anim('#J_side_contents', {'left':'-235px'}, 0.3, '', function(){
					D.css($('.side-bar-con'), {'visibility':'visible','top':0});
					$('.side-bar-tab').removeClass('tab-sel');
					E.remove(BODY, 'click',  sideBar._outClick);
				});
				anim.run();
			},
			_showSideBar: function(idx){
				var _self = this;
				var contents = $('.side-bar-con');
				D.css(contents, {'visibility':'hidden'});
				D.css(contents[idx], {'visibility':'visible'});
				// 已经显示sidebar
				if(parseInt(D.css('#J_side_contents','left'))>0){
					D.css(contents[idx], {'top':D.viewportHeight()});
					var anim = new S.Anim(contents[idx], {'top':'0px'}, 0.3, '', false);
					anim.run();
				}
				var anim = new S.Anim('#J_side_contents', {'left':'40px'}, 0.3, '', function(){
					E.on(BODY, 'click',  _self._outClick);
				});
				anim.run();
			},
			_outClick: function(){
				(!isMouseInSideBar) && sideBar._hideSideBar();
			},
			_bind: function(){
				var _self = this;
				E.on('.side-bar-tab','mouseenter mouseleave',function(){
					D.toggleClass(this,'tab-hover');
				});

				// click
				S.each($('.side-bar-tab'),function(node,idx){
					E.on(node,'click',function(e){
						if($(node).hasClass('tab-sel')){
							// hide
							_self._hideSideBar();
						}else{
							if(Login.check()){
								$('.side-bar-tab').removeClass('tab-sel');
								$(node).addClass('tab-sel');
								_self._showSideBar(idx)
																	
							}else {
								Login.show(function(){
									$(node).fire('click');
								});
							}
						}

					});
				});

				E.on('.side-bar-con', 'mousewheel', function(e){
					this.scrollTop +=  (-50*e.deltaY);
					D.scrollTop(this, this.scrollTop);
					e.preventDefault();
				});

				E.on('#J_side_bar', 'mouseenter', function(){
					isMouseInSideBar = true;
				});
				E.on('#J_side_bar', 'mouseleave', function(){
					isMouseInSideBar = false;
				});
				E.on(window, 'mousewheel', function(e){
					if(isMouseInSideBar){
						e.preventDefault();
					}
				})
			}
		}
		sideBar.init();
	});
});