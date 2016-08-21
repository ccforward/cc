var Vue = require('vue')
var vueRange = require('../src/index.vue')

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