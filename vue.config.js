module.exports = {
  // 修改公共路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
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
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.ts')

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        swiper: 'Swiper',
        vant: 'vant',
        axios: 'axios',
        '@better-scroll/core': 'BScroll',
      })

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
