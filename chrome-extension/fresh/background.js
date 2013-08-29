var buttonClicked = function() {
    // var version = localStorage["kissy"] || "1.3.0";
    var script = [];
    var scriptSource = 'http://ccforward.github.io/cc/assets/test.js';

    script.push('var head = document.getElementsByTagName("head")[0];');
    script.push('var script = document.createElement("script");');
    script.push('script.setAttribute("id", "J_Fresh_not_F5");');
    script.push('script.type = "text/javascript";');
    script.push('script.src = "' + scriptSource + '";');
    script.push('if(!document.getElementById("J_Fresh_not_F5")){');
    script.push('head.appendChild(script);}');
    script.push('else{alert("脚本已经注入")};');

    chrome.tabs.executeScript(null, { code: script.join('') });
    chrome.browserAction.setBadgeBackgroundColor({color:[255, 0, 0, 100]});
    chrome.browserAction.setBadgeText({text:'F5'});
    chrome.alarms.create('showBadgeText', {when: Date.now() + 3000});
    chrome.alarms.onAlarm.addListener(function() {
        chrome.browserAction.setBadgeText({text:""});
    });


};

chrome.browserAction.onClicked.addListener(buttonClicked);
