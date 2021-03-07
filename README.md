# takeout

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 使用 provide&inject 进行全局变量的使用

- 先创建一个文件(store.ts) 用于存放全局变量并把它暴露出去

```javascript
const Store = {
  // 纬度
  latitude: 40.10038,
  // 经度
  longitude: 116.36867,
}
export default Store
```

- 在 App.vue 或使用全局变量的父组件上将他 provide 出去 供后面的组件使用

```javascript
// 全局声明
import Store from '@/store'
const store = reactive(Store)
provide('store', store)
```

- 子组件可以通过下面的方式获取全局变量或属性

```javascript
// 获取对象
const Store: any = inject('store')
// 获取对象的属性(具有响应式)
const latitude = toRef(inject('store) as any, 'latitude')
const cart = toRef(inject<any>('store'), 'cart')
```

## json 格式文件的模块导入

- 在 shims-vue.d.ts 文件中添加如下信息

```javascript
declare module '*.json' {
  const value: any;
  export default value;
}
```

## 取消 typescript 有关 any 的警告

- 在 eslintrc.js 中的 rules 中添加

```javascript
rules: {
  // 取消any的警告
  '@typescript-eslint/no-explicit-any': ['off'],
},
```

## 前台配置跨域问题解决

- 在 vue.config.js 中

```javascript
modules.export = {
  // 跨域问题
  devServer: {
    proxy: {
      // 请求api时要加上/api === http://localhost:4000/
      // /api/position/40.10038,116.36867 === http://localhost:4000/position/40.10038,116.36867
      '/api': {
        // 跳转目标请求地址
        target: 'http://localhost:4000/',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        // 这里是追加链接,比如真是接口里包含了 /api,就需要这样配置.
        pathRewrite: {
          // ^ 代表target地址 后面的api代码请求的api
          '^/api': '',
        },
      },
    },
  },
}
```

## Vue3 使用<transition>组件进入没有过渡效果

- 在 vue2 中过渡效果相对应的 css 元素分为

  - enter
  - enter - to
  - leave
  - leave - to

- 在 vue3 中过渡效果相对应的 css 元素分为
  - enter - from
  - enter - to
  - leave - from
  - leave - to

# 项目打包优化

- 1. 路由懒加载
  - 路由改成以下格式
  ```javascript
  const ShopGoods = () => import('@/views/Shop/Shop/ShopGoods.vue')
  const ShopRatings = () => import('@/views/Shop/Shop/ShopRatings.vue')
  const ShopInfo = () => import('@/views/Shop/Shop/ShopInfo.vue')
  ```
- 2. 路由分类加载
  - 当进入指定路由的时候会加载所有 webpackChunkName 相同的路由
    - a. 下载 @babel/plugin-syntax-dynamic-import 插件
    - b. 在 babel.config.js 中添加改插件
    - c. plugins: ['@babel/plugin-syntax-dynamic-import']
  ```javascript
  const ShopGoods = () => import(/* webpackChunkName: "shop" */ '@/views/Shop/Shop/ShopGoods.vue')
  const ShopRatings = () => import(/* webpackChunkName: "shop" */ '@/views/Shop/Shop/ShopRatings.vue')
  const ShopInfo = () => import(/* webpackChunkName: "shop" */ '@/views/Shop/Shop/ShopInfo.vue')
  ```
- 3. 缓存路由对象
  - 使用`<keep-alive></keep-alive>`组件
    - vue2
    ```javascript
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    ```
    - vue3
    ```javascript
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    ```
- 4. 图片懒加载

  - a. npm i vue-lazyload -S
  - b.

  ```javascript
  import Vue from 'vue'
  import VueLazyload from 'vue-lazyload'

  Vue.use(VueLazyload)

  // or with options
  Vue.use(VueLazyload, {
    preLoad: 1.3, // 预高度的比例
    error: 'dist/error.png', // 图片出错显示的图片
    loading: 'dist/loading.gif', // 图片加载时显示的图片
    attempt: 1, // 重新加载次数
  })
  // template 使用v-lazy表示
  <ul>
    <li v-for="img in list">
      <img v-lazy="img.src" />
    </li>
  </ul>
  ```

