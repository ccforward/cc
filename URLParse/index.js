var parser = function(url) {
    var a = document.createElement('a');
    a.href = url;

    var search = function(search) {
        if (!search) return {};

        var ret = {};
        search = search.slice(1).split('&');
        for (var i = 0, arr; i < search.length; i++) {
            arr = search[i].split('=');
            ret[arr[0]] = arr[1];
        }
        return ret;
    };

    return {
        protocol: a.protocol,
        host: a.host,
        hostname: a.hostname,
        pathname: a.pathname,
        search: search(a.search),
        hash: a.hash
    }
};

var url = 'http://sub.example.com:8088/index/?data=run&person=cc#hash';
parser(url);