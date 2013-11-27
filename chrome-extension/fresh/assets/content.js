// 发送信息到popup
var pageLinks = document.getElementsByTagName('link'),
    pageScripts = document.getElementsByTagName('script');

var links = [],
	scripts = [];
	
for(var i=0;i<pageLinks.length;i++){
	// 判断为css link标签
	var css = pageLinks[i].getAttribute('href'),
        sht = pageLinks[i].getAttribute('rel');
    if(css && sht && sht == 'stylesheet'){
		links.push(pageLinks[i].href);
    }
}
for(var i=0;i<pageScripts.length;i++){
	// 判断为script引用
	var js  = pageScripts[i].getAttribute('src'),
        type = pageScripts[i].getAttribute('type') || 'text/javascript';
	if(js && type == 'text/javascript'){
		scripts.push(pageScripts[i].src);
	}
}

chrome.extension.sendMessage({ links: links, scripts: scripts, localStg: localStorage["send_head_request"] });
