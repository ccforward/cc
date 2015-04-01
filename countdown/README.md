## 倒计时

通过ajax HEAD请求根域返回的HTTP头信息的Date来获取服务器时间

代码中只发送请求头 判断返回的readyState为2更高效

xhr.readyState == 2 表示send()方法已经被调用, 响应头和响应状态已经返回.
