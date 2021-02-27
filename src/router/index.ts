import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Takeout from '@/views/Takeout/Takeout.vue'
import Search from '@/views/Search/Search.vue'
import Order from '@/views/Order/Order.vue'
import Profile from '@/views/Profile/Profile.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'takeout',
  },
  {
    path: '/takeout',
    name: 'Takeout',
    component: Takeout,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
