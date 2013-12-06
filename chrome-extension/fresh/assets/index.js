(function($){

    var switchNode = $('#J_swicth_btn'),
        reload = $('#J_Reload'),
        monitorFiles = [];

    var chromeObj = {
        init: function(){
            this._initData();
            this._switch();
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
                // 判断页面的localStorage 和 link script 标签
                if(message.localStg.request > 0){
                    switchNode.addClass('on');
                }
                // 显示link script url
                _self._appendResource($('#J_Links'), message, 'links');
                _self._appendResource($('#J_Scripts'), message, 'scripts');
                $('#J_Current_URL').html(message.location.href);

                message.localStg.files && $.merge(monitorFiles, message.localStg.files.split(','));
                // 注册点击事件
                _self._chkBox();
            });
        },
        _appendResource: function(container, message, id){
            // 先清空
            container.html('');
            var _self = this,
                monitorArr = [];
                // 正在监控的文件
            if(message.localStg.files)
                monitorArr = message.localStg.files.split(',');
            $(message[id]).each(function(i, file){

                // 判断本地文件
                var li = '<li class="file-item"><input type="checkbox" id="'+id + '_' + i + '" class="chkbox ';
                if($.inArray(file,monitorArr) > -1){
                    li+= 'chkbox-current';
                }
                
                if(_self._isLocal(file, message.location)){
                    li += '"><label for="' + id + '_' + i + '" class="local-file J_Local">' + file;
                }else{
                    li += '"><label for="' + id + '_' + i + '" class="J_Remote">' + file;
                }
                li += '</label></li>';
                container.append(li);
                $('.chkbox-current').prop('checked',true);
            });
        },
        _isLocal: function(file, location){
            var reg = new RegExp("^\\.|^\/(?!\/)|^[\\w]((?!://).)*$|" + location.protocol + "//" + location.host);
            return file.match(reg);
        },
        _switch: function(){
            var _self = this;
            reload.on('click', function(e){
                // e.preventDefault();
                // 重置page的sessionStorage
                var code = 'sessionStorage["init-file-links"] = "";'+
                           'sessionStorage["init-file-scripts"] = "";'+
                           'document.location.reload();';
                chrome.tabs.executeScript(null, {code: code});
                // 填充新数据
                _self._initData();
            });
            

            // switch
            switchNode.on('click', function(){
                $(this).toggleClass('on');
                if($(this).hasClass('on')){
                    // 开启捕获
                    var code = 'localStorage["send_head_request"] = 1'
                    chrome.tabs.executeScript(null, {code: code});
                }else {
                    // 关闭捕获
                    var code = 'localStorage["send_head_request"] = -1'
                    chrome.tabs.executeScript(null, {code: code});
                }
            });
        },
        _chkBox: function(){
            $('.chkbox').on('change', function(){
                if($(this).prop('checked')){
                    // 填充到页面
                    var file = $(this).addClass('chkbox-current').siblings().html();
                    monitorFiles.push(file);
                    var code = 'localStorage["monitor_files"] = ' + '"' + monitorFiles + '"';
                    chrome.tabs.executeScript(null, {code: code});
                }else {
                    $(this).removeClass('chkbox-current');
                    // 删除文件
                    monitorFiles.splice($.inArray($(this).siblings().html(),monitorFiles),1);

                    var code = 'localStorage["monitor_files"] = ' + '"' + monitorFiles + '"';
                    chrome.tabs.executeScript(null, {code: code});
                }
            });
        }
    }

    chromeObj.init();

})(jQuery);

