chrome.extension.sendMessage({ 
	links: sessionStorage['init-file-links'].split(','), 
	scripts: sessionStorage['init-file-scripts'].split(','), 
	location: document.location, 
	localStg: {
		'request':localStorage["send_head_request"],
		'files':localStorage["monitor_files"]
	}
});
