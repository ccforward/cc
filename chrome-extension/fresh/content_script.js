// 初始化 localStorage
if(!localStorage["send_head_request"] || localStorage["send_head_request"] < 0){
    localStorage["send_head_request"] = -1;
}

// sessionStorage 第一次加载页面获取资源文件
if(!sessionStorage['init-file-links'] && !sessionStorage['init-file-scripts'] ){
    var pageLinks = document.getElementsByTagName('link'),
        pageScripts = document.getElementsByTagName('script'),
        links = [],
        scripts = [];

    for(var i=0;i<pageLinks.length;i++){
        var css = pageLinks[i].getAttribute('href'),
            sht = pageLinks[i].getAttribute('rel');
        if(css && sht && sht == 'stylesheet'){
            links.push(css);
        }
    }
    for(var i=0;i<pageScripts.length;i++){
        var js  = pageScripts[i].getAttribute('src'),
            type = pageScripts[i].getAttribute('type') || 'text/javascript';
        if(js && type == 'text/javascript'){
            scripts.push(js);
        }
    }
    sessionStorage['init-file-links'] = links;
    sessionStorage['init-file-scripts'] = scripts;
}


var firstRender = true,
    // 要获取的HTTP头信息
    headerRequest = {'Content-Encoding':1, 'Content-Length':1, 'Content-Type':1, 'Etag':1, 'Last-Modified':1, },
    transition = 'ease',
    //存储页面上本地css的路径
    linkElements = {},
    oldLinkElements = {},
    scriptElements = {},
    oldScriptElements = {},
    interruptRequest = {},

    // 存储文件头信息
    fileHead = {};

