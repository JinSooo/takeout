<template>
  <router-view />
  <FooterGuide />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FooterGuide from '@/components/FooterGuide.vue'
export default defineComponent({
  name: 'App',
  components: {
    FooterGuide,
  },
})
</script>
