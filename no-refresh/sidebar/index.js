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
        var ajaxObj = {
            requestMyAttention: function(){
                var _self = this;
                S.IO({
                    url: 'http://pinpai.taobao.com/brandservice/brandMyAttention/QueryRecommendBrand?jsonp=jsonp23',
                    dataType: 'jsonp',
                    type: 'get',
                    jsonpCallback: 'jsonp23',
                    cache: false,
                    success: function(data) {
                        if(data.succ){
                            _self._renderMyAttention(data.brands);
                        }else {
                            
                        }
                    },
                    error: function() {
                        
                    }
                });
            },
            _renderMyAttention: function(dataList){
                var domArr = [],
                    i = 0,
                    node = S.one('#J_My_Attention_List');
                for(var i=0; i<dataList.length; i++){
                    domArr[i] = [
                        '<li class="pp-attention-item">',
                            '<a href="' + dataList[i].href + '" class="pp-link" target="_blank">',
                                '<div class="pp-img">',
                                   '<img width="70" height="35" src="' + dataList[i].logo + '">',
                                '</div>',
                                '<div class="pp-desc">' + dataList[i].name + '</div>',
                            '</a>',
                        '</li>'
                    ].join('');
                }
                D.html(node,domArr.join(''));
                D.addClass(node, 'render-over');
            }
        };

        var sideBar =  {
            init: function(){
                this._initData();
                this._bind();
            },
            _initData: function(){
                S.one('#J_side_tabs').height(D.viewportHeight());
                this._changeTop();
                // 判断浏览器高度
            },
            _changeTop: function(){
                if(D.viewportHeight() < 450){
                    S.each(D.children('#J_side_tabs'), function(node){
                        var t = parseInt(D.css(node, 'top'));
                        D.css(node,'top', t - 150 + 'px');
                    })
                }
            },
            _hideSideBar: function(){
                var _self = this;
                new S.Anim('#J_side_contents', {'left':'-235px'}, 0.3, '', function(){
                        D.css($('.side-bar-con'), {'visibility':'visible','top':0});
                        $('.side-bar-tab').removeClass('tab-sel');
                        E.remove(BODY, 'click',  _self._outClick);
                }).run();
            },
            _showSideBar: function(idx){
                var _self = this,
                    contents = $('.side-bar-con');

                D.css(contents, {'z-index':'99997'});
                D.css(contents[idx], {'z-index':'99999'});
                S.one('.J_side_bar_current') && S.one('.J_side_bar_current').addClass('side-bar-con-scaleDown').removeClass('J_side_bar_current');
                D.addClass(contents[idx], 'J_side_bar_current');
                D.removeClass('.J_side_bar_current', 'side-bar-con-scaleDown');

                // 已经显示sidebar
                if(parseInt(D.css('#J_side_contents','left'))>0){
                    D.css(contents[idx], {'top':D.viewportHeight()});
                    new S.Anim(contents[idx], {'top':'0px'}, 0.3, 'swing', false).run();
                }else {
                    new S.Anim('#J_side_contents', {'left':'36px'}, 0.3, 'swing', function(){
                        E.on(BODY, 'click',  _self._outClick);
                    }).run();
                }
                // 异步请求我的关注
                if(idx == 2 && !D.hasClass(S.one('#J_My_Attention_List'), 'render-over')){
                    ajaxObj.requestMyAttention();
                }
                var currentBar = S.one('.J_side_bar_current'),
                    h = currentBar.children('.side-bar-con-hd').outerHeight();
                currentBar.children('.side-bar-con-bd').height(D.viewportHeight() - h);
            },
            _outClick: function(){
                (!isMouseInSideBar) && sideBar._hideSideBar();
            },
            _bind: function(){
                var _self = this;

                // click
                S.each($('.side-bar-tab'),function(node,idx){
                    E.on(node,'click',function(e){
                        if($(node).hasClass('tab-sel')){
                            _self._hideSideBar();
                        }else{
                            if(true){
                            // if(Login.check()){
                                $('.side-bar-tab').removeClass('tab-sel');
                                $(node).addClass('tab-sel');
                                _self._showSideBar(idx);
                            }
                            // else {
                            //     Login.show(function(){
                            //         $(node).fire('click');
                            //     });
                            // }
                        }
                    });
                });

                E.on('.side-bar-con-bd', 'mousewheel', function(e){
                    this.scrollTop +=  (-30 * e.deltaY);
                    D.scrollTop(this, this.scrollTop);
                    e.preventDefault();
                });
                E.on('.side-bar-con-bd', 'scroll', function(){
                    var cover = S.one(this).siblings('.side-bar-con-hd').children('.hd-cover');
                    this.scrollTop > 0 ? cover.css('visibility','visible') : cover.css('visibility','hidden');
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
                });
                E.on(window, 'resize', function(){
                    S.one('#J_side_tabs').height(D.viewportHeight());
                });
            }
        };
        sideBar.init();
    });
});

