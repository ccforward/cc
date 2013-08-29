(function(){
    var firstRender = true,
        // 可监测文件类型
        file = {'local':1, 'js':1, 'css':1},
        // 要获取的HTTP头信息
        headerRequest = {'Content-Encoding':1, 'Content-Length':1, 'Content-Type':1, 'Etag':1, 'Last-Modified':1, },
        // 存储头信息
        fileHead = {},
        //css3 动画方式
        transition = 'ease-out',
        //存储页面上本地css的路径
        linkElement = {},
        interruptRequest = {};

    var Auto = {
        _init : function(){
            if(document.body){
                //只在第一次渲染页面时 加载所有本地文件
                firstRender && Auto.loadFiles();
                // 实时监测文件
                Auto.monitorFile();
            }
            setTimeout(Auto._init, 1000);
        },
        loadFiles : function(){
            // 判断本地文件 TODO 
            function isLocal(file){
                var local = document.location,
                    reg = new RegExp("^\\.|^\/(?!\/)|^[\\w]((?!://).)*$|" + local.protocol + "//" + local.host);
                return file.match(reg)
            }

            var scripts = document.getElementsByTagName('script'),
                links = document.getElementsByTagName('link'),
                routes = [];

            //监控js
            for(var i=0; i<scripts.length; i++){
                var js  = scripts[i].getAttribute('src');

                //存储本地的js路径
                if(js && isLocal(js)){
                    routes.push(js);
                }
            }
            //不监控js--清空数组
            if(!file.js)
                routes = [];
            //监控本地文件
            file.local && routes.push(document.location.href);

            //监控css
            for(var i=0;i<links.length;i++){
                var css = links[i].getAttribute('href'),
                    sht = links[i].getAttribute('rel');
                if(css && sht && sht == 'stylesheet' && isLocal(css)){
                    routes.push(css);
                    linkElement[css] = links[i];
                }
            }

            //请求本地文件的头信息并保存
            for(var i=0;i<routes.length;i++){
                Auto.requestHead(routes[i], function(route, headInfo){
                    fileHead[route] = headInfo;
                });
                console.log(fileHead[routes[i]]);
            }

            // 添加css文件发生改变时动画效果
            var head = document.getElementsByTagName('head')[0],
                style = document.createElement('style'),
                css = '.kiss-fresh{ transition: all 0.3s '+ transition +';-webkit-transition: all 0.3s '+ transition +';}';
            style.setAttribute('type','text/style');
            head.appendChild(style);
            style.appendChild(document.createTextNode(css));
            
            // 所有文件第一次加载结束
            firstRender = false;
        },

        //匹配头信息 监控文件是否在改变 
        monitorFile : function(){
            for(var route in fileHead){
                if (interruptRequest[route])
                    continue;

                Auto.requestHead(route,function(route, newHead){
                    var oldHead = fileHead[route],
                        isChanged = false;
                    fileHead[route] = newHead;

                    for(var h in oldHead){
                        var oldH = oldHead[h],
                            newH = newHead[h];
                            fileType = newHead['Content-Type'];
                        switch(h.toLowerCase()){
                            case 'etag':
                                if(!newHead) break;
                            default:
                                isChanged = (oldH != newH);
                                break;
                        }
                        if(isChanged){
                            Auto.reloadFile(route, fileType);
                            break;
                        }       
                        
                    }
                });

            }
        },

        // 重新加载文件
        reloadFile : function(route, type){
            switch(type) {
             case 'text/css':
                var link = linkElement[route],
                    html = document.body.parentNode,
                    head = link.parentNode,
                    next = link.nextSibling,
                    newLink = document.createElement('link');
                
                // html.className = html.className.replace(/\*kiss\-fresh/gi, '') + ' kiss-fresh';
                break;

             case 'text/html':
                 if(route!=document.location)
                     return;
             case 'application/javascript':
             case 'text/javascript':
                 document.location.reload();
            }
        },
        replaceLink: function () {

        },

        //请求本地文件的HTTP头信息
        requestHead : function(route,callback){
            interruptRequest[route] = true;
            // var xhr = window.XMLHttpRequest ? new XMLHttpRequest() :  new ActiveXObject("Microsoft.XmlHttp");
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', route, true);
            /**
             *
             * 0: 未初始化 对象已建立尚未初始化,未调用open方法；
             * 1: 初始化，对象已建立，尚未调用send方法
             * 2：发送数据，已经调用send方法但当前状态及HTTP头未知
             * 3：数据传送中，响应和HTTP头信息不全，responseBody和responseText获取部分数据会出现错误
             * 4：数据接收完毕，responseBody和responseText获取完整数据
             *
             *
             * 304：Not Modified
             *
             *
            */
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

            xhr.send();
        }
    }

    if(document.location.protocol != 'file:'){
        if(!window.thisOK){
            Auto._init();
        }
        window.thisOK = true;
    }

})();