# simple-pagination

简单的bootstrap jQuery分页组件

```js
/**
 * @param  string url 链接
 * @param  string pageName  分页参数名
 * @param  int pageCounts 可显示的页码个数
 * @param  int total 总页数
 * @param  int current 当前第几页
 */
$('.rate-page').Pagination({
	url: '/index.html',
	pageName: 'p',
	pageCounts: '10',
	total: 100,
	current: 10
}) 
```