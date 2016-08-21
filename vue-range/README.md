# vue-range

similar input-range component for Vue

Inspired by [mint-UI Range](https://github.com/ElemeFE/mint-ui/tree/master/packages/range)

## Screenshot
![demo](http://ww3.sinaimg.cn/large/72f96cbajw1f71coi4cyhj20s70j9dh0.jpg)

## Usage

index.js

```js
var Vue = require('vue')
var vueRange = require('../src/index.vue')

// or ES2015
import vueRange from 'vue-range'

new Vue({
  el: '#app',
  data: {
    val: 100,
    val2: 100,
    valStep: 10,
    max: 80
  },
  components: {
    vueRange
  }
})
```

html

```html
<div id="app">
<vue-range :value.sync="val" ></vue-range>
{{ val }}
<br>
<br>

<vue-range :step="valStep" :value.sync="val2">
  <div slot="start">start</div>
  <div slot="end">end</div>
</vue-range>
{{valStep}} - {{ val2 }}
<br>
<br>

<vue-range disabled :value="30"></vue-range>
<vue-range :bar-height="3" :value="20"></vue-range>
<vue-range :min="10" :max="max">
  <div slot="start">10</div>
  <div slot="end">{{ max }}</div>
</vue-range>
</div>
```

## Development

```shell
$ npm install

$ npm run dev
```