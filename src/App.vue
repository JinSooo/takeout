<template>
  <router-view />
  <FooterGuide v-if="!routerPath.meta.isLogin" />
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, reactive } from 'vue'
import FooterGuide from '@/components/FooterGuide.vue'
import router from './router'
import Store from '@/store'
import { getUserInfo } from './utils/api'
export default defineComponent({
  name: 'App',
  components: {
    FooterGuide,
  },
  setup() {
    // 是否在登录界面
    const routerPath = router.currentRoute
    // 全局声明
    const store = reactive(Store)
    provide('store', store)

    onMounted(async () => {
      // 自动登录
      const res: any = await getUserInfo()
      if (res.code === 1) return
      store.userInfo = res.data
    })

    return {
      routerPath,
    }
  },
})
</script>
