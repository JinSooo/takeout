import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/reset.css'
import './assets/stylus/global.styl'

import 'swiper/swiper-bundle.min.css'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
