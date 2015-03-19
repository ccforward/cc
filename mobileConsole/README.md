## 综述

MobileConsole是用在移动端的小工具,可以模拟PC浏览器的console进行debug.


## 使用说明

```
    var mc = new MobileConsole();
    mc.init(90);
    mc.log("Array",[11,22,'javascript is a good language']);
    mc.log("Object",{dept:'taobao UED', year:2013, array:[1111, 1212, '呵呵',{maomao:'一师是个好学校', huanhuan:'这真真是极好的'}]});
    mc.log({str:'a String',arr:[100, 500, {num:2046,strs:'another String'}]})
    mc.log("DOM Element", document.getElementById("J_test"));
```
##  旋转角度 和 在pc上开启console 
    //添加参数 'degree', 'pc'
    var mConsole = new KMobileConsole(90, 'pc')

## 查看debug信息
* 把移动设备设置为可旋转模式,然后设备向右旋转90度即可查看debug信息
![开始状态](http://pic.yupoo.com/ccking/DeCLt3ei/medish.jpg)
![旋转之后](http://pic.yupoo.com/ccking/DeCLtt8p/RGjC6.png)

* 在debug信息区最下方输入框中可以运行js代码(比较鸡肋)
![运行代码](http://pic.yupoo.com/ccking/DeCLXx7R/yCEiu.png)



## 兼容
* iOS 6 +
* Android 4+
