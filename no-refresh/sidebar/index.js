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

    S.use('tbc/mini-login/1.4.0/,sizzle',function(S, Login){
        var isMouseInSideBar = false;

        var sideBar =  {
            init: function(){
                this._bind();
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
                
                S.one('.J_side_bar_current') && S.one('.J_side_bar_current').addClass('side-bar-con-scaleDown').removeClass('J_side_bar_current');
                D.addClass(contents[idx], 'J_side_bar_current');
                D.removeClass('.J_side_bar_current', 'side-bar-con-scaleDown');

                D.css(contents, {'z-index':'99997'});
                D.css(contents[idx], {'z-index':'99999'});
                // 已经显示sidebar
                if(parseInt(D.css('#J_side_contents','left'))>0){
                    D.css(contents[idx], {'top':D.viewportHeight()});
                    new S.Anim(contents[idx], {'top':'0px'}, 0.3, '', false).run();
                }else {
                    new S.Anim('#J_side_contents', {'left':'35px'}, 0.3, '', function(){
                        E.on(BODY, 'click',  _self._outClick);
                    }).run();
                }
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
                            // hide
                            _self._hideSideBar();
                        }else{
                            if(Login.check()){
                                $('.side-bar-tab').removeClass('tab-sel');
                                $(node).addClass('tab-sel');
                                _self._showSideBar(idx);
                            }else {
                                Login.show(function(){
                                    $(node).fire('click');
                                });
                            }
                        }

                    });
                });

                E.on('.side-bar-con', 'mousewheel', function(e){
                    this.scrollTop +=  (-50 * e.deltaY);
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

    // var domArr = [];
    // var dom = $('body').children();

    // // domArr.push['body']
    // function getDomArr(dom){
    //     var i = dom.length-1;
    //     while(i>=0){
    //         // console.log(dom[i]);
    //         var child = [];
    //         child.push(dom[i]);
    //         if($(dom[i]).children()){
    //             getDomArr($(dom[i]).children())
    //         }
    //         delete dom[i];
    //         i--
    //         domArr.push(child)
    //     }
    // }
    // getDomArr($('body').children())
    // console.log(domArr);
});

