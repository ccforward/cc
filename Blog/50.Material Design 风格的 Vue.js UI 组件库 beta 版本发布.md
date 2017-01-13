# 关于 Rubik UI

Rubik UI 是一个基于 Vue.js 2.0+ 的开源 UI 组件库，在交互和视觉设计上遵循 Material Design 规范，适用于 PC 端和 mobile 端。

这是个从 jQuery 版本的 Material Design UI 组件库改版而来，内部系统已经开始使用，开源版本还在开发完善中。

## GitHub

[https://github.com/ccforward/rubik](https://github.com/ccforward/rubik)

## NPM

[![npm](https://img.shields.io/npm/v/i-rubik.svg)](https://www.npmjs.com/package/i-rubik)

## 兼容

支持 Vue.js 2.0+，不支持 Vue.js 1.x

## Demo

[https://ccforward.github.io/rubik/](https://ccforward.github.io/rubik/)

## 使用

#### npm 安装

``` shell
$ npm install i-rubik --save

$ yarn add i-rubik

```

#### Rubik 初始化

``` js
import Vue from 'vue'
import Rubik from 'i-rubik'
Vue.use(Rubik)

export default {
  name: 'app',
  mounted(){
    this.$rubik.init()
  }
}
```

### 引入字体

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" rel="stylesheet" type="text/css">
```

### 引入css

```html
<link href="./node_modules/i-rubik/dist/rubik.min.css" rel="stylesheet" type="text/css">
```

## 相关开源项目

Rubik UI 的部分组件和样式代码参考了以下项目 

在此表示感谢

*   [materializecss](http://materializecss.com/)
*   [material-ui](http://www.material-ui.com/)
*   [iview](https://www.iviewui.com/)
*   [vuetify](https://vuetifyjs.com/)