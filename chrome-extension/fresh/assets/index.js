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
            var status = 'localStorage["load_over_refresh"] = 1;' +
                         'localStorage["btn_status"]=-1'; //监控按钮
            chrome.windows.getCurrent(function (currentWindow) {
                chrome.tabs.query({ active: true, windowId: currentWindow.id }, function (activeTabs) {
                    chrome.tabs.executeScript(activeTabs[0].id, { file: 'assets/content.js', allFrames: true });
                    // chrome.tabs.executeScript(activeTabs[0].id, { code: status});
                });
            });

            // 监听接收的信息
            chrome.extension.onMessage.addListener(function (message) {
                // 判断页面的localStorage 和 link script 标签
                if(message.localStg > 0){
                    switchNode.addClass('on');
                    // chrome.tabs.executeScript(null, {file: 'assets/refresh.js'});
                } 
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
                    localStorage["send_head_request"] = 1;
                    chrome.tabs.executeScript(null, {code: 'localStorage["send_head_request"] = 1'});
                }else {
                    localStorage["send_head_request"] = -1;
                    chrome.tabs.executeScript(null, {code: 'localStorage["send_head_request"] = -1'});
                }
            })
        }
    }

    chromeObj.init();

})(jQuery);

