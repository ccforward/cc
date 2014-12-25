var buttonClicked = function() {

    // var scriptSource = 'http://127.0.0.1/fresh/assets/refresh.js',
    //     script = [
    //         'var head = document.getElementsByTagName("head")[0];',
    //         'var script = document.createElement("script");',
    //         'script.setAttribute("id", "J_Fresh_not_F5");',
    //         'script.type = "text/javascript";',
    //         'script.src = "' + scriptSource + '";',
    //         'if(!document.getElementById("J_Fresh_not_F5")){',
    //         'head.appendChild(script);}'
    //     ].join('');

    // chrome.tabs.executeScript(null, { code: script });
   
};
chrome.browserAction.onClicked.addListener(buttonClicked);
