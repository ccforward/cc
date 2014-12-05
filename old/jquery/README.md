##总览

* （14） (function(window,undefined){：定义自执行的匿名函数，所有源码均包含在该匿名函数中
* （21，94） jQuery = function(){……}：定义了一些变量和函数
* （96，283） jQuery.fn = jQuery.prototype={}：在jQuery对象原型中添加一些属性和方法
* （285，347） jQuery.extend = jQuery.fn.extend : jQuery的继承方法，为添加后续代码提供良好的扩展性，同时扩展插件也是从该继承方法中扩展
* （349，817） jQuery.extend() : 扩展一些工具方法（静态方法）$.trim()、$.proxy()
* （877，2856） Sizzle css选择器的源码
* （2880，3042） Callbacks : 回调对象，对函数的统一管理
* （3043，3183） Deferred : 延迟对象，对异步队列的统一管理
* （3184，3295） support : 浏览器的功能检测
* （3308，3652） data() : 数据缓存，避免大数据量的元素挂载、预防内存泄露
* （3653，3797） queue() : 队列方法，入队出队、执行顺序的管理
* （3803，4299） attr()、prop()、val()、addClass()等 : 对元素属性的操作
* （4300，5128） on()、trigger() : 事件操作的相关方法
* （5140，6057） DOM操作 : 添加、删除、获取、包装、DOM筛选等
* （6058，6620） css() : 样式的操作
* （6621，7854） 序列化操作、数据提交和ajax方法：ajax()、load()、getJSON()等
* （7855，8584） animate() : 运动（动画）的实现方法
* （8585，8792） offset()  scrollTop() 等: 位置和尺寸的方法
* （8804，8821） jQuery中支持模块化的模式
* （8826） window.jQuery = window.$ = jQuery：jQuery的符号简写为$
* （8829） })(window)：传入window参数

### 说明
* jquery-2.0.3-src.js 为源码，总览中的行数对应这个文件
* jquery-2.0.3.js 添加了自己的注释
* [简要笔记](http://ccforward.net/jq_src_note)