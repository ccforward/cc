// Promise规范

(function(global) {

    /*
     *构造函数
     **/
    function Promise() {
        // 成功时，执行的回调函数队列
        this._resolves = [];
        // 失败时，执行的回调函数队列
        this._rejects = [];

        this.status = 'pending';
    }

    /*
     *给一个promise添加成功和失败回调函数
     * @param {Function}
     * @param {Function}
     * @return {Obejct} 返回一个Promise对象
     **/
    // Promise.prototype = {
    //     constructor: Promise,
    //     then: function(resolve, reject){

    //     },
    //     resolve: function(){

    //     },
    //     reject: function(){

    //     }
    // }
    Promise.prototype.then = function(resolve, reject) {

        if (resolve instanceof global.Promise) return resolve;
        if (reject instanceof global.Promise) return reject;

        // 把需要执行的回调函数放入不同的队列中
        if (this.status === 'pending') {
            if (typeof resolve === 'function') {
                this._resolves.push(resolve);
            }

            if (typeof reject === 'function') {
                this._rejects.push(reject);
            }
        }

        if (this.status === 'resolved') {
            if (typeof resolve === 'function') {
                // 同步操作
                resolve.apply(null);
            }
        }

        if (this.status === 'rejected') {
            if (typeof resolve === 'function') {
                // 同步操作
                reject.apply(null);
            }
        }

        return this;
    };


    /*
     *成功时执行的方法
     **/
    Promise.prototype.resolve = function() {
        this.status = 'resolved';

        var i = 0,
            len = this._resolves.length;

        for (; i < len; i++) {
            this._resolves[i].apply(null);
        }

    };

    /*
     *失败时执行的方法
     **/
    Promise.prototype.reject = function() {
        this.status = 'rejected';

        var i = 0,
            len = this._rejects.length;

        for (; i < len; i++) {
            this._rejects[i].apply(null);
        }
    };

    global.Promise = Promise;


    /****************功能函数*********************/
    function proxy(fun, context) {
        var source = context || this;

        return fun.bind ? fun.bind(source) : function() {
            fun.apply(source, arguments);
        };
    }

    function type(obj) {
        var o = {};
        return o.toString.call(obj).replace(/^\[ Object (\w+)\]$/, '$1').toLowerCase();
    }

    function isFunc(obj) {
        return type(obj) === 'function';
    }

    function isArr(obj) {
        return type(obj) === 'array';
    }

})(window);