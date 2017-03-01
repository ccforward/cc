<template>
    <div class="vue-range">
        <slot name="start"></slot>
        <div class="vue-range-content" ref="content">
            <div class="vue-range-railway" :style="{'border-top-width': barHeight + 'px'}"></div>
            <div class="vue-range-bar" :style="{width: progress + '%', 'height': barHeight + 'px'}"></div>
            <div class="vue-range-handle" ref="handle" :style="{left: progress + '%'}"></div>
        </div>
        <slot name="end"></slot>
    </div>
</template>


<script>
let isDragging = false;
const supportTouch = 'ontouchstart' in window;

const draggable = function(element, options) {
  const moveFn = function(event) {
    if (options.drag) {
      options.drag(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
    }
  };

  const endFn = function(event) {
    if (!supportTouch) {
      document.removeEventListener('mousemove', moveFn);
      document.removeEventListener('mouseup', endFn);
    }
    document.onselectstart = null;
    document.ondragstart = null;

    isDragging = false;

    if (options.end) {
      options.end(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
    }
  };

  element.addEventListener(supportTouch ? 'touchstart' : 'mousedown', function(event) {
    if (isDragging) return;
    event.preventDefault();
    document.onselectstart = function() { return false; };
    document.ondragstart = function() { return false; };

    if (!supportTouch) {
      document.addEventListener('mousemove', moveFn);
      document.addEventListener('mouseup', endFn);
    }
    isDragging = true;

    if (options.start) {
      options.start(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
    }
  });

  if (supportTouch) {
    element.addEventListener('touchmove', moveFn);
    element.addEventListener('touchend', endFn);
    element.addEventListener('touchcancel', endFn);
  }
}

export default {
    name: 'vue-range',
    props: {
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        step: {
            type: Number,
            default: 1
        },
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: Number
        },
        barHeight: {
            type: Number,
            default: 1
        },
        endFunc: {
            type: Function,
            default: ()=>{}
        }
    },
    computed: {
        progress() {
            const value = this.value;
            if(typeof value === 'undefined' || value == null) return 0;
            if(value <= this.min){
              return 0
            }
            return Math.floor((value - this.min) / (this.max - this.min) * 100)
        }
    },
    mounted(){
        const _self = this;
        const { content, handle } = this.$refs;

        const handlePos = () => {
            const contentBox = content.getBoundingClientRect();
            const handleBox = handle.getBoundingClientRect();
            return {
                left: handleBox.left - contentBox.left,
                top: handleBox.top - contentBox.top
            }
        }

        let dragState = {};

        draggable(handle, {
            start: () => {
                if(this.disabled) return;
                const position = handlePos();
                dragState = {
                    handleStartLeft: position.left,
                    handleStartTop: position.top
                }
            },
            drag: (event) => {
                if(this.disabled) return;
                const contentBox = content.getBoundingClientRect();
                const deltaX = event.pageX - contentBox.left - dragState.handleStartLeft;
                const stepTotalCount = Math.ceil((this.max - this.min) / this.step)
                const newPosition = (dragState.handleStartLeft + deltaX) - (dragState.handleStartLeft + deltaX) % (contentBox.width / stepTotalCount);

                let newProgress = newPosition / contentBox.width;
                // console.log(deltaX/contentBox*100);

                if(newProgress < 0){
                    newProgress = 0
                }else if(newProgress > 1) {
                    newProgress = 1;
                }
                
                this.$emit('input', Math.round(this.min + newProgress * (this.max - this.min)));
            },
            end: () => {
                if(this.disabled) return;
                dragState = {}
                typeof _self.endFunc === 'function' && _self.endFunc();
            }
        });
    }
}

</script>

<style>
.vue-range {
    position: relative;
    display: flex;
    height: 30px;
    line-height: 30px;
}
.vue-range > * {
    display: -webkit-box;
    display: flex;
}
.vue-range *[slot=start] {
  margin-right: 5px;
}
.vue-range *[slot=end] {
  margin-left: 5px;
}
.vue-range .vue-range-content {
  position: relative;
  flex: 1;
  margin-right: 30px;
}
.vue-range .vue-range-railway {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: -30px;
  border-top-color: #a9acb1;
  border-top-style: solid;
}
.vue-range .vue-range-bar {
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  background-color: #14df24;
}
.vue-range .vue-range-handle {
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  cursor: move;
  box-shadow: 0 1px 3px rgba(0,0,0,.4);
}
</style>