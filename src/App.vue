<template>
  <router-view />
  <FooterGuide v-if="!routerPath.meta.isLogin" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FooterGuide from '@/components/FooterGuide.vue'
import router from './router'
export default defineComponent({
  name: 'App',
  components: {
    FooterGuide,
  },
  setup() {
    // 是否在登录界面
    const routerPath = router.currentRoute

    return {
      routerPath,
    }
  },
})
</script>
