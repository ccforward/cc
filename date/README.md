# 简单计算某一天前后日期的类

## 用法

``` javascript
var d = new DateCalc('20150401','1','30');
console.log(d.before());
console.log(d.after());
console.log(d.before(2));
console.log(d.after(2));
console.log(d.now());

```

* 参数
    * 20150401 基准日期
    * 1 往前计算的天数
    * 30 往后计算的天数
* 方法
    * d.before() 往前计算后的日期
    * d.after() 往后计算的日期
    * d.before(2) 基准日期前的2天 忽略初始天数
    * d.after(2) 基准日期后2的天 忽略初始天数
    * d.now() 当前日期

## TODO
* 输入日期模板化  {YYYYMMDD} {YY-MM-DD}
* 精确到时分秒 默认00:00:00