<template>
  <div class="vue-pages">
    <ul class="pagination">
      <li v-if="start > counts">
        <a :href="prev" @click="fn(current-1, $event)" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>
      </li>
      <li v-for="p in pageCounts" :class="p == c ? 'active' : ''">
        <a :href="link(p)" @click="p == c ? null : fn(p, $event)">{{ p }}</a>
      </li>
      <li v-if="end!=total">
        <a :href="next" @click="fn(current+1, $event)" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>
      </li>
    </ul>
  </div>
</template>


<script>

/**
 * url: URL
 * pageName:  paramter's Name
 * counts: the count of page numbers that can show
 * total 
 * current: the current page number
 * fn: the click hanlder
**/
export default {
    name: 'vue-pages',
    props: {
      url: {
        type: String,
        default: ''
      },
      pageName: {
        type: String,
        default: 'p'
      },
      counts: {
        type: Number,
        default: 10
      },
      total: {
        type: Number,
        default: 1
      },
      current: {
        type: Number,
        default: 1
      },
      fn:{
        type: Function,
        default: function(){}
      }
    },
    computed: {
      c(){
        let c = 1;
        c = this.current < 1 ? 1 : this.current
        return c > this.total ? this.total : c
      },
      start(){
        let start = this.c - this.c % this.counts

        if(this.c % this.counts == 0){
          start = this.c - this.counts
        }
        if(this.c > this.counts){
          start = start + 1
        }
        return Math.max(1, start)
      },
      end(){
        let end = this.start + this.counts - 1
        if(this.c % this.counts == 0){
          end = this.c
        }
        end = end > this.total ? this.total : end
        return Math.min(end, this.total)
      },
      pageCounts(){
        let pages = []
        for(let i=this.start; i<=this.end; i++){
          pages.push(i)
        }
        return pages
      },
      prev(){
        return this.link(this.c)
      },
      next(){
        return this.link(this.c)
      }
    },
    methods: {
      link(page){
        let connector = this.url.indexOf('?')>-1 ? '&' : '?'
        return this.url + connector + this.pageName + '=' + page
      }
    }
}

</script>

<style>
  .pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
  }
  .pagination > li {
    display: inline;
  }
  .pagination > li > a,
  .pagination > li > span {
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  .pagination > li:first-child > a,
  .pagination > li:first-child > span {
    margin-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .pagination > li:last-child > a,
  .pagination > li:last-child > span {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .pagination > li > a:hover,
  .pagination > li > span:hover,
  .pagination > li > a:focus,
  .pagination > li > span:focus {
    z-index: 2;
    color: #23527c;
    background-color: #eee;
    border-color: #ddd;
  }
  .pagination > .active > a,
  .pagination > .active > span,
  .pagination > .active > a:hover,
  .pagination > .active > span:hover,
  .pagination > .active > a:focus,
  .pagination > .active > span:focus {
    z-index: 3;
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
  }
  .pagination > .disabled > span,
  .pagination > .disabled > span:hover,
  .pagination > .disabled > span:focus,
  .pagination > .disabled > a,
  .pagination > .disabled > a:hover,
  .pagination > .disabled > a:focus {
    color: #777;
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ddd;
  }
  .pagination-lg > li > a,
  .pagination-lg > li > span {
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
  }
  .pagination-lg > li:first-child > a,
  .pagination-lg > li:first-child > span {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  .pagination-lg > li:last-child > a,
  .pagination-lg > li:last-child > span {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .pagination-sm > li > a,
  .pagination-sm > li > span {
    padding: 5px 10px;
    font-size: 12px;
    line-height: 1.5;
  }
  .pagination-sm > li:first-child > a,
  .pagination-sm > li:first-child > span {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  .pagination-sm > li:last-child > a,
  .pagination-sm > li:last-child > span {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
</style>