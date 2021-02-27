import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Takeout from '@/views/Takeout/Takeout.vue'
import Search from '@/views/Search/Search.vue'
import Order from '@/views/Order/Order.vue'
import Profile from '@/views/Profile/Profile.vue'
import Login from '@/views/Login/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'takeout',
    meta: {
      isLogin: false,
    },
  },
  {
    path: '/takeout',
    name: 'Takeout',
    component: Takeout,
    meta: {
      isLogin: false,
    },
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      isLogin: false,
    },
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      isLogin: false,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      isLogin: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isLogin: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
