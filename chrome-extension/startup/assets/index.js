(function($){

    var reload = $('#J_Reload');

    var chromeObj = {
        init: function(){
            this._initData();
            this._reload();
        },
        // 数据初始化
        _initData: function(){

            var _self = this;
            // 注入content
            chrome.windows.getCurrent(function (currentWindow) {
                chrome.tabs.query({ active: true, windowId: currentWindow.id }, function (activeTabs) {
                    chrome.tabs.executeScript(activeTabs[0].id, { file: 'assets/content.js', allFrames: false });
                });
            });

            // 回调函数 -- 监听接收的信息 
            chrome.extension.onMessage.addListener(function (message) {
                console.log(message);
                // 显示link script url
                $('#J_Title').val(message.title);
                $('#J_Url').val(message.url);
                
            });
        },
        // 重新加载
        _reload: function(){
            var _self = this;
            reload.on('click', function(e){
                e.preventDefault();
                // 重置page的sessionStorage
                var code = 'alert("reload")';
                chrome.tabs.executeScript(null, {code: code});
                // 填充新数据
                _self._initData();
            });
        }
    }

    chromeObj.init();

})(jQuery);