var Auto = {
    init : function(){
        var _self = this;
        if(document.body){
            // 设置根据开关监控文件
            if(localStorage["send_head_request"] > 0){
                //只在第一次渲染页面时 加载所有本地文件
                firstRender && Auto.loadFiles();
                // 实时监测文件
                Auto.monitorFile();
            }
        }

        setTimeout(Auto.init, 1000);
    },
    // 加载文件
    loadFiles : function(){
        var scripts = document.getElementsByTagName('script'),
            links = document.getElementsByTagName('link'),
            routes = [];

        //监控js
        for(var i=0; i<scripts.length; i++){
            var js  = scripts[i].getAttribute('src'),
                type = scripts[i].getAttribute('type') || 'text/javascript';

            if(js && type == 'text/javascript'){
                routes.push(js);
                //存储js节点
                scriptElements[js] = scripts[i];
            }
        }

        //监控本地文件
        routes.push(document.location.href);

        //监控css
        for(var i=0;i<links.length;i++){
            var css = links[i].getAttribute('href'),
                sht = links[i].getAttribute('rel'),
                href = links[i].href;
            if(css && sht && sht == 'stylesheet'){
                // routes.push(css);
                routes.push(href);
                // 存储link节点
                linkElements[href] = links[i];
            }
        }

        //初始化 请求本地文件的头信息并保存
        for(var i=0;i<routes.length;i++){
            Auto.requestHead(routes[i], function(route, headInfo){
                fileHead[route] = headInfo;
            });
        }

        var head = document.getElementsByTagName('head')[0],
            style = document.createElement('style'),
            css = '.no-fresh * { transition: all 0.3s '+ transition +';-webkit-transition: all 0.3s '+ transition +';}';
        head.appendChild(style);
        style.appendChild(document.createTextNode(css));

        firstRender = false;
    },

    //匹配头信息 监控文件是否在改变
    monitorFile : function(){
        var _self = this;
        function monitor(route, newH, oldH){
            for(var h in oldH){
                var oH = oldH[h],
                    nH = newH[h];
                    fileType = newH['Content-Type'];
                switch(h.toLowerCase()){
                    case 'etag':
                        if(!newH) break;
                    default:
                        isChanged = (oH != nH);
                        break;
                }
                if(isChanged){
                    _self.reloadFile(route, fileType);
                    break;
                }
            }
        }

        var monitorArr = localStorage['monitor_files'] ? localStorage['monitor_files'].split(',') : [];
        for(var i=0; i<monitorArr.length; i++){
            var route = monitorArr[i];
            if (interruptRequest[route])
                continue;

            _self.requestHead(route,function(route, newHead){
                    var oldHead = fileHead[route],
                        isChanged = false;
                    fileHead[route] = newHead;
                    monitor(route, newHead, oldHead);
                });
        }
    },

    // 重新加载文件
    reloadFile : function(route, type){
        switch(type) {
            case 'text/css':
                var link = linkElements[route],
                    html = document.body.parentNode,
                    head = link.parentNode,
                    next = link.nextSibling,
                    newLink = document.createElement('link');

                html.className = html.className.replace(/\*no\-fresh/gi, '') + ' no-fresh';
                newLink.setAttribute('type', 'text/css');
                newLink.setAttribute('rel', 'stylesheet');
                newLink.setAttribute('href', route + '?t=' + new Date()*1);
                next ? head.insertBefore(newLink, next) : head.appendChild(newLink);
                linkElements[route] = newLink;
                oldLinkElements[route] = link;
                Auto.replaceLink();
                break;

            case 'text/html':
                if(route!=document.location)
                    return;
                document.location.reload();
                break;
            case 'application/javascript':
            case 'application/x-javascript':
            case 'text/javascript':
                var script = scriptElements[route],
                    body = document.body,
                    next = script.nextSibling,
                    newScript = document.createElement('script');

                newScript.setAttribute('type', 'text/javascript');
                newScript.setAttribute('src', route + '?t=' + new Date()*1);
                next ? body.insertBefore(newScript, script):body.appendChild(newScript);
                scriptElements[route] = newScript;
                oldScriptElements[route]  = script;
                // TODO 添加配置
                if(false){
                    // Auto.replaceScript();
                }else {
                    document.location.reload();
                }
        }
    },
    replaceLink: function () {
        var pending = 0;
        for (var route in oldLinkElements) {
            try {
                var link = linkElements[route],
                    oldLink = oldLinkElements[route],
                    html = document.body.parentNode;
                var sheet = link.sheet || link.styleSheet,
                    rules = sheet.rules || sheet.cssRules;
                // https://code.google.com/p/chromium/issues/detail?id=224303&q=document.stylesheets&colspec=ID%20Pri%20M%20Iteration%20ReleaseBlock%20Cr%20Status%20Owner%20Summary%20OS%20Modified
                // if (rules.length >= 0) {  //chrome 读取远程link不能获取rules的bug
                if (true) {
                    oldLink.parentNode.removeChild(oldLink);
                    delete oldLinkElements[route];
                    setTimeout(function () {
                        html.className = html.className.replace(/\s*no\-fresh/gi, '');
                    }, 100);
                }
            } catch (e) {
                pending++;
                // console.log(e);
                // throw e;
            }
            if (pending) setTimeout(Auto.replaceLink, 50);
        }
    },
    replaceScript: function(){
        var peding = 0;

        for(var route in oldScriptElements){
            try{
                var script = scriptElements[route],
                    oldScript = oldScriptElements[route];
                oldScript.parentNode.removeChild(oldScript);
                delete oldScriptElements[route];
            }catch(e){
                peding++;
            }
        }
    },

    //请求所有文件的HTTP头信息
    requestHead : function(route,callback){
        interruptRequest[route] = true;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            delete interruptRequest[route];
            if(xhr.readyState == 4 && xhr.status != 304){
                var headInfo = {};
                for(var key in headerRequest){
                    headInfo[key]  = xhr.getResponseHeader(key);
                }
                callback(route,headInfo);
            }
        }
        xhr.open('HEAD', route, true);
        xhr.send();
    },
}

if(document.location.protocol != 'file:'){
    // 设置开关
    if(!window.loadOver){
        Auto.init();
    }
    window.loadOver = true;
}

