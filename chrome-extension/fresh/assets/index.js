(function($){
    // 判断开关
    var switchNode = $('#J_swicth_btn');
    // TODO 还要判断页面的值
    (localStorage["send_head_request"]>0) && switchNode.addClass('on');

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
            var script = 'document.getElementsByTagName("head")[0].removeChild(document.getElementById("J_Fresh_not_F5"))';
            chrome.tabs.executeScript(null, {code: script});


            localStorage["send_head_request"] = -1;
            chrome.tabs.executeScript(null, {code: 'localStorage["send_head_request"] = -1'});
        }
    })
})(jQuery)