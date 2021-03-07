<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <!--current-->
        <li
          class="menu-item"
          v-for="(good, index) in goods"
          :key="index"
          :class="{ current: index === currentIndex }"
          @click="clickMenuItem(index)"
        >
          <span class="text bottom-border-1px">
            <img class="icon" :src="good.icon" v-if="good.icon" />
            {{ good.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul ref="goodsRef">
        <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
          <h1 class="title">{{ good.name }}</h1>
          <ul>
            <li
              class="food-item bottom-border-1px"
              v-for="(food, index) in good.foods"
              :key="index"
              @click="showFood(food)"
            >
              <div class="icon">
                <img width="57" height="57" :src="food.icon" />
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food" />
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCart />
  </div>
  <transition name="fade">
    <ShopFood :food="currentFood" ref="shopFoodRef" />
  </transition>
</template>

<script lang="ts">
import { getGoods } from '@/utils/api'
import { computed, defineComponent, inject, nextTick, onMounted, reactive, ref, toRef } from 'vue'
import BetterScroll from '@better-scroll/core'
import CartControl from '@/components/CartControl.vue'
import ShopFood from '@/components/ShopFood.vue'
import ShopCart from '@/components/ShopCart.vue'
export default defineComponent({
  name: 'ShopGoods',
  components: {
    CartControl,
    ShopFood,
    ShopCart,
  },
  setup() {
    const goods = toRef(inject('store') as any, 'goods')
    // 当前y轴距离
    const scrollY = ref(0)
    // 商品列表元素
    const goodsRef = ref()
    // 每个商品菜单高度的数组
    const tops = reactive<number[]>([])
    // 商品列表滚轮实例
    let foodsScroll: any = null
    // 选择的食物
    const currentFood = ref()
    // 显示商品详情界面
    const shopFoodRef = ref()
    /* **************************************************************************************** */
    // 当前选择的菜单类
    const currentIndex = computed<number>({
      get() {
        const index = tops.findIndex((top, index) => top <= scrollY.value && tops[index + 1] > scrollY.value)
        return index
      },
      set(val) {
        scrollY.value = tops[val]
      },
    })
    /* **************************************************************************************** */
    // 初始化滚动
    const _initScroll = () => {
      new BetterScroll('.menu-wrapper', {
        // 阻止过渡行为
        useTransition: false,
        click: true,
      })
      // 给商品界面添加滑动监听
      foodsScroll = new BetterScroll('.foods-wrapper', {
        useTransition: false,
        click: true,
        probeType: 3, // 因为惯性的滑动会触发y轴变化
      }).on('scroll', ({ y }: any) => {
        scrollY.value = -y
      })
    }
    // 初始化所有菜单高度
    const _initTops = () => {
      const lis = [...goodsRef.value.children]
      let top = 0
      tops.push(top)
      lis.forEach((li: any) => {
        top += li.clientHeight
        tops.push(top)
      })
    }
    // 菜单的点击事件
    const clickMenuItem = (index: number) => {
      // 平滑到指定y值位置
      foodsScroll.scrollTo(0, -tops[index], 300)
    }
    // 显示商品详细信息
    const showFood = (food: any) => {
      currentFood.value = food
      shopFoodRef.value.toggleShow()
    }
    onMounted(async () => {
      const res: any = await getGoods()
      goods.value = res.data
      nextTick(() => {
        _initScroll()
        _initTops()
      })
    })
    return {
      goods,
      currentIndex,
      clickMenuItem,
      goodsRef,
      showFood,
      currentFood,
      shopFoodRef,
    }
  },
})
</script>

<style lang="stylus" scoped>
@import "../../../assets/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 5px
  .fade-enter-active,.fade-leave-active
    transition opacity .5s
  .fade-enter-from,.fade-leave-to
    opacity 0
</style>
