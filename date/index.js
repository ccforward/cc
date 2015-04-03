// 日期计算 date: 20150401
function DateCalc(date,bef,aft){
    this.date = date.substr(0,4) + '-' + date.substr(4,2) + '-' + date.substr(-2);
    this.bef = bef || 0;
    this.aft = aft || 0;
}

DateCalc.prototype = {
    constructor: DateCalc,
    
    now: function(){
        var d = new Date();
        return [d.getFullYear(), this._cover(d.getMonth()+1), this._cover(d.getDate())].join('');     
    },
    before: function(days){
        return days ? this._calc(days,'before') : this.now();
    },
    after: function(days){
        return days ? this._calc(days,'after') : this.now();
    },
    // days 前后的天数
    // type before 或 after
    _calc: function(days, type){
        var _self = this,
            d = new Date(_self.date),
            input = 0;
            if(type === 'before') {
                input = 0 - _self.bef;
                days = 0 - days;
            }else {
                input = _self.aft;
            }
            var total = days || input || 0;

        var newDate = new Date(d.getTime() + 3600*24*1000*total);
        return [newDate.getFullYear(), _self._cover(newDate.getMonth()+1), _self._cover(newDate.getDate())].join('');
    },    
    _cover:function(num){
        var n = parseInt(num, 10);
        return n < 10 ? '0' + n : n;
    }
}