- 5. 移除所有的 console 语句

  - a. 下载 babel-plugin-transform-remove-console 插件
  - b. 在 babel.config.js 中添加改插件
  - c. plugins: ['transform-remove-console']
  - 只在生成环境下取消 console

  ```javascript
  babel.config.js
  const prodPlugins = []
  // 判断是否在生成环境下
  if (process.env.NODE_ENV === 'production') {
    prodPlugins.push('transform-remove-console')
  }

  module.exports = {
    plugins: [...prodPlugins],
  }
  ```

- 6. 给页面加载进度条

  - a. npm install --save nprogress
  - b. 可以通过 axios 的请求和响应拦截器来配合进度条使用

  ```javascript
  NProgress.start() // 表示进度条的开始
  NProgress.done() // 表示进度条的结束
  ```

- 7. 分别对开发和生成环境进行不同的打包或运行

  ```javascript
  module.exports = {
    // 修改公共路径
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    chainWebpack: config => {
      config.when(process.env.NODE_ENV === 'production', config => {
        config
          .entry('app')
          .clear()
          .add('./src/main-prod.ts')

        config.plugin('html').tap(args => {
          args[0].isProd = true
          return args
        })
      })

      config.when(process.env.NODE_ENV === 'development', config => {
        config
          .entry('app')
          .clear()
          .add('./src/main.ts')

        config.plugin('html').tap(args => {
          args[0].isProd = false
          return args
        })
      })
    },
  }
  // 结合htmlPlugin
  // 在index.html中为title添加提示
  <title>XXX <%= htmlWebpackPlugin.options.isProd ? '' : ' - dev' %></title>
  ```

- 8. 通过外部资源引用 CDN

  -

  ```javascript
  vue.config.js
  module.exports = {
    chainWebpack: config => {
      config.when(process.env.NODE_ENV === 'production', config => {
        // 配置externals
        // vue: 'Vue' vue是包的名字   'Vue'是包暴露出的全局变量
        config.set('externals', {
          vue: 'Vue',
          'vue-router': 'VueRouter'
        })
      })
    },
  }
  index.html
  <% if(htmlWebpackPlugin.options.isProd) {%>
    <script src="https://unpkg.com/vue@3.0.7/dist/vue.global.prod.js"></script>
    <script src="https://unpkg.com/vue-router@4.0.4/dist/vue-router.global.prod.js"></script>
  <%}%>
  ```

- 9. 开启 Gzip 网络传输压缩

  - 将打包后的 dist 文件创建 web 服务
  - 下载 npm install compression -S

  ```javascript
  const express = require('express')
  const compression = require('compression')
  const app = express()

  // 开启gzip压缩配置
  app.use(compression())
  // 引用静态资源
  app.use(express.static('./dist'))
  ```

- 10. 配置 HTTPS 服务

  - HTTP 协议传输的数据是明文不安全
  - HTTPS 对传输的数据进行了加密，使用更安全
    - a. 进入`https://freessl.org`官网,输入要申请的域名并选择品牌
    - b. 输入邮箱并选择相关选项
    - c. 验证 DNS
    - d. 下载 SSL 证书(full_chain.pem 公钥;private.key 私钥)

  ```javascript
  const express = require('express')
  const compression = require('compression')
  const https = require('https')
  const fs = require('fs')
  const app = express()

  const options = {
    // 公钥
    cert: fs.readFileSync('./full_chain.pem'),
    // 私钥
    key: fs.readFileSync('./private.key'),
  }

  // 一定要把这一行代码，写到 静态资源托管之前
  app.use(compression())
  app.use(express.static('./dist'))

  https.createServer(options, app).listen(443)
  ```
