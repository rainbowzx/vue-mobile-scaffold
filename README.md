# formentry

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build:prod

# build for production and view the bundle analyzer report
npm run upload:prod
```

## 技术架构
    vux@2.8.1,
    vux-loader@1.2.6,
    webpack@2.6.1,
    node@11.6.0
    Vue 2.0+
    vue-loader
    vue-router
    axios
    Webpack-dev-server
## 目录结构
       |----build(webpack配置文件)
       |    |
       |    |--dev-server.js(开发环境可在此文件配置本机运行IP)
       |    |
       | 
       |
       |----config
       |    |
       |    |--index.js(开发环境修改本机运行端口)
       |
       |
       |
       |----src
       |    |
       |    |--assets(公共图片目录)
       |    |
       |    |--router(路由配置文件)
       |    |
       |    |--views(路由页面)
       |    |    |
       |    |    |--components（VUE组件文件夹）
       |    |    |
       |    |    |--index.vue（首页）
       |    |    |
       |    |
       |    |--App.vue(项目入口)    
       |    |
       |    |--test （测试数据文件）
       |    |
       |    |--static（样式，公共JS,api,jsBridge等存放文件夹）
       |    |
       |    |--store (vuex数据管理)
       |    |
       |    |--main.js（webapck项目入口文件）
       |
       |  
       |
       |--.editorconfig（webStrom编辑器配置文件,可删除）
       |
       |--.eslintrc（JS校验文件，可删除）
       |
       |--.gitignore（GIT忽略文件，如果没有使用GIT，可删除）
       |
       |--package.json（npm包配置文件）
       |
       |--postcss.config.js（postcss配置文件）
       |
       |--README.md（项目说明文件）