# HTML5 摄像头

调用摄像头拍照生成图片，上传。

## getUserMedia

提示用户需要权限去使用像摄像头或麦克风之类的媒体设备.如果用户提供了这个权限，successCallback函数会被调用，且接收一个LocalMediaStream 对象作为参数

MediaStream 是用来描述音频流或视频流的

### 用法

navigator.getUserMedia(constraints, successCallback, errorCallback);

参数：
* constraints 必须 successCallback中传入的 LocalMediaStream对象所支持的媒体类型
* successCallback 必须 当应用中传递LocalMediaStream对象时触发的函数。
* errorCallback 可选 当调用媒体设备失败时触发的函数.