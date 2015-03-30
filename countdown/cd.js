(function() {

    function timer(delay) {
        var self = this;
        this._queue = [];
        setInterval(function() {
                for (var i = 0; i < self._queue.length; i++) {
                    self._queue[i]();
                }
            },
            delay);
    }

    timer.prototype = {
        constructor: timer,
        add: function(cb) {
            this._queue.push(cb);
            return this._queue.length - 1;
        },
        remove: function(index) {
            this._queue.splice(index, 1);
        }
    };

    var delayTime = 1000;

    var msInterval = new timer(delayTime);

    function countDown(config) {
        var defaultOptions = {
            fixNow: 3 * 1000,
            fixNowDate: false,
            now: new Date().valueOf(),
            template: '{d}:{h}:{m}:{s}',
            render: function(outstring) {
                console.log(outstring);
            },
            end: function() {
                console.log('the end!');
            },
            endTime: new Date().valueOf() + 5 * 1000 * 60
        };
        for (var i in defaultOptions) {
            this[i] = config[i] || defaultOptions[i];
        }
        this.init();
    }

    countDown.prototype = {
        constructor: countDown,
        init: function() {
            var self = this;
            if (this.fixNowDate) {
                var fix = new timer(this.fixNow);
                fix.add(function() {
                    self.getNowTime(function(now) {
                        self.now = now;
                    });
                });
            }
            var index = msInterval.add(function() {
                self.now += delayTime;
                if (self.now >= self.endTime) {
                    msInterval.remove(index);
                    self.end();
                } else {
                    self.render(self.getOutString());
                }
            });
        },
        getBetween: function() {
            return _formatTime(this.endTime - this.now);
        },
        getOutString: function() {
            var between = this.getBetween();
            return this.template.replace(/{(\w*)}/g, function(m, key) {
                return between.hasOwnProperty(key) ? between[key] : "";
            });
        },
        getNowTime: function(cb) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', '/', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 3) {
                    var now = xhr.getResponseHeader('Date');
                    cb(new Date(now).valueOf());
                }
            };
            xhr.send(null);
        }
    };

    function _cover(num) {
        var n = parseInt(num, 10);
        return n < 10 ? '0' + n : n;
    }

    function _formatTime(ms) {
        var s = ms / 1000,
            m = s / 60;
        return {
            d: _cover(m / 60 / 24),
            h: _cover(m / 60 % 24),
            m: _cover(m % 60),
            s: _cover(s % 60)
        };
    }

    var now = Date.now();

    new countDown({});
    new countDown({
        endTime: now + 8 * 1000
    });

})();