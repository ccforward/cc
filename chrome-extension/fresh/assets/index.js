(function($){

    var switchNode = $('#J_swicth_btn'),
        monitorFiles = [];

    var chromeObj = {
        init: function(){
            this._initData();
            this._switch();
        },
        // 数据初始化
        _initData: function(){
            var _self = this;
            // 注入content_script
            var status = 'localStorage["load_over_refresh"] = 1;' +
                         'localStorage["btn_status"]=-1';
            chrome.windows.getCurrent(function (currentWindow) {
                chrome.tabs.query({ active: true, windowId: currentWindow.id }, function (activeTabs) {
                    // 页面中的iframe不执行
                    chrome.tabs.executeScript(activeTabs[0].id, { file: 'assets/content.js', allFrames: false });
                });
            });

            // 回调函数 -- 监听接收的信息 
            chrome.extension.onMessage.addListener(function (message) {
                // 判断页面的localStorage 和 link script 标签
                if(message.localStg > 0){
                    switchNode.addClass('on');
                } 
                // 显示link script url
                _self._appendResource($('#J_Links'), message, 'links');
                _self._appendResource($('#J_Scripts'), message, 'scripts');
                $('#J_Current_URL').append(message.location.href);
                _self._chkBox();
            });
        },
        _appendResource: function(container, message, id){
            var _self = this;
            $(message[id]).each(function(i, file){

                // 判断本地文件
                var li = '<li><input type="checkbox" id="'+id + '_' + i + '"';
                
                if(_self._isLocal(file, message.location)){
                    li += 'class="chkbox chkbox-current" ><span class="J_Local">' + file;
                    monitorFiles.push(file);
                }else{
                    li += 'class="chkbox" ><span class="J_Remote">' + file;
                }
                li += '</span></li>';
                container.append(li)
                $('.J_Local').siblings('.chkbox').prop('checked',true);
            })
        },
        _isLocal: function(file, location){
            var reg = new RegExp("^\\.|^\/(?!\/)|^[\\w]((?!://).)*$|" + location.protocol + "//" + location.host);
            return file.match(reg);
        },
        _switch: function(){
            switchNode.on('click', function(){
                $(this).toggleClass('on');
                if($(this).hasClass('on')){
                    // 开启捕获
                    $('.chkbox').each(function(i,k){
                        console.log($(k).attr('data-checked'));
                    })
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
            $('.chkbox').on('click', function(){
                if($(this).prop('checked')){
                    // 填充到页面
                    var file = $(this).addClass('chkbox-current').siblings().html();
                    monitorFiles.push(file);
                    var code = 'localStorage["monitor_files"] = ' + '"' + monitorFiles.toString() + '"';
                    chrome.tabs.executeScript(null, {code: code});
                }else {
                    $(this).removeClass('chkbox-current');
                    // 删除文件
                    monitorFiles.splice($.inArray($(this).siblings().html(),monitorFiles),1);

                    var code = 'localStorage["monitor_files"] = ' + '"' + monitorFiles.toString() + '"';
                    chrome.tabs.executeScript(null, {code: code});

                }
            });
        }
    }

    chromeObj.init();

})(jQuery);

