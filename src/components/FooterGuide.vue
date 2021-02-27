<template>
  <footer class="footer_guide border-1px">
    <a href="javascript:;" class="guide_item" :class="{ on: routerPath.path === '/takeout' }" @click="goTo('/takeout')">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{ on: routerPath.path === '/search' }" @click="goTo('/search')">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{ on: routerPath.path === '/order' }" @click="goTo('/order')">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{ on: routerPath.path === '/profile' }" @click="goTo('/profile')">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </a>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import router from '@/router'
export default defineComponent({
  name: 'FooterGuide',
  setup() {
    // 路由当前路径对象
    const routerPath = router.currentRoute
    /* **************************************************************************************** */
    // 跳转路由
    const goTo = (route: string) => {
      router.push(route)
    }

    return {
      routerPath,
      goTo,
    }
  },
})
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixins.styl'
.footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>
