var pageLinks = document.getElementsByTagName('link'),
    pageScripts = document.getElementsByTagName('script'),
	links = [],
	scripts = [];
	
for(var i=0;i<pageLinks.length;i++){
	var css = pageLinks[i].getAttribute('href'),
        sht = pageLinks[i].getAttribute('rel');
    if(css && sht && sht == 'stylesheet'){
		links.push(pageLinks[i].href);
    }
}
for(var i=0;i<pageScripts.length;i++){
	var js  = pageScripts[i].getAttribute('src'),
        type = pageScripts[i].getAttribute('type') || 'text/javascript';
	if(js && type == 'text/javascript'){
		scripts.push(pageScripts[i].src);
	}
}


chrome.extension.sendMessage({ 
	links: links, 
	scripts: scripts, 
	location: document.location, 
	localStg: {
		'request':localStorage["send_head_request"],
		'files':localStorage["monitor_files"]
	}
});
