module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main.ts')

      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
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
