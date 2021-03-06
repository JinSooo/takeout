import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Button } from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'

// 全局样式
import './assets/css/reset.css'
import './assets/stylus/global.styl'
// swiper样式
import 'swiper/swiper-bundle.min.css'
// 自定义全局组件
import Message from '@/components/Message.vue'
// 加载mock接口
import '@/mock'

axios.defaults.baseURL = '/api'

const vue = createApp(App)

// 全局定义
vue.component(Message.name, Message)
vue.component(Button.name, Button)

vue.use(router).mount('#app')
