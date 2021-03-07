<template>
  <ul class="shop_list" v-if="Store.shops.length">
    <li class="shop_li border-1px" v-for="(shop, index) in Store.shops" :key="index">
      <a>
        <router-link to="/shop">
          <div class="shop_left">
            <img
              class="shop_img"
              src="http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750"
            />
          </div>
          <div class="shop_right">
            <section class="shop_detail_header">
              <h4 class="shop_title ellipsis">{{ shop.name }}</h4>
              <ul class="shop_detail_ul">
                <li class="supports" v-for="(s, index) in shop.supports" :key="index">{{ s.icon_name }}</li>
              </ul>
            </section>
            <section class="shop_rating_order">
              <section class="shop_rating_order_left">
                <Star :rating="shop.rating" :size="24" />
                <div class="rating_section">
                  {{ shop.rating }}
                </div>
                <div class="order_section">月售{{ shop.recent_order_num }}单</div>
              </section>
              <section class="shop_rating_order_right">
                <span class="delivery_style delivery_right">{{ shop.delivery_mode.text }}</span>
              </section>
            </section>
            <section class="shop_distance">
              <p class="shop_delivery_msg">
                <span>¥{{ shop.float_minimum_order_amount }}起送</span>
                <span class="segmentation">/</span>
                <span>配送费约¥{{ shop.float_delivery_fee }}</span>
              </p>
            </section>
          </div>
        </router-link>
      </a>
    </li>
  </ul>
  <!-- 当在加载时显示 -->
  <img src="../assets/images/shop_back.svg" alt="" v-for="a in 6" :key="a" v-else />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import Star from './Star.vue'
export default defineComponent({
  name: 'ShopList',
  components: {
    Star,
  },
  setup() {
    const baseImageUrl = 'http://cangdu.org:8001/img/'
    const Store = inject('store')
    return {
      Store,
      baseImageUrl,
    }
  },
})
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixins.styl'
.shop_list
  .shop_li
    bottom-border-1px(#f1f1f1)
    width 100%
    >a
      clearFix()
      display block
      box-sizing border-box
      padding 15px 8px
      width 100%
      .shop_left
        float left
        box-sizing border-box
        width 23%
        height 75px
        padding-right 10px
        .shop_img
          display block
          width 100%
          height 100%
      .shop_right
        float right
        width 77%
        .shop_detail_header
          clearFix()
          width 100%
          .shop_title
            float left
            width 200px
            color #333
            font-size 16px
            line-height 16px
            font-weight 700
            &::before
              content '品牌'
              display inline-block
              font-size 11px
              line-height 11px
              color #333
              background-color #ffd930
              padding 2px 2px
              border-radius 2px
              margin-right 5px
          .shop_detail_ul
            float right
            margin-top 3px
            .supports
              float left
              font-size 10px
              color #999
              border 1px solid #f1f1f1
              padding 0 2px
              border-radius 2px
        .shop_rating_order
          clearFix()
          width 100%
          margin-top 18px
          margin-bottom 8px
          .shop_rating_order_left
            float left
            color #ff9a0d
            .rating_section
              float left
              font-size 10px
              color #ff6000
              margin-left 4px
            .order_section
              float left
              font-size 10px
              color #666
              transform scale(.8)
          .shop_rating_order_right
            float right
            font-size 0
            .delivery_style
              transform-origin 35px 0
              transform scale(.7)
              display inline-block
              font-size 12px
              padding 1px
              border-radius 2px
            .delivery_left
              color #fff
              margin-right -10px
              background-color #02a774
              border 1px solid #02a774
            .delivery_right
              color #02a774
              border 1px solid #02a774
        .shop_distance
          clearFix()
          width 100%
          font-size 12px
          .shop_delivery_msg
            float left
            transform-origin 0
            transform scale(.9)
            color #666
          .segmentation
            color #ccc
</style>
