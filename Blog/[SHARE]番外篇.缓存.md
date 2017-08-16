#关于缓存 （大纲）

> 存储很便宜 但是流量太贵

Cache 缓存？ 快取？

## 从 200 和 304 说起

通过 charles 或 Findller 模拟各种情景

`Cache-Control: max-age`

### 强缓存

### 协商缓存 需要验证

静态资源或者接口内容可能会变化

1. 验证机制
2. 验证过程

### 关于 Cache-Control

HTTP 1.1 的标准

[MDN上的详细说明](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)

1. no-cache
2. no-store

### 关于 Expires

HTTP 1.0 的标准
 
会出现时区问题

### Etag 和 Last-Modified

Etag 强验证
Last-Modified 弱验证

[规范要求](http://www.ietf.org/rfc/rfc2616.txt)

13.3.4 Rules for When to Use Entity Tags and Last-Modified Dates

### public  private


## 设计缓存的决策树

![](https://img.alicdn.com/tfs/TB1xKqrSVXXXXbyXpXXXXXXXXXX-595-600.png)


## serviceWorker 缓存

[Google 对sw缓存使用](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)



PS: 网络请求 -> sw.js -> HTTP缓存


sw.js 中的请求向服务端去验证

```js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll([
        new Request('/styles/main.css', { cache: 'no-cache' }),
        new Request('/styles/main.js', { cache: 'no-cache' })
      ]))
  );
});

```

### 缓存顺序

200 from Cache （memory disc） ->  sw -> HTTP Cache  -> HTTP2 push

[HTTP2 PUSH](https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/)



## 其他的缓存

1. localStorage sessionStorage 
2. [HTTP2](https://github.com/ccforward/cc/issues/36)
3. 新版本提前下发资源

### 常用缓存淘汰算法

1. FIFO
2. LFU
3. LRU Vue.js 1.x 浏览器






