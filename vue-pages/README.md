[![NPM version][npm-image]][npm-url]

# vue-pages

A Dead Simple Vue Pagination Component Using Bootstrap Style

support vue 2.0+

## demo
[demo](http://ccforward.github.io/demos/vue-pages/index.html)
[demo's code](https://github.com/ccforward/ccforward.github.io/tree/master/demos/vue-pages)

## npm package
[https://www.npmjs.com/package/vue-pages](https://www.npmjs.com/package/vue-pages)

## Screenshot
![range](https://raw.githubusercontent.com/ccforward/cc/master/vue-pages/img/pages.png)

## Usage

js code

```js
const vuePages = require('vue-pages')
// or ES6
// import vuePages from 'vue-pages'

new Vue({
  el: '#app',
  data() {
    return {
      url1: '#',
      url2: '?param=pages',
      pageName:'p',
      total: 27,
      counts: 10,
      current1: 11,
      current2: 5
    }
  },
  methods: {
    fn1(d, e){
      this.current1 = d
    },
    fn2(d, e){
      e.preventDefault()
      this.current2 = d
    }
  },
  components: {
    vuePages
  }
})
```

HTML code

```html
<vue-pages :url="url1" :total="total" :counts="counts" :current="current1" :fn="fn1"></vue-pages>
      
<vue-pages :url="url2" :total="total" :counts="counts" :current="current2" :fn="fn2"></vue-pages>
```

## Parameters
* `url`: URL
* `pageName`:  paramter's Name
* `counts`: the count of page numbers that can show
* `total`: total pages 
* `current`: the current page number
* `fn`: the click hanlder


## Development

```shell
$ npm install

$ npm run dev
# open 'http://localhost:5000'
```

[downloads-image]: https://img.shields.io/npm/dm/vue-pages.svg
[npm-url]: https://www.npmjs.com/package/vue-pages
[npm-image]: https://img.shields.io/npm/v/vue-pages.svg