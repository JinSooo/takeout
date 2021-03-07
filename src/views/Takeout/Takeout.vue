<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop class="msite_header" :title="address">
      <template #left>
        <router-link class="header_search" to="/search">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </template>
      <template #right>
        <router-link :to="Store.userInfo._id ? '' : '/login'" class="header_login">
          <span class="header_login_text" v-if="!Store.userInfo._id">登录 | 注册</span>
          <i class="iconfont icon-person" v-else></i>
        </router-link>
      </template>
    </HeaderTop>

    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categoriesArr.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categories, index) in categoriesArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(item, index) in categories" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl + item.image_url" />
              </div>
              <span>{{ item.title }}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="../../assets/images/msite_back.svg" alt="" v-else />
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <div class="shop_container">
        <ShopList />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick, inject, ref } from 'vue'
import Swiper from 'swiper'
import HeaderTop from '@/components/HeaderTop.vue'
import ShopList from '@/components/ShopList.vue'
import { getAddress, getFoodCategories, getShops } from '@/utils/api'
export default defineComponent({
  name: 'Takeout',
  components: {
    HeaderTop,
    ShopList,
  },
  setup() {
    // 如果要修改值就注入变量
    const Store: any = inject('store')
    // 地址
    const address = ref('')
    // 商品分类
    const categoriesArr = ref<any[]>([])
    // 图片默认路径
    const baseImageUrl = 'https://fuss10.elemecdn.com/'
    // 商家列表
    const shopsArr = ref([])
    /* **************************************************************************************** */
    // 初始化Swiper
    const initSwiper = () => {
      // 引用Pagination
      // Swiper.use([Pagination])
      // 在下次 DOM 更新循环结束之后执行延迟回调
      nextTick(() => {
        new Swiper('.swiper-container', {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        })
      })
    }
    // 格式化数组
    const formatArr = (arr: []) => {
      // 格式化数组
      const newArr: any[] = []
      // 保存8长度的数组
      let arr8: any[] = []
      arr.forEach((categories: object) => {
        arr8.push(categories)
        if (arr8.length === 8) {
          newArr.push(arr8)
          arr8 = []
        }
      })
      return newArr
    }

    onMounted(async () => {
      // 获取地址信息
      const resAddress: any = await getAddress('40.10038,116.36867')
      // 将响应结果保存到全局变量中
      Store.address = resAddress.data
      address.value = resAddress.data.name
      // 获取商品分类列表
      const resCategories: any = await getFoodCategories()
      // 将响应结果保存到全局变量中
      Store.categories = resCategories.data
      categoriesArr.value = formatArr(resCategories.data)
      // 获取商家列表
      const resShops: any = await getShops(Store.latitude, Store.longitude)
      // 将响应结果保存到全局变量中
      Store.shops = resShops.data
      shopsArr.value = resShops.data
      // 获取完数据后更新swiper
      nextTick(() => {
        initSwiper()
      })
    })

    return {
      address,
      categoriesArr,
      baseImageUrl,
      shopsArr,
      Store,
    }
  },
})
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/mixins.styl'
&.msite  //首页
  width 100%
  .msite_header
    background-color #02a774
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px
    .header_search
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 10%
      height 50%
      .icon-sousuo
        font-size 25px
        color #fff
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      text-align center
      .header_title_text
        font-size 20px
        color #fff
        display block
    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      .header_login_text
        color #fff
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
    .shop_container
      padding-bottom 50px
</style>
