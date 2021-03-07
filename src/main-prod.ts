import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// 全局样式
import './assets/css/reset.css'
import './assets/stylus/global.styl'
// 自定义全局组件
import Message from '@/components/Message.vue'
// 加载mock接口
import '@/mock'

axios.defaults.baseURL = 'http://localhost:4000/'

const vue = createApp(App)

// 全局定义
vue.component(Message.name, Message)

vue.use(router).mount('#app')
