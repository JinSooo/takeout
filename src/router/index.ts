import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// import Takeout from '@/views/Takeout/Takeout.vue'

// import Search from '@/views/Search/Search.vue'

// import Order from '@/views/Order/Order.vue'

// import Profile from '@/views/Profile/Profile.vue'

// import Login from '@/views/Login/Login.vue'

// import Shop from '@/views/Shop/Shop.vue'
// import ShopGoods from '@/views/Shop/Shop/ShopGoods.vue'
// import ShopRatings from '@/views/Shop/Shop/ShopRatings.vue'
// import ShopInfo from '@/views/Shop/Shop/ShopInfo.vue'

const Takeout = () => import(/* webpackChunkName: "takeout" */ '@/views/Takeout/Takeout.vue')
const Search = () => import(/* webpackChunkName: "search" */ '@/views/Search/Search.vue')
const Order = () => import(/* webpackChunkName: "order" */ '@/views/Order/Order.vue')
const Profile = () => import(/* webpackChunkName: "profile" */ '@/views/Profile/Profile.vue')
const Login = () => import(/* webpackChunkName: "login" */ '@/views/Login/Login.vue')
const Shop = () => import(/* webpackChunkName: "shop" */ '@/views/Shop/Shop.vue')
const ShopGoods = () => import(/* webpackChunkName: "shop" */ '@/views/Shop/Shop/ShopGoods.vue')
const ShopRatings = () => import(/* webpackChunkName: "shop" */ '@/views/Shop/Shop/ShopRatings.vue')
const ShopInfo = () => import(/* webpackChunkName: "shop" */ '@/views/Shop/Shop/ShopInfo.vue')

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
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
    meta: {
      isLogin: true,
    },
    children: [
      {
        path: '/shop/goods',
        name: 'ShopGoods',
        component: ShopGoods,
      },
      {
        path: '/shop/ratings',
        name: 'ShopRatings',
        component: ShopRatings,
      },
      {
        path: '/shop/info',
        name: 'ShopInfo',
        component: ShopInfo,
      },
      {
        path: '',
        redirect: '/shop/goods',
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
