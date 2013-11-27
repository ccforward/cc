(function($){

    var switchNode = $('#J_swicth_btn');

    var chromeObj = {
        init: function(){
            this.initData();
            this.bind();

        },
        // 数据初始化
        initData: function(){
            var _self = this;
            // 注入content_script
            chrome.windows.getCurrent(function (currentWindow) {
                chrome.tabs.query({ active: true, windowId: currentWindow.id }, function (activeTabs) {
                    chrome.tabs.executeScript(activeTabs[0].id, { file: 'assets/content.js', allFrames: true });
                });
            });
            // 接收信息
            chrome.extension.onMessage.addListener(function (message) {
                // 判断页面的localStorage 和 link script 标签
                (message.localStg>0) && switchNode.addClass('on');
                // 显示link script
                _self.appendResource($('#J_Links'), message.links, 'link');
                _self.appendResource($('#J_Scripts'), message.scripts, 'script');
                
            });
        },
        appendResource: function(container, resources, id){
            $(resources).each(function(i, k){
                container.append('<li><input class="chkbox" type="checkbox" id='+id + '_' + i +'>'+k+'</li>')
            })
        },
        bind: function(){
            switchNode.on('click', function(){
                $(this).toggleClass('on');

                if($(this).hasClass('on')){
                    var scriptSource = 'http://cc.etao.com/fresh/assets/refresh.js',
                        script = [
                            'var head = document.getElementsByTagName("head")[0];',
                            'var script = document.createElement("script");',
                            'script.setAttribute("id", "J_Fresh_not_F5");',
                            'script.type = "text/javascript";',
                            'script.src = "' + scriptSource + '";',
                            'if(!document.getElementById("J_Fresh_not_F5")){',
                            'head.appendChild(script);}'
                        ].join('');



                    chrome.tabs.executeScript(null, {code: script});



                    localStorage["send_head_request"] = 1;
                    chrome.tabs.executeScript(null, {code: 'localStorage["send_head_request"] = 1'});
                }else {
                    // var script = 'document.getElementsByTagName("head")[0].removeChild(document.getElementById("J_Fresh_not_F5"))';
                    // chrome.tabs.executeScript(null, {code: script});


                    localStorage["send_head_request"] = -1;
                    chrome.tabs.executeScript(null, {code: 'localStorage["send_head_request"] = -1'});
                }
            })
        }
    }

    chromeObj.init();

})(jQuery);

