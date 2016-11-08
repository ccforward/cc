# vue-range

similar input-range component for Vue

Inspired by [mint-UI Range](https://github.com/ElemeFE/mint-ui/tree/master/packages/range)

## npm package
[https://www.npmjs.com/package/vue-range](https://www.npmjs.com/package/vue-range)

## Screenshot
![range](https://raw.githubusercontent.com/ccforward/cc/master/vue-range/img/range.png)

## Usage

index.js

```js
var Vue = require('vue')
var vueRange = require('../src/index.vue')

// or ES2015
// import vueRange from 'vue-range'

new Vue({
  data() {
    return {
      val: 90,
      val2: 100,
      val3: 30,
      val4: 20,
      val5: -10,
      valStep: 10,
      max: 80
    }
  },
  methods: {
    endFn(){
      alert('end at: ' + this.val)
    }
  },
  components: {
    vueRange
  }
}).$mount('#app')
```

html

```html
<div id="app">
  <template>
    <vue-range v-model="val" :end-func="endFn"></vue-range>
    <!-- <vue-range v-model="val" ></vue-range> -->
    {{ val }}
    <br>
    <br>

     <vue-range :step="valStep" v-model="val2">
      <div slot="start">start</div>
      <div slot="end">end</div>
    </vue-range>
    {{valStep}} - {{ val2 }}
    <br>
    <br>
    <br>
    
    <span>disable:</span>
    <vue-range disabled v-model="val3"></vue-range>
    <br>
    <br>
    <br>


    <span>height: 3</span>
    <vue-range :bar-height="3" v-model="val4"></vue-range>
    <br>
    <br>
    <br>

    <span>min: 10</span>
    <vue-range :min="10" :max="max" v-model="val5">
      <div slot="start">10</div>
      <div slot="end">{{ max }}</div>
    </vue-range>
  </template>
</div>
```

## Development

```shell
$ npm install

$ npm run dev

open 'http://localhost:5000'
```

## Version

#### 1.1.0
support vue 2.0+

#### 1.0.0
fixbug & add a callback function