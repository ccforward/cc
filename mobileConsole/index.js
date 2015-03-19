(function($){
    var debugEle, 
        aDebugVars=[]; //存放所有debug的数组

    function MobileConsole(degree, pc) {
        this.init(degree, pc);
    }

    MobileConsole.prototype = {
        init: function(degree, pc){
            var self = this,
                orientation = 0;
            debugEle = $('<div>');
            $(debugEle).addClass('KMC-debug');

            $(debugEle).css({
                position: 'absolute', top:'0px', left:'0px',width: '100%',
                fontSize: '12px', cursor: 'default', backgroundColor: '#fff',
                minHeight: '300%', letterSpacing: '0px', zIndex: '99999'
            });

            var orientEvent = ("onorientationchange" in window) ? "orientationchange" : "resize";
            $(window).on(orientEvent, function() {
                // 移动设备上使用
                if(window.orientation != orientation && window.orientation == degree){
                    window.scrollTo(1,1);   
                    self.showDebugInfo();
                }else{
                    if(window.orientation != degree){
                        if(debugEle.parentNode){
                            document.body.removeChild(debugEle); 
                        }
                    }
                }

                //PC上测试
                if(pc === 'pc'){
                    window.scrollTo(1,1);
                    self.showDebugInfo();
                }

                horientation = window.orientation;
            });

            // window.onerror=function(msg, url, linenumber){
            $(window).on('error', function(error) {
                // error.message 
                // error.filename 
                // error.lineno
                
                aDebugVars.push({type:"error", message: error.originalEvent});
            });
        },
        log: function(name,value){
            debugger;
            this.pushLogs(arguments);
        },
        //直接显示所有log信息 (error不会显示)
        show: function(){
            this.showDebugInfo();
        },
        showDebugInfo: function(){
            var self = this;
            // 先删除所有的内容 重新生成
            while(debugEle.firstChild){
                debugEle.removeChild(debugEle.firstChild)
            }
            $('body').append(debugEle);
            $(debugEle).css('display', 'block');
            //所有的debug信息
            for(var i=0; i<aDebugVars.length; i++){
                var msg = $('<div>');
                switch(aDebugVars[i].type){
                    case "log":
                        //单条详细信息
                        for(var j=0; j<aDebugVars[i].message.length; j++){
                            var item = self.showMsg(aDebugVars[i].message[j]);
                            $(item).css({verticalAlign: 'top', padding: '2px'});
                            $(msg).append(item);
                        }
                        $(debugEle).append(msg);
                        break;
                    case "error":
                        self.insertEle(msg, aDebugVars[i].message.message, '#f00');
                        self.insertEle(msg, '&nbsp;'+aDebugVars[i].message.filename+'  line: '+aDebugVars[i].message.lineno, "#808080");
                        $(debugEle).append(msg);
                        break;
                }
                $(msg).css('border-bottom', '1px solid #eee');
            }

            // 使用eval 模拟console的代码执行  (console.log的信息不会显示 米有返回值)
            var exeEle = $('<div>'),
                exeInput = $('<input>');
            $(exeEle).css('width','100%');
            $(exeInput).css({border: 'none', width:'95%', borderBottom:'1px solid #ccc'});

            $(exeInput).attr({placeholder:'js代码可以在这来一发 alert("fire")',
                            autocorrect:'off', autocapitalize:'none'});

            $(exeInput).on('keyup', function(evt){
                if(evt.keyCode==13){
                    try{
                        var obj = eval(this.value);
                        aDebugVars.push({type:"log",message:[obj]});
                    }catch(e){
                        
                        //存放出错信息
                        aDebugVars.push({type:"error",message:[e]});
                    }
                    self.showDebugInfo();
                }
            });

            //输入框左边箭头
            var arrow = $('<span>');
            $(arrow).append('>');
            $(arrow).css({color:'#239CD5', fontWeight:'bold', fontSize:'16px'});
            $(exeEle).append(arrow);
            $(exeEle).append(exeInput);
            $(debugEle).append(exeEle);
        },

        showMsg: function(val){
            var self = this;
            switch(typeof(val)){
                case 'number': return self.showNum(val);
                    break;
                case 'string': return self.showStr(val);
                    break; 
                case 'object': return self.showObj(val);
                    break;
                default:
                    return $(typeof(val));
            }
        },

        showNum: function(value){
            var node = $('<div>');
            // node.appendChild(document.createTextNode(value));
            // $(数字)  不可用.....  KISSY的bug????
            // D.append($(123), node);
            $(node).append(value.toString());
            $(node).css({color:'#00f', display:'inline', verticalAlign:'top'});

            return node;
        },

        showStr: function (value){
            var node  = $('<div>');
            $(node).append(value);
            $(node).css({color:'#000', display:'inline', verticalAlign:'top'});

            return node;
        },

        showHtm: function (value){
            var self = this;
            // nodeType {元素:1, 属性:2, 文本:3, 注释:8, 文档:9}
            if(value.nodeType == 3){  //textnode
                var nodeSpan = $("<span>");
                self.insertEle(nodeSpan, value.nodeValue);
                return nodeSpan;
            }
            var node = $('<div>');
            if(value.nodeType == 1){  //element
                self.insertEle(node, "<");
                self.insertEle(node, value.tagName.toLowerCase(), '#800080');
                self.insertEle(node, " ");
                for(var i=0;i<value.attributes.length;i++){
                    self.insertEle(node, '&nbsp;');
                    self.insertEle(node, value.attributes[i].nodeName,'#00f');
                    self.insertEle(node, '="');
                    self.insertEle(node, value.attributes[i].nodeValue,'#00f');
                    self.insertEle(node, '"');
                }
                self.insertEle(node,">");
                // for(var i=0; i<value.childNodes.length; i++){
                //     node.appendChild(self.showHtm(value.childNodes[i])); //to be continued
                // }   
                self.insertEle(node, '&nbsp;....&nbsp;');
                self.insertEle(node, '<');
                self.insertEle(node, value.tagName.toLowerCase(), '#800080');
                self.insertEle(node, '/>');
            }
            $(node).css({color:'#000', display:'inline', verticalAlign:'top'});

            return node;
        },

        insertEle: function (node, text, color){
            var span = $("<span>");
            $(span).append(text);
            color && $(span).css('color', color); 
            $(node).append(span);
        },

        showObj: function (value){
            var self = this,
                node = $('<div>');
            if(!value) return node;
            $(node).css('display', 'inline');
            if(value && value.nodeType){
                return self.showHtm(value);
            //  return node;
            }
            if(value.length){

                // 数组
                $(node).append('[');
                for(var i=0;i<value.length;i++){
                    $(node).append(self.showMsg(value[i]));
                    if(i<value.length -1){
                        $(node).append(',');
                    }

                }
                $(node).css('vertical-align', 'top');
                $(node).append(']');
            }else{
                // 对象
                var objNode = $('<div>'),
                    arrow = $('<span>');
                $(arrow).append('>>  Object');
                $(arrow).css({color:'#808080', fontSize:'12px'});
                $(objNode).append(arrow);
                $(objNode).css('display', 'inline');
                objNode.objVal = value;
                objNode.expanded = false;
                // 点击展开
                $(objNode).on('click', function(evt){
                    console.log(objNode);
                    
                    if(objNode.expanded){
                        // TODO
                        this.firstChild.textContent = ">>  Object";
                        while(this.childNodes.length > 1){
                            this.removeChild(this.lastChild);
                        }
                        objNode.expanded = false;
                    }else{
                        $(this).append(self.expandObject(objNode.objVal));
                        this.firstChild.textContent="▼  Object";
                        objNode.expanded = true;
                    }
                    evt.stopPropagation();
                });
                $(node).append(objNode);
                $(node).css('display', 'inline-block');
            }
            return node;
        },

        // 对象展开
        expandObject: function (obj){
            
            var self = this,
                node = $('<div>');
            for(var i in obj){
                var objWrap = $('<div>'),
                    objInstance = $('<span>');
                $(objInstance).append(i+':');
                $(objWrap).append(objInstance);
                $(objWrap).append(self.showMsg(obj[i]));

                $(objWrap).css('vertical-align', 'top');
                $(objInstance).css({color:'#800080', verticalAlign:'top'});
                $(node).append(objWrap);
            }
            $(node).css('margin-left', '14px')
            return node;
        },

        pushLogs: function (obj){
            if(debugEle.parentNode) return; //console open 不在记录信息
            aDebugVars.push({type:"log",message:obj});
        }
    }

    window.MobileConsole = MobileConsole;
})(Zepto || jQuery)