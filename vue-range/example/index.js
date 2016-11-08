var Vue = require('vue')
var vueRange = require('../src/index.vue')


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